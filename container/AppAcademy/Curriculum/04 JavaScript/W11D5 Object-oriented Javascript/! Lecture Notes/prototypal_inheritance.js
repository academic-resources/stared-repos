function Dog(name, toy ) {
  // this.name = name;
  Animal.call(this, name); //basically a super call to parent class
  this.favoriteToy = toy;
};

// incorrect
// Dog.prototype = Animal.prototype;

// new Animal
// Dog.prototype = new Animal();

// how about empty constructor class **ES4
function Surrogate() {
  // this.constructor = Dog;
};
Surrogate.prototype = Animal.prototype;
Dog.prototype = new Surrogate(); // Important to define inheritance right after

// Dog.prototype = Object.create(Animal.prototype) // ES5 negates the surrogate
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log("woof woof");
};

function Cat(name) {
  this.name = name;
};

// incorrect
// Cat.prototype = Animal.prototype;
// function Surrogate() {
//   // this.constructor = Cat;
// };
// Surrogate.prototype = Animal.prototype;
// Cat.prototype = new Surrogate();
Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat;

Cat.prototype.meow = function () {
  console.log("meow");
};

function Animal(name) {
  this.name = name;
};

Animal.prototype.eat = function () {
  console.log("nom nom nom");
};

const lola = new Dog("Lola", "Squeaky Frog");
const charlie = new Cat("Charlie");

const a = new Animal();



// ES6

// class Animal {
//   constructor(name) {
//     this.name = name
//   }
// }

// // just syntactic sugar
// class Dog extends Animal {
//   constructor(name, favToy) {
//     this.name = name
//     this.favToy = favToy
//   }

//   bark() {
//     // do stuff
//   }
// }

module.export = Proto