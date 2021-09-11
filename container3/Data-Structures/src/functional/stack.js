var makeStack = function(){
  var storage = {};

  var size =0; 

  var stack = {};

  stack.push = function(value){
    storage[size++] = value;
  };

  stack.pop = function(){
    size && size--;
    return storage[size];
  };

  stack.size = function(){
    return size;
  };

  return stack;
};
