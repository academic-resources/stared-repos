var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var pairs = this._storage.get(i) || [];
  for(var i = 0; i < pairs.length; i++){
    if(pairs[i][0] === k){ //If the key already exists, just replace the value
      pairs[i][1] = v;
      return
    }
  }
  pairs.push([k,v]);
  this._storage.set(i, pairs);
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var pairs = this._storage.get(i) || [];
  for(var i = 0; i < pairs.length; i++){
    if(pairs[i][0] === k){
      return pairs[i][1];
    }
  }
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var pairs = this._storage.get(i) || [];
  for(var i=0; i < pairs.length; i++){
    if(pairs[i][0] === k){
      var result = pairs.slice(i,1);
      return result[1];
    }
  }
};

