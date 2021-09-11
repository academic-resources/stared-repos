/*
Mocha test for: index
*/

var   chai     = require('chai'),
      assert   = chai.assert,
      mani     = require('../lib/index.js');


// test options for index constructor
var options = {
   'text': [
      {'path': 'title', 'boost': 20},
      {'path': 'article.body'}
   ]
}

// example data
var doc = {
      title: 'test',
      article: {
         body: 'this is a test'
      }
   };

// example data     
var docs = [{
      title: 'test 1',
      article: {
         body: 'using foo',
         tags: ['foo','bar']
      }
   },{
      title: 'test 2',
      article: {
         body: 'using bar',
         tags: ['extra','foo']
      }
   }];



describe('index', function() {

   var index = mani(options);

   it("created", function(){
      assert.isNotNull(index, "mani index NOT created");
      assert.isNotNull(index.documents, "mani index has documents collection");
      assert.isNotNull(index._freetext, "mani index has lunr freetext");
      assert.isNotNull(index._geo, "mani index has geo");
   })

})


describe('index', function() {

   var index1 = mani({});

   it("created - empty options", function(){
      assert.isNotNull(index1, "mani index NOT created");
      assert.isNotNull(index1.documents, "mani index has documents collection");
      assert.isNotNull(index1._freetext, "mani index has lunr freetext");
      assert.isNotNull(index1._geo, "mani index has geo");
   })


   var index2 = mani();

   it("created - no options", function(){
      assert.isNotNull(index2, "mani index NOT created");
      assert.isNotNull(index2.documents, "mani index has documents collection");
      assert.isNotNull(index2._freetext, "mani index has lunr freetext");
      assert.isNotNull(index2._geo, "mani index has geo");
   })

})



describe('index', function() {

   var index = mani(options),
      returnedItem = index.add(doc);

   it("item added", function(){
      assert.equal(index.documents.items.length, 1, "there should be 1 items in document collection");
      assert.deepEqual(returnedItem, doc, "doc added should be retured by add function");
      assert.deepEqual(index.documents.items[0], doc, "doc should be in the items collection");
   })
})


describe('index', function() {

   var index = mani(options),
      returnedItems = index.add(docs);

   it("items added", function(){
      assert.equal(index.documents.items.length, 2, "there should be 2 items in document collection");
      assert.deepEqual(returnedItems, docs, "docs added should be retured by add function");
      assert.deepEqual(index.documents.items, docs, "docs should be in the items collection");
   })

})



describe('index', function() {

   var index = mani(options);
   index.add(docs);
      
   var returnedItems = index.search({text: 'bar'});

   // need to remove score before testing
   delete returnedItems.items[0].score;

   //console.log(JSON.stringify(returnedItems))

   it("search", function(){
      assert.equal(returnedItems.items.length, 1, "result has only one item");
      assert.deepEqual(returnedItems.items[0], docs[1], "result has doc with text - using bar");
   })

   it("search criteria", function(){
      assert.deepEqual(returnedItems.criteria, {text: 'bar'}, "result has text search criteria");
   })

})


describe('index', function() {

   var index = mani(options);
   index.add(docs);

   var returnedItems = index.search({
         text: 'bar', 
         facets: {
            'path': 'article.tags'
         }
      })

   //console.log(JSON.stringify(returnedItems))

   it("facets based on search", function(){
      assert.deepEqual(returnedItems.facets, [["extra",1],["foo",1]], "should have 2 facets");
   })

})


describe('index', function() {

   var index = mani(options);
   index.add(docs);

   var returnedItems = index.facets({'path': 'article.tags'});

   //console.log(JSON.stringify(returnedItems))

   it("facets based on all documents", function(){
      assert.deepEqual(returnedItems, [["foo",2],["bar",1],["extra",1]], "should have 3 facets");
   })

})



