Function.prototype.myBind = function(context) {
  return () => {
    this.apply(context)
  }
}

// class Lamp {
//   constructor() {
//     this.name = "a lamp";
//   }
// }

// const turnOn = function() {
//    console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"


Function.prototype.myThrottle = function(interval) {
    let tooSoon = false;
    return () => {
        if (!tooSoon) {
            tooSoon = true;
            setTimeout(() => {
                tooSoon = false;
                this();
            }, interval);
        }
    }
} 


// class Neuron {
//   fire() {
//     console.log("Firing!");
//   }
// };

// class Neuron {
//     constructor() {
//         this.fire = this.fire.myThrottle(500);
//     }

//     fire() {
//         console.log("Firing!");
//     }
// };

// const neuron = new Neuron;
// // When we create a new Neuron, 
// // we can call #fire as frequently as we want

// // The following code will try to #fire the neuron every 10ms. Try it in the console:
// let interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// You can use clearInterval to stop the firing:
// clearInterval(interval);

// Using Function#myThrottle, we should be able to throttle 
// the #fire function of our neuron so that it can only fire 
// once every 500ms:

// neuron.fire = neuron.fire.myThrottle(500);

//  interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// This time, if our Function#myThrottle worked correctly, 
// the Neuron#fire function should only be able to execute 
// every 500ms, even though we're still trying to invoke it 
// every 10ms!

// If we want this behavior for ALL neurons, we can do the same logic in the constructor:


Function.prototype.myDebounce = function(interval) {
    let currentInterval
    return () => {
        clearInterval(currentInterval)
        currentInterval = setTimeout(() => {
            this();
        }, interval);
    }
}
  

class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }
  
  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}
const searchBar = new SearchBar;

searchBar.search = searchBar.search.myDebounce(500);
const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
}


queryForHelloWorld();