// Note: don't use an array to do this.
var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(val){
    var temp = list.tail;
    list.tail = makeNode(val);
    if(list.head === null){
      (list.head = list.tail);
    } else{
      temp.next = list.tail;
      list.tail.previous = temp;
    }
  };

  list.removeHead = function(){
    var result;
    if(list.head === list.tail && (list.head.value)){
       result = list.head.value;
       list.head = null;
       list.tail = null;
    }else{
      var temp = list.head;
      list.head = temp.next;
      list.head.previous = null;
      result = temp.value;
    }
    return result;
  };

  list.contains = function(val){
    var result;
    if(list.head){
       result = list.head.contains(val);
    } else{
      result = false;
    }
    return result;
  };
  
  list.addToHead = function(val){
    var temp = list.head;
    list.head = makeNode(val);
    list.head.next = temp;
    temp.previous = list.head;
  }

  list.removeTail = function(){
    var temp = list.tail;
    var result;
    if(list.tail === list.head && list.tail.value){
      result = list.tail.value;
      list.tail = null;
    } else{
      list.tail = temp.previous;
      result = temp.value;
      list.tail.next = null;
    }
     return result;
  }
  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;
  node.previous = null;

  node.contains = function(val){
    var result;
    if(this.value === val){
      result = true;
    } else if(this.next){
      result = this.next.contains(val);
    } else{
      result = false;
    }
    return result;
  };

  return node;
};
