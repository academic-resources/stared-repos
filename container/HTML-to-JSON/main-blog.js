var cheerio = require('cheerio');
var fs = require('fs');

//needs output-blog folder
//needs to reference folder where the blog html files are
// process files found in the 'input' folder
fs.readdir('./deal-lawyer-blog/', 'utf8', findHtmlFiles);

let counter = 0;
let myjsonArr= [];
const fileCount = 204;

function findHtmlFiles(err, files) {
    if (files.length) {
        files.forEach(function (fullFilename) {
            var pattern = /\.[0-9a-z]{1,5}$/i;
            var ext = (fullFilename).match(pattern);
            // only process '.htm' and '.html' files
            if (ext[0] == '.htm' || ext[0] == '.html') {
                fs.readFile('./deal-lawyer-blog/' + fullFilename, 'utf8', function (err, data) {
                    if (err)
                        throw err
                    else {
                        // add the file name to prevent collisions
                        // in the output folder
                        var fileData = {
                            file: fullFilename.slice(0, (ext[0].length * -1)),
                            data: data
                        };
                        dataLoaded(null, fileData);
                    }
                });
            }
        });
    }

}

function dataLoaded(err, fd) {
    $ = cheerio.load(fd.data);
    let blogObjectArr = [];
    let key = null;
    let currentObjectArr = [];
    //console.log($('#content').find('.post').text());
    let articles = $('#content').find('article').each(function(i){
        let title = $(this).find('header').find('h2').text();
        let content = $(this).find('p').text();;
        let date = $(this).find('.date').text();
        let author =  $(this).find('footer').find('p').text().split('Permalink')[0];
        let permalink = $(this).find('footer').find('p').text().split('Permalink: ')[1];
        // to create array of array, where each element is an array of articles of that particular month and year
        key = date; 
        currentObjectArr.push({
            title: title,
            content: content,
            date: date,
            author: author,
            permalink: permalink,
            test:'test'
            })
        })
        counter++;
        myjsonArr.push(currentObjectArr);
    let content = JSON.stringify(myjsonArr);
    //console.log(myjsonArr.length);
    if(counter === fileCount) {
        fs.writeFile('./output-blog/' + 'blog', content, function (err) {
            console.log('Written html to ' + 'blog');
        });
        return myjsonArr;
    }

}

