var Queue = function(){
  var queue = Object.create(methods);
  queue._storage = {};

  queue._start = 0;
  queue._end = 0;

  return queue;
};

  var methods = {};
  methods.enqueue = function(value){
    this._storage[this._end++] = value;
  };

  methods.dequeue = function(){
    if(this._end > this._start){
      var temp = this._storage[this._start++];
      return temp;
    }
  };

  methods.size = function(){
    return this._end-this._start;
  };