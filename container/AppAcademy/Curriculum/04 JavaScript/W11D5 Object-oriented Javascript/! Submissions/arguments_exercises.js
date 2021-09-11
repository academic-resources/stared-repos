const sumNoSpread = function(args) {
  let result = 0;
  let argList = [].slice.call(arguments);
  argList.forEach((el) => result += el );
  return result;
};
console.log(sumNoSpread(1,2,3,4));


const sumWithSpread = function(...args) {
  let result = 0;
  args.forEach((el) => result += el );
  return result;
};
console.log(sumWithSpread(1,2,3,4));


Function.prototype.myBind = function(context) {
  let that = this;
  var bindArgsList = [].slice.call(arguments, 1);
  return function() {
    var callArgsList = [].slice.call(arguments);
    return that.apply(context, bindArgsList.concat(callArgsList))
  }
}

Function.prototype.myBind = function(context, ...args) {
  return (...callArgs) => {
    this.apply(context, args.concat(callArgs));
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


function curriedSum(numArgs) {
  const numbers = [];
  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let result = 0;
      numbers.forEach((el) => result += el)
      return result;
    } else {
      return _curriedSum;
    }
  }
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56


Function.prototype.curryNormal = function(numArgs) {
  const func = this;
  const argsList = [];
  return function currying(arg) {
    argsList.push(arg);
    if (argsList.length < numArgs) {
      return currying;
    } else {
      return func(...argsList);
    }
  }
};


Function.prototype.curryApply = function(context, numArgs) {
  const func = this;
  const argsList = [];
  return function currying(arg) {
    argsList.push(arg);
    if (argsList.length < numArgs) {
      return currying;
    } else {
      return func.apply(context, argsList);
    }
  }
}



const arraySum = function(...numsArray) {
  let result = 0;
  // console.log(numsArray)
  numsArray.forEach((el) => result += el)
  return result;
}

const currySum = arraySum.curryNormal(4);
console.log(currySum(5)(10)(20)(1)); // => 36

const currySum2 = arraySum.curryApply(null, 4);
console.log(currySum2(5)(10)(20)(1)); // => 36

