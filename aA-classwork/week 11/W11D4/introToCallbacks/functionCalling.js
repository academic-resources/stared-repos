// myBind:

Function.prototype.myBind = function(context) {
  return () => this.apply(context);
}

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function () {
  console.log("Turning on " + this.name);
};

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"

// myThrottle:

Function.prototype.myThrottle = function(interval) {
  let tooSoon = false;
  return () => {
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(function() {tooSoon = false}, interval);
      this();
    }
  }
}

// class Neuron {
//   fire() {
//     console.log("Firing!");
//   }
// };

// const neuron = new Neuron;
// // When we create a new Neuron, 
// // we can call #fire as frequently as we want

// // The following code will try to #fire the neuron every 10ms. Try it in the console:
// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// // You can use clearInterval to stop the firing:
// clearInterval(interval);

// // Using Function#myThrottle, we should be able to throttle 
// // the #fire function of our neuron so that it can only fire 
// // once every 500ms:

// neuron.fire = neuron.fire.myThrottle(500);

// interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// // This time, if our Function#myThrottle worked correctly, 
// // the Neuron#fire function should only be able to execute 
// // every 500ms, even though we're still trying to invoke it 
// // every 10ms!

// // If we want this behavior for ALL neurons, we can do the same logic in the constructor:

// // class Neuron {
// //   constructor() {
// //     this.fire = this.fire.myThrottle(500);
// //   }

// //   fire() {
// //     console.log("Firing!");
// //   }
// // };

Function.prototype.myDebounce = function(interval) {
  let timeout = setTimeout(someFunc, interval);
  return (...args) => {
    
  }
}