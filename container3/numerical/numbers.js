module.exports = function(context){

  var n = context;

  n.prototype.ceil = function(){
    return Math.ceil(this)
  };
  n.prototype.floor = function(){
    return Math.floor(this)
  };
  n.prototype.dinto = function(x){
    return x / this
  };
  n.prototype.pow = function(x){
    return Math.pow(this, x)
  };
  n.prototype.round = function(){
    return Math.round(this)
  };
  n.prototype.add = function(){
    arguments = Array.prototype.slice.call(arguments);
    arguments.unshift(this);
    return new Function('return ' + arguments.join('+'))();
  };
  n.prototype.div = function(){
    arguments = Array.prototype.slice.call(arguments);
    arguments.unshift(this);
    return new Function('return ' + arguments.join('/'))();
  };
  n.prototype.multi = function(){
    arguments = Array.prototype.slice.call(arguments);
    arguments.unshift(this);
    return new Function('return ' + arguments.join('*'))();
  };
  n.prototype.sub = function(){
    arguments = Array.prototype.slice.call(arguments);
    arguments.unshift(this);
    return new Function('return ' + arguments.join('-'))();
  };
  n.prototype.subzero = function(){
    return subzero(this.round()-1)
  };
  n.prototype.bang = function(){
    return this.multi.apply(this.round(), this.subzero());
  };
  n.prototype.sine = function(){
    return Math.sin(this)
  };
  n.prototype.cos = function(){
    return Math.cos(this)
  };
  n.prototype.tan = function(){
    return Math.tan(this);
  };
  n.prototype.abs = function(){
    return Math.abs(this)
  };
  n.prototype.exp = function(x){
    return Math.exp(this)
  };
  n.prototype.sqrt = function(){
    return Math.sqrt(this);
  };
  n.prototype.wop = function(x){
    return Math.pow(x, this)
  };
  n.prototype.acos = function(){
    return Math.acos(this)
  };
  n.prototype.asin = function(){
    return Math.asin(this)
  };
  n.prototype.atan = function(){
    return Math.atan(this)
  };

  function subzero(){
    var g = Array.prototype.slice.call(arguments)
      , s = g[g.length - 1];
    if(s == 1) return g;
    else {
      g.push(--s);
      return subzero.apply(null, g);
    };
  };

};
