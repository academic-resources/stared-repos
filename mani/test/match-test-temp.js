/*
Mocha test for: match
*/

/*var   Chai     		= require('chai'),
      assert   		= Chai.assert,
      Match   	      = require('../lib/match.js'),
      Mani     		= require('../lib/index.js');


// test options for index constructor
var options = {
   'text': [
      {'path': 'title', 'boost': 20},
      {'path': 'article.body'}
   ]
}

// example data     
var docs = [{
      'title': 'test 1',
      'article': {
         'body': 'using foo',
         'tags': ['foo','bar']
      },
      'published':  false,
      'created': new Date('2015-04-26T00:00-01:00'),
      'viewed': 1284,
      'likes': '56'
   },{
      'title': 'test 2',
      'article': {
         'body': 'using bar',
         'tags': ['extra','foo']
      },
      'published':  true,
      'created': new Date('2015-04-28T00:00-01:00'),
      'viewed': 3552,
      'likes': '93'
   }];



describe('match', function() {

   var match = new Match({});

   it("created", function(){
      assert.deepEqual(match.options, {}, "should emply options object");
   })

})


describe('match', function() {

   var match = new Match({});

   var query1 = {
         'title':'test 1'
   };

   var query2 = {
         'published':false
   };

   var query3 = {
         'viewed':1284
   };

   it("_isValidMatch - single string match", function(){
      assert.deepEqual(match._match(docs[0], query1), true, "should match title property");
      assert.deepEqual(match._match(docs[1], query1), false, "should not match title property");
   })

   it("_isValidMatch - single bool match", function(){
      assert.deepEqual(match._match(docs[0], query2), true, "should match title property");
      assert.deepEqual(match._match(docs[1], query2), false, "should not match title property");
   })

   it("_isValidMatch - single number match", function(){
      assert.deepEqual(match._match(docs[0], query3), true, "should match title property");
      assert.deepEqual(match._match(docs[1], query3), false, "should not match title property");
   })

})


describe('match', function() {

   var match = new Match({});

   var query1 = {
         'title':'test 1',
         'published':  false
   };

   it("_isValidMatch - more than one match", function(){
      assert.deepEqual(match._match(docs[0], query1), true, "should match title/published properties");
      assert.deepEqual(match._match(docs[1], query1), false, "should not match title/published properties");
   })

})


describe('match', function() {

   var match = new Match({});

   var query1 = {
         'article.body':'using foo'
   };

   it("_isValidMatch - using JSON path", function(){
      assert.deepEqual(match._match(docs[0], query1), true, "should match article.body property");
      assert.deepEqual(match._match(docs[1], query1), false, "should not match article.body property");
   })

})


// Array tests
// -----------------------------------


describe('match', function() {

   var match = new Match({});

   var query1 = {
      'article.tags':'bar'
   };

   it("_isValidMatch - match in an array", function(){
      assert.deepEqual(match._match(docs[0], query1), true, "should match article.tags property");
      assert.deepEqual(match._match(docs[1], query1), false, "should not match article.tags property");
   })

})



// Comparison query operators tests
// -----------------------------------


describe('match', function() {

   var match = new Match({});

   var query1 = {
      'viewed': {'$gt': 2000}
   };

   it("_isValidMatch - $gt great than", function(){
      assert.deepEqual(match._match(docs[0], query1), true, "should match viewed property");
      assert.deepEqual(match._match(docs[1], query1), false, "should not match viewed property");
   })

})

describe('match', function() {

   var match = new Match({});

   var query1 = {
      'viewed': {'$gte': 1284}
   };

   it("_isValidMatch - $gte great than or equal to", function(){
      assert.deepEqual(match._match(docs[0], query1), true, "should match viewed property");
      assert.deepEqual(match._match(docs[1], query1), false, "should not match viewed property");
   })

})


describe('match', function() {

   var match = new Match({});

   var query1 = {
      'viewed': {'$lt': 2000}
   };

   it("_isValidMatch - $lt less than", function(){
      assert.deepEqual(match._match(docs[0], query1), false, "should not match viewed property");
      assert.deepEqual(match._match(docs[1], query1), true, "should match viewed property");
   })

})



describe('match', function() {

   var match = new Match({});

   var query1 = {
      'viewed': {'$lte': 3552}
   };

   it("_isValidMatch - $lte less than or equal to", function(){
      assert.deepEqual(match._match(docs[0], query1), false, "should not match viewed property");
      assert.deepEqual(match._match(docs[1], query1), true, "should match viewed property");
   })

})



describe('match', function() {

   var match = new Match({});

   var query1 = {
      'viewed': {'$exists': true}
   };
   var query2 = {
      'viewed': {'$exists': false}
   };
   var query3 = {
      'lastviewed': {'$exists': true}
   };
   var query4 = {
      'lastviewed': {'$exists': false}
   };

   it("_isValidMatch - $exists property exists", function(){
      assert.deepEqual(match._match(docs[0], query1), true, "should match viewed property");
      assert.deepEqual(match._match(docs[0], query2), false, "should match viewed property");
      assert.deepEqual(match._match(docs[0], query3), false, "should not match lastviewed property");
      assert.deepEqual(match._match(docs[1], query4), true, "should not match lastviewed property");
   })

})


//  TODO
//  * text string, numbers, date




describe('match', function() {

   var match = new Match({});

   var query = {
      'viewed': {'$ne': 3552}
   };

   it("_isValidMatch - $en not equal to", function(){
      assert.deepEqual(match._match(docs[0], query), true, "should match viewed property");
      assert.deepEqual(match._match(docs[1], query), false, "should not match viewed property");
   })

})




describe('match', function() {

   var match = new Match({});

   var query = {
      'viewed': {'$ne': 3552}
   };

   it("_isValidMatch - $en not equal to", function(){
      assert.deepEqual(match._match(docs[0], query), true, "should match viewed property");
      assert.deepEqual(match._match(docs[1], query), false, "should not match viewed property");
   })

})



// Data type tests
// -----------------------------------



describe('match', function() {

   var match = new Match({});

   var query = {
      'created': {'$gt': new Date('2015-04-27T00:00-01:00')}
   };

   it("_isValidMatch - Date based $gt great than", function(){
      assert.deepEqual(match._match(docs[0], query), true, "should match created property");
      assert.deepEqual(match._match(docs[1], query), false, "should not match created property");
   })

})


describe('match', function() {

   var match = new Match({});

   var query = {
      'created': {'$ne': new Date('2015-04-28T00:00-01:00')}
   };

   it("_isValidMatch - Date based $ne great than", function(){
      assert.deepEqual(match._match(docs[0], query), true, "should match created property");
      assert.deepEqual(match._match(docs[1], query), false, "should not match created property");
   })

})


// typeTo test
// -----------------------------------

describe('match', function() {
   var match = new Match({
      'typeTo': [
        {'path': 'created', convertTo: 'date'}
      ]
   });

   it("_typeTo - typeTo date", function(){
      assert.deepEqual(match._typeTo(['2015-04-26T00:00-01:00'], 'created'), [new Date('2015-04-26T00:00-01:00')], "should cast to date");
      assert.deepEqual(match._typeTo(['2015-04-26T00:00'], 'created'), [new Date('2015-04-26T00:00')], "should cast to date");
      assert.deepEqual(match._typeTo(['2015-04-26'], 'created'), [new Date('2015-04-26')], "should cast to date");
      assert.deepEqual(match._typeTo(['2015-04-26t00:00'], 'created'), [new Date('2015-04-26t00:00')], "should cast to date");
      assert.deepEqual(match._typeTo(['today'], 'created'), [null], "should NOT cast to date");
   })

})



describe('match', function() {
   var match = new Match({
      'typeTo': [
        {'path': 'liked', convertTo: 'int'}
      ]
   });

   //console.log(match._typeTo(['one'], 'liked'))

   it("_typeTo - typeTo int", function(){
      assert.deepEqual(match._typeTo(['23'], 'liked'), [23], "should cast to int");
      assert.deepEqual(match._typeTo(['23.3'], 'liked'), [23], "should cast to int");
      assert.deepEqual(match._typeTo(['0.3'], 'liked'), [0], "should cast to int");
      assert.deepEqual(match._typeTo(['-6'], 'liked'), [-6], "should cast to int");
      assert.deepEqual(match._typeTo(['23px'], 'liked'), [23], "should cast to int");
      assert.deepEqual(match._typeTo(['one'], 'liked'), [null], "should NOT cast to int");
   })

})



describe('match', function() {
   var match = new Match({
      'typeTo': [
        {'path': 'liked', convertTo: 'float'}
      ]
   });

   //console.log(match._typeTo(['one'], 'liked'))

   it("_typeTo - typeTo float", function(){
      assert.deepEqual(match._typeTo(['0.23'], 'liked'), [0.23], "should cast to float");
      assert.deepEqual(match._typeTo(['23.3'], 'liked'), [23.3], "should cast to float");
      assert.deepEqual(match._typeTo(['0.3'], 'liked'), [0.3], "should cast to float");
      assert.deepEqual(match._typeTo(['-6'], 'liked'), [-6], "should cast to float");
      assert.deepEqual(match._typeTo(['23.6px'], 'liked'), [23.6], "should cast to float");
      assert.deepEqual(match._typeTo(['one'], 'liked'), [null], "should NOT cast to float");
   })

})


describe('match', function() {
   var match = new Match({
      'typeTo': [
        {'path': 'liked', convertTo: 'string'}
      ]
   });

   console.log(match._typeTo([23], 'liked'))

   it("_typeTo - typeTo string", function(){
      assert.deepEqual(match._typeTo([23], 'liked'), ['23'], "should cast to string");
      assert.deepEqual(match._typeTo([23.3], 'liked'), ['23.3'], "should cast to string");
      assert.deepEqual(match._typeTo([0.3], 'liked'), ['0.3'], "should cast to string");
      assert.deepEqual(match._typeTo([-6], 'liked'), ['-6'], "should cast to string");
      assert.deepEqual(match._typeTo(['23.6px'], 'liked'), ['23.6px'], "should cast to string");
      assert.deepEqual(match._typeTo([true], 'liked'), ['true'], "should cast to string");
   })

})*/

















