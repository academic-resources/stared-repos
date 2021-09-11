var makeStack = function(){
  var stack = {};
  stack._storage = {};
  stack._size =0; 

  _.extend(stack, newObj);

  return stack;
};

  var newObj = {};
  
  newObj.push = function(value){
    this._storage[this._size++] = value;
  };

  newObj.pop = function(){
    this._size && this._size--;
    return this._storage[this._size];
  };

  newObj.size = function(){
    return this._size;
  };