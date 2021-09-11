function sumUsingArguments() {
    let sum = 0
    for (let index = 0; index < arguments.length; index++) {
        sum += arguments[index];
    }
    return sum
}

function sumWithSpread(...args) {
    let sum = 0
    for (let index = 0; index < args.length; index++) {
        sum += args[index];
    }
    return sum
}

console.log(sumUsingArguments(1, 2, 3, 4));
console.log(sumWithSpread(1, 2, 3, 4));

Function.prototype.myBind = function() {
    const ctx = arguments[0];
    const bindArgs = Array.from(arguments).slice(1)
    const that = this;
    return function() {
        const callArgs = Array.from(arguments);
        return that.apply(
            ctx,
            callArgs.concat(bindArgs)
        );
    }
}

Function.prototype.myBind = function(ctx, ...bindArgs) {
    return  (...callArgs) => {
    //   return  this.apply(ctx, bindArgs.concat(callArgs))
      return  this.call(ctx, ...bindArgs.concat(callArgs))
    }
}

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true

function curriedSum(numberArgs) {
  numbers = [];
  return function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numberArgs) {
      result = 0;
      numbers.forEach(n => {
        result += n;
      });
      return result;
    } else {
      return _curriedSum;
    }
  };
}

const sum = curriedSum(4);

console.log(sum(5)(30)(20)(1));  // => 56


Function.prototype.curry = function(numArgs) {
    let argsReceived = []
    const that = this
    return function _curriedFunction() {
        const callArgs = Array.from(arguments)
        argsReceived = argsReceived.concat(callArgs)
        if (argsReceived.length === numArgs) {
            return that.apply(null, argsReceived)
        } else {
            return _curriedFunction
        }
    }
}

Function.prototype.currySpread = function(numArgs){
    let argsReceived = [];
    const that = this;
    return function _curriedFunction (...args)  {
        argsReceived = argsReceived.concat(args);
        if (argsReceived.length === numArgs) {
            return that(...argsReceived);
        } else {
            return _curriedFunction
        }
    };
}


Function.prototype.currySpread = function (numArgs) {
    let argsReceived = [];
    const _curriedFunction = (...args) => {
        argsReceived = argsReceived.concat(args);
        if (argsReceived.length === numArgs) {
            return this(...argsReceived);
        } else {
            return _curriedFunction
        }
    };
    return _curriedFunction;
}


const sum2 = (a,b) => a + b
// const curriedSum2 = sum2.curry(2)
const curriedSpread = sum2.currySpread(2)

// console.log(curriedSum2(10));
// console.log(curriedSum2(10)(15));
console.log(curriedSpread(10)(15));
