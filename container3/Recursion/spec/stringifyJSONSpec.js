// test cases are described in fixtures.js
describe("stringifyJSON", function(){
  it("should match the result of calling JSON.stringify", function(){

    validObjects.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      expect(result).toEqual(expected);
    });

    weirdObjects.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      expect(result).toEqual(expected);
    });

  });
});
