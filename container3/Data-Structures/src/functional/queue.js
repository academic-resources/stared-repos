var makeQueue = function(){
  var storage = {};

  var start = 0;
  var end = 0;

  var queue = {};

  queue.enqueue = function(value){
    storage[end++] = value;
  };

  queue.dequeue = function(){
    if(end > start){
      var temp = storage[start++];
      return temp;
    }
  };

  queue.size = function(){
    return end-start;
  };

  return queue;
};