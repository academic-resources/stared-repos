/*
Mocha test for: geo
*/

var   chai     		= require('chai'),
      assert   		= chai.assert,
      geo   		= require('../lib/geo.js'),
      mani     		= require('../lib/index.js');



var options = {
	'text': [
      {'path': 'title', 'boost': 20},
      {'path': 'article.body'}
   	],
	'geo': {
    	'point': {
            'latitudePath': 'location.latitude', 
            'longitudePath': 'location.longitude',
        }
    }
}

// example data     
var docs = [{
	  id: 0,
      title: 'test 1',
      article: {
         body: 'using foo',
         tags: ['foo','bar']
      },
      location: {
      	latitude:  50.8282799064,
      	longitude: -0.1388552785
      }
   },{
   	  id: 1,
      title: 'test 2',
      article: {
         body: 'using bar',
         tags: ['extra','foo']
      },
      location: {
      	latitude: 50.8210687979,
      	longitude: -0.1429241896
      }
   }];


// moch of search results
var searchResults =  [{"ref":"1","score":0.30815769789216485}];     




describe('geo', function() {

	var geoObj = new geo({});

 	it("collection created", function(){
 		assert(Array.isArray(geoObj.items), "should have an items array");
 		assert.deepEqual(geoObj.options, {}, "should emply options object");
 	})

})


describe('geo', function() {

	var geoObj = new geo(options);

 	it("created with options.geo.point", function(){
 		assert(Array.isArray(geoObj.items), "should have an items array");
 		assert.equal(geoObj.options, options, "should options object");
 	})

})


describe('geo', function() {

	var geoObj = new geo(options);
	//console.log(JSON.stringify(geoObj._flatten(docs[0])));

 	it("_fatten", function(){
 		assert.deepEqual(geoObj._flatten(docs[0]), {"ref":0,"latitude":50.8282799064,"longitude":-0.1388552785}, "should flatten doc into a usable structure for geolib");
 	})

})


describe('geo', function() {

	var geoObj = new geo(options);

 	it("_getFloat", function(){
 		assert.equal(geoObj._getFloat("-0.1388552785"), -0.1388552785, "should turn string into float");
 		assert.equal(geoObj._getFloat(["-0.1388552785"]), -0.1388552785, "should turn string in array item into float");
 		assert.equal(geoObj._getFloat([-0.1388552785]), -0.1388552785, "should turn array item into float");
 	})

})


describe('geo', function() {

	var geoObj = new geo(options);

	//console.log(JSON.stringify(geoObj.items));

 	it("add", function(){
 		assert.equal(geoObj.add(docs[0]), docs[0], "should return doc on success");
 		geoObj.add(docs[1]);
 		assert.equal(geoObj.items.length, 2, "should have two items in items array");
 		assert.deepEqual(geoObj.items[0], {"ref":0,"latitude":50.8282799064,"longitude":-0.1388552785}, "should flatten docs");
 	})

})


describe('geo', function() {

	var geoObj = new geo(options);
	geoObj.add(docs[0])
	geoObj.add(docs[1])

	//console.log(JSON.stringify(geoObj.items));

 	it("_getDocumentSubSet", function(){
 		assert.deepEqual(geoObj._getDocumentSubSet(null), geoObj.items, "should return array of all docs");
 		assert.deepEqual(geoObj._getDocumentSubSet(searchResults), [geoObj.items[1]], "should array containing one doc");
 	})

})


describe('geo', function() {

	var geoObj = new geo(options);
	geoObj.add(docs[0])
	geoObj.add(docs[1])


	var returnedItems = geoObj.nearby({
		'nearby': {
          	'latitude': 50.82, 
	       	'longitude': -0.14,
	    }
    })

	//console.log(JSON.stringify(returnedItems));

 	it("nearby", function(){
 		assert.equal(returnedItems.length, 1, "should return 1 docs");
 		assert.equal(returnedItems[0].distance, 238, "should have distance in meters");
 	})

})



describe('geo', function() {

	var geoObj = new geo(options);
	geoObj.add(docs[0])
	geoObj.add(docs[1])


	var returnedItems = geoObj.search({
		'nearby': {
          	'latitude': 50.82, 
	       	'longitude': -0.14,
	    }
    })

	//console.log(JSON.stringify(returnedItems));

 	it("search - nearby", function(){
 		assert.equal(returnedItems.length, 1, "should return 1 docs");
 		assert.equal(returnedItems[0].distance, 238, "should have distance in meters");
 	})

})



describe('geo', function() {

	var pagingOptions1 = {
		'limit': 10,
	}

	var pagingOptions2 = {
		'startAt': 6,
		'limit': 5,
	}

	var geoObj = new geo(options);

 	it("_getResultLimit", function(){
 		assert.equal(geoObj._getResultLimit(pagingOptions1), 10, "should return limit of 10");
 		assert.equal(geoObj._getResultLimit(pagingOptions2), 10, "should return limit of 10");
 	})

})










