// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var str;
  if (obj instanceof Array) { 
      str = '[';
	    for (var i = 0; i < obj.length; i++) {
	        str = str + stringifyJSON(obj[i]);
		        if (obj.length > 0 && i < (obj.length-1)) { 
		          str = str + ',';
		        }
	      }
      str = str +  ']';
  } 
  else if (typeof obj == "undefined"){
    str = '';
  }  
  else if (typeof obj == "string"){
    str = '"' + obj + '"';
  } 
  else if (typeof obj === "object"){
    if (obj === null) { 
      str = '' + obj + '';
    } 
  else if (typeof obj == "boolean" || typeof obj == "number"){
    str = '' + obj + '';
  }
  else { 
      str = '{';
      var j = 0;
      for (var keys in obj) {
        if (typeof obj[keys] !== "function" && typeof obj[keys] !== "undefined") {
          if (j > 0) { 
            str += ',';
          }          
          str += '"' + keys + '"' + ':' + stringifyJSON(obj[keys]);
        }  
        j++;
      }
      str += '}';    
    }

  }
  return str;
};