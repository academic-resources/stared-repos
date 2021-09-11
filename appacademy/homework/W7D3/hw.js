const printCallback = arr => {
  arr.forEach(name => {
    console.log(name);
  });
};

const titleize = (arr, cb) => {
  const new_names = arr.map(name => `Mx. ${name} Jingleheimer Schmidt`);
  cb(new_names);
};

titleize(["Mary", "Brian", "Leo"], printCallback);

function Elephant(name, height, tricks = []) {
  this.name = name;
  this.height = height;
  this.tricks = tricks;
}

Elephant.prototype.trumpet = function() {
  console.log(`${this.name} the elephant goes 'phrRRRRRRRRRRR!!!!!!!`);
};

Elephant.prototype.grow = function() {
  this.height += 12;
};

Elephant.prototype.addTrick = function(trick) {
  this.tricks.push(trick);
};

Elephant.prototype.play = function() {
  let idx = Math.floor(Math.random() * this.tricks.length);
  console.log(idx);
  console.log(this.tricks);

  console.log(`${this.name} is ${this.tricks[idx]}`);
};

let ellie = new Elephant("Ellie", 185, [
  "giving human friends a ride",
  "playing hide and seek"
]);
let charlie = new Elephant("Charlie", 200, [
  "painting pictures",
  "spraying water for a slip and slide"
]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, [
  "trotting",
  "playing tic tac toe",
  "doing elephant ballet"
]);

let herd = [ellie, charlie, kate, micah];

Elephant.prototype.paradeHelper = function(e) {
  console.log(`${e.name} is trotting by!`);
};

herd.forEach(Elephant.prototype.paradeHelper);

function dinerBreakfast() {
  order = "scrambled eggs";
  console.log(`I'd like ${order}, please`);
  return function(new_order) {
    order += " and " + new_order;
    console.log(`I'd like ${order}, please`);
  };
}
let bfastOrder = dinerBreakfast();
bfastOrder("chocolate chip pancakes");
bfastOrder("grits");
