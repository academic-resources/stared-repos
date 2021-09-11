
Function.prototype.inherits = function(superClass) {
  function Surrogate () {}
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
}

Function.prototype.inherits = function(superClass) {
  this.prototype = Object.create(superClass.prototype)
  this.prototype.constructor = this;
}

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);