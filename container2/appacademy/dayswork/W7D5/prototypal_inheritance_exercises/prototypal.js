Function.prototype.inherits = function (SuperClass) {
    function Surrogate () {}
    Surrogate.prototype = SuperClass.prototype
    this.prototype = new Surrogate()
    this.prototype.constructor = this
}

Function.prototype.inheritsObj = function (SuperClass) {
    this.prototype = Object.create(SuperClass.prototype);
    this.prototype.constructor = this
}


function MovingObject(name) { 
    this.name = name
}
MovingObject.prototype.move = function() {
    console.log(`${this.name} movingObject is moving`)
}

function Ship(name) {
    MovingObject.call(this, name)
 }
Ship.inheritsObj(MovingObject);

function Asteroid() { }
Asteroid.inheritsObj(MovingObject);

ship = new Ship('Shippy')
ship.move()



