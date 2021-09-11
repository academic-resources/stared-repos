var makeTree = function(){
  var newTree = {};
  newTree.value = undefined;
  newTree.parent = undefined;
  newTree.children = [];

  for(var key in treeMethods){
    newTree[key] = treeMethods[key];
  }
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
  var tempTree = makeTree();
  tempTree.value = value; 
  tempTree.parent = this; 
  this.children.push(tempTree);
};

treeMethods.contains = function(val){
  var result = false;
  for(var i = 0; i < this.children.length; i++){
    if(this.children[i].value === val){
      result = true; 
    }
  }
  return result;
};
