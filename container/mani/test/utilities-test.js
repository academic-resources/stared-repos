/*
Mocha test for: utilities
*/

var   chai     		= require('chai'),
      assert   		= chai.assert,
      utilities   	= require('../lib/utilities.js');




describe('utilities', function() {


	var doc = {
      title: 'test 1',
      article: {
         body: 'using foo',
         tags: ['foo','bar']
      }
   };

   it("reach", function(){
      assert.equal(utilities.reach(doc, 'title'), 'test 1', "should get value of property");
      assert.equal(utilities.reach(doc, 'article.body'), 'using foo', "should get value of child object property");
      assert.equal(utilities.reach(doc, 'article.tags.1'), 'bar', "should get value of array item");
      assert.equal(utilities.reach(doc, 'article.unknown'), undefined, "should not return value of incorrect path");
   })

})