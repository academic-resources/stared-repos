const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const express = require('express');
const mySQLparams = require('./mySQLparameters');

/*
  *********************************
  * ESTABLISH DATABASE CONNECTION *
  *********************************
*/
// pass connection parameters
let con = mysql.createConnection(mySQLparams);
//establish connection
con.connect(function(err) {
  if (err) throw err
  console.log("Connected!");
});

/*
  *********************
  * CONFIGURE EXPRESS *
  *********************
*/
var app = express();
//tell express where all static files like css, images, etc. are
app.use(express.static('public'));
// tell express where to look for pug files (pug files dynamically produce html files using database)
app.set('view engine', 'pug');
app.set('views','./views');
// this makes it possible to extract parameters from post requests
app.use(express.urlencoded({extended: false}));

/*
  ********************
  * GLOBAL VARIABLES *
  ********************
*/
let indexingQueue = new Array();
const port = 8080;
const searchStart = 'SELECT URL, title, summary FROM page, word, pageword'
 + ' WHERE page.pageId = pageword.pageId'
 + ' AND word.wordId = pageword.wordId';
 const searchEnd = ' GROUP BY page.pageid ORDER BY (page.pageRank * SUM(pageword.frequency)) desc';

let state = {
   indexing : false,
   topSearches : [],
   hasMessage : false,
   message: ''
 }


/*
  ******************
  * EXPRESS ROUTES *
  ******************
*/

app.listen(port, () => console.log(`app listening on port ${port}!`))

app.get('/custom_search_ajax', function(req, res) {
  let wordmatcher = 'word.word'
  let compare = ' = '

  let words = req.query.searchQuery.replace(/\W/g, " ").replace(/\s\s+/g, ' ');
  // check if we were passed an empty string
  if(words === ' ') {
    res.json([]);
    return;
  }
  words = words.split(' ');

  let partial = req.query.partial === 'true';
  let caseSen = req.query.case === 'true';

  // if looking for partial match
  if(partial) {
      words.forEach((word, index) => {
        this[index] = '\'' + '%'+ word + '%' + '\'';
      });
      compare = ' like '
  }
  else {
    words.forEach((word, index) => {
      this[index] = '\'' + word + '\'';
    });
  }

  // if we don't care about case sensitive
  if(caseSen) {
    wordmatcher = 'upper('+ wordmatcher + ')'
    words.forEach((word, index) => {
      this[index] = 'upper('+ word + ')';
    });
  }
  // create the search query
  search = searchStart + ' AND ( ';
  for(let i = 0; i < words.length-1; i++)
    search += wordmatcher + compare + con.escape(words[i]) + ' OR '
  search += wordmatcher + compare + con.escape(words[words.length-1]) + ' ) ' + searchEnd
  getSearchResults(search).then(searchResults => {
    try {
      addSearch(req.query.searchQuery, searchResults.length);
    } catch (err) {}
    if(searchResults.length == 0) {
      res.json([]);
      return;
    }
    else {
      let queryResults = new Array();
      for(let i = 0; i < searchResults.length; i++) {
        queryResults.push({
          address : searchResults[i].URL,
          title : searchResults[i].title,
          description : searchResults[i].summary
        });
      }
      res.json(queryResults);
    }
  })
});

app.get('/admin', function(req, res) {
  state.topSearches = new Array();
  getTopSearches().then(topSearches => {
    if(topSearches.length == 0) {
      state.topSearches = [];
    }
    else {
      for(let i = 0; i < topSearches.length; i++) {
        state.topSearches.push({
          searchId: topSearches[i].searchId,
          terms: topSearches[i].terms,
          count: topSearches[i].count,
          searchDate: topSearches[i].searchDate.toString().substring(0, 15)
        })
      }
    }
    res.render('admin', state);
    state.hasMessage = false;
  })
});

app.post('/admin', function(req, res) {
  // if we're already working on a job, don't
  // do the indexing until that job is done
  if(state.indexing) {
    state.message = 'Currently indexing something, try again later!';
    state.hasMessage = true;
    res.redirect('/admin');
    return;
  }
  let level = (req.body.level <= 3) ? req.body.level : 3;
  state.indexing = true;
  indexingQueue.push({
    url : req.body.indexLink,
    pageRank: .25
  });
  breadthFirstSearch(level);
  state.message = 'Job added to the Queue!';
  state.hasMessage = true;
  res.redirect('/admin');
});


/*
  **********************
  * INDEXING FUNCTIONS *
  **********************
*/
async function breadthFirstSearch(level) {
  if(indexingQueue.length == 0)
    return;
  while(level != 0) {
    let sitesLeftTovisit = indexingQueue.length;
    for(let i = 0; i < sitesLeftTovisit; i++) {
      let page = indexingQueue.shift();
      await doIndexing(page, level);
    }
    level--;
  }
  state.indexing = false;
  console.log('done');
}

async function doIndexing(page, level) {
  try {
    // visit the link
    let response = await axios.get(page.url);

    // if we can't even connect to the link, move on
    if(response.status != 200)
      return;
    // hand over html to the parser
    let $ = cheerio.load(response.data);

    /*
      **************************************************************************
      * if we're not at the bottom of the search tree, grab children links and *
      * add them to queue before proceeding.                                   *
      * Also make sure we don't queue too many links, the server can only do   *
      * so much.                                                               *
      **************************************************************************
    */
    let pagesAlreadyInDatabase = new Array();
    if(level != 0 && indexingQueue.length <= 5000) {
      let aTags = $('a');
      for(let i = 0; i < aTags.length; i++) {
        let link = aTags[i].attribs.href;
        // we're not going to bother pursuing links that don't have a complete
        // address
        if(link && link.slice(0, 4) === 'http') {
          let rankToAdd = 1 / aTags.length;
          // we'll want to check if this link is already in the DB, if it is, we'll increase
          // it's page rank
          let linkId = await findPage(link);
          // if the link wasn't in the DB, we haven't queued it yet so we add it to the Queue
          if(linkId.length ==  0) {
            addToQueue(link, rankToAdd);
          }
          // if link WAS in the DB, we add it to a temp array for later so that we can
          // confirm that the current page we're trying to index isn't also already in the DB,
          // this way we avoid counting page rank twice. We also add this link to the Queue
          // since we're not at the bottom level and we may have not explored this link's children
          // NOTE: passing in rankToAdd doesn't matter since we know we won't be adding this link
          // to the DB, we just wanna see if it has children
          else {
            addToQueue(link, rankToAdd);
            pagesAlreadyInDatabase.push({
              id: linkId[0].pageId,
              pageRankToAdd: rankToAdd
            });
          }
        }
      }
    }
    // try to insert this link into the page table
    // if this throws and error, we simply catch it AND move on because the
    // database won't allow for duplicate URLs
    let pageRow = await insertPage(page.url, page.pageRank);
    let pageId = pageRow.insertId;
    console.log('indexing: ' + page.url);

    // since we've confirmed that this page wasn't queued before, we can now update the pages
    // in the database that it points to
    for(let i = 0; i < pagesAlreadyInDatabase.length; i++) {
      await updatePageRank(pagesAlreadyInDatabase[i].id, pagesAlreadyInDatabase[i].pageRankToAdd);
    }


    /*
      ****************************************************
      * since this was valid link, record it's title and *
      * summary and update the page in the table         *
      ****************************************************
    */
    let title = cheerio.text($('title')).replace(/\W/g, " ").substring(0, 100);
    let summary = cheerio.text($('body')).replace(/\W/g, " ").replace(/\s\s+/g, ' ').substring(0, 157) + ' ...';
    await updatePageInfo(pageId, title, summary);

    // get only the text of the html file and replace all new lines and tabs with spaces
    let words = cheerio.text($('html')).replace(/\W/g, " ")
    words = words.trim().split(/\s+/)
    let wordsFrequency = getWordsFrequency(words);

    for(let i = 0; i < wordsFrequency.length; i++) {
      let wordsFreq = wordsFrequency[i];
      // ignore words that are too big for the database
      if(wordsFreq.word.length > 95)
        continue;
      // get the id of each words
      let wordRow = await findWord(wordsFreq.word);
      // word isn't already in table
      if(wordRow.length == 0) {
          let insertedWord = await insertWord(wordsFreq.word)
          await insertPageWord(pageId, insertedWord.insertId, wordsFreq.frequency);
      }
      else {
        await insertPageWord(pageId, wordRow[0].wordId, wordsFreq.frequency);
      }
    }
  } catch (err) {
    //console.log(err);
  }
}

// if the link is already Queued, add to it's pageRank, otherwise add the new link
// to the queue and give it default page rank + the given page rank
function addToQueue(link, pageRank) {
  let index = indexingQueue.findIndex(queuedLink => queuedLink.url === link);
  if(index == -1) {
    indexingQueue.push({
      url : link,
      pageRank: .25 + pageRank
    });
  }
  else {
    indexingQueue[index].pageRank += pageRank;
  }
}

function getWordsFrequency(words) {
  if(!words || words.length == 0)
    return new Array();
  // count frequency
  let wordsFrequency = new Array();
  words.sort();
  let freqWord = words[0];
  let freq = 1;
  // base case
  if(words.length == 1) {
    wordsFrequency.push({
      word: freqWord,
      frequency: freq,
      wordId: -1
    });
  }
  else {
    for(let i = 1; i < words.length; i++) {
      if(freqWord == words[i])
        freq++
      else {
        wordsFrequency.push({
          word: freqWord,
          frequency: freq,
          wordId: -1
        })
        freqWord = words[i];
        freq = 1;
      }
    }
    wordsFrequency.push({
      word: freqWord,
      frequency: freq,
      wordId: -1
    })
  }
  return wordsFrequency;
}

/*
  *****************
  * SQL FUNCTIONS *
  *****************
*/

function findPage(url) {
  return new Promise((resolve,reject)=>{
  con.query('select * from page where URL = ' + con.escape(url), function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function insertPage(url, rank) {
  return new Promise((resolve,reject)=>{
  con.query('insert into page(URL, pageRank) values(' + con.escape(url) + ',' + con.escape(rank) + ');', function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function updatePageRank(pageId, rank) {
  return new Promise((resolve,reject)=>{
  con.query( 'UPDATE page'
    + ' SET pageRank = pageRank + ' + con.escape(rank)
    + ' WHERE pageId = ' + pageId, function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function updatePageInfo(pageId, title, summary) {
  return new Promise((resolve,reject)=>{
  con.query( 'UPDATE page'
    + ' SET title = ' + con.escape(title) + ', summary = ' + con.escape(summary)
    + ' WHERE pageId = ' + pageId, function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function findWord(word) {
  return new Promise((resolve,reject)=>{
  con.query('select * from word where word = ' + con.escape(word), function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function insertWord(word) {
  return new Promise((resolve,reject)=>{
  con.query('insert into word(word) values(' + con.escape(word) +');', function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function insertPageWord(pageId, wordId, frequency) {
  return new Promise((resolve,reject)=>{
  con.query('insert into pageword(pageId, wordId, frequency) values(' + con.escape(pageId)
    + ', ' + con.escape(wordId) + ', ' + con.escape(frequency) +');', function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function getSearchResults(searchQuery) {
  return new Promise((resolve,reject)=>{
  con.query(searchQuery, function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function addSearch(terms, count) {
  return new Promise((resolve,reject)=>{
  con.query('insert into search(terms, count) values(' + con.escape(terms) + ', '
    + con.escape(count) + ')', function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}

function getTopSearches() {
  return new Promise((resolve,reject)=>{
  con.query('select * from search order by search.count desc limit 10;', function(err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  });
}
