var Queue = function(){
  this._storage = {};
  this._start = 0;
  this._end = 0;
};

  Queue.prototype.enqueue = function(value){
    this._storage[this._end++] = value;
  };

  Queue.prototype.dequeue = function(){
    if(this._end > this._start){
      var temp = this._storage[this._start++];
      return temp;
    }
  };

  Queue.prototype.size = function(){
    return this._end-this._start;
  };