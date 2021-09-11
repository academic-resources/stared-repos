var makeSet = function(){
  var set = Object.create(setPrototype); // fix me
  set._storage = undefined;
  return set;
};

var setPrototype = {};

setPrototype.add = function(val){
  this._storage[val] = true;
};

setPrototype.contains = function(val){
  return this._storage[val] ? true : false;
};

setPrototype.remove = function(val){
  delete this._storage[val];
};
