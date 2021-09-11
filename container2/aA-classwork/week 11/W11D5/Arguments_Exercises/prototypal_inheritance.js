// function Surrogate () {}

// Function.prototype.inherits = function (superClass) {
//     Surrogate.prototype = superClass.prototype;
//     this.prototype = new Surrogate(); 
//     this.prototype.constructor = this;
// };

Function.prototype.inherits = function(superClass) {
  this.prototype = Object.create(superClass);
  this.prototype.constructor = this;
};

function Ship () {}
function MovingObject() {}
function Asteroid() {}
function Alien() {}
function ET() {}
Ship.inherits(MovingObject);
Asteroid.inherits(MovingObject);
Alien.inherits(ET);

Ship.prototype.flies = function () {
  console.log("flying!");
};

MovingObject.prototype.moves = function() {
  console.log("moving!");
};

ET.prototype.callHome = function() {
  console.log("calling home!");
};

const ship = new Ship();
const asteroid = new Asteroid();
const alien = new Alien();
