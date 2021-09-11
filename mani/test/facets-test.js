/*
Mocha test for: facets
*/

var   chai     		= require('chai'),
      assert   		= chai.assert,
      facets   		= require('../lib/facets.js'),
      mani     		= require('../lib/index.js');


// test options for index constructor
var options = {
   'text': [
      {'path': 'title', 'boost': 20},
      {'path': 'article.body'}
   ]
}


// test options for facet constructor
var facetOptions = {
        'path': 'article.tags'
     }


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


// moch of search results
var searchResults =  [{"ref":"1","score":0.30815769789216485}];   



describe('facets', function() {

	var index = new mani(options);
   	index.add(docs);

    var facets = new Facets(),
    	returnedItems = facets.build(index.documents, facetOptions);

   	it("index created facets", function(){
		assert.deepEqual(returnedItems, [["foo",2],["bar",1],["extra",1]], "should have 3 facets");
   	})

})



describe('facets', function() {

	var index = new mani(options);
   	index.add(docs);

    var facets = new Facets(),
    	returnedItems = facets.build(index.documents, facetOptions, searchResults);

   	it("search created facets", function(){
		assert.deepEqual(returnedItems, [["extra",1],["foo",1]], "should have 2 facets");
   	})

})



describe('facets', function() {

  var index = new mani(options);
    index.add(docs);

    var facets = new Facets(),
      returnedItems = facets.build(index.documents, {
        'path': 'article.tags',
        'limit': 1
     }, searchResults);

    it("facets limited to one result", function(){
    assert.deepEqual(returnedItems, [["extra",1]], "should have 1 facets");
    })

})

