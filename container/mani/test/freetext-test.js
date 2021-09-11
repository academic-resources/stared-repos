/*
Mocha test for: freetext
*/

var   Chai     		= require('chai'),
      assert   		= Chai.assert,
      Freetext   	= require('../lib/freetext.js'),
      Mani     		= require('../lib/index.js');


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



describe('freetext', function() {

	var freetext = new Freetext({});

 	it("created", function(){
 		assert.equal(freetext._lunrIndex, null, "_lunrIndex should be set to null");
 		assert.deepEqual(freetext.options, {}, "should emply options object");
 	})

})


describe('freetext', function() {

	var freetext = new Freetext(options);

 	it("created with options.text", function(){
 		assert.isNotNull(freetext._lunrIndex, "should have a lunr index");
 		assert.deepEqual(freetext.options, options, "should options object");
 	})

})


describe('freetext', function() {

	var freetext = new Freetext({});

 	it("_getLunrIndex", function(){
 		assert.isNotNull(freetext._getLunrIndex(options), "should return a lunr index");
 	})

})


/* TODO: Assert failing for some reason

describe('freetext', function() {

	var freetext = new Freetext(options);

	console.log(JSON.stringify(freetext._flatten(doc)));
	console.log(JSON.stringify({"p0": "test", "p1": "this is a test"}));

 	it("_flatten", function(){
 		assert.deepEqual(freetext._flatten(doc), {"p0": "test", "p1": "this is a test"}, "should flatten doc for use in lunr");
 	})

})
*/
