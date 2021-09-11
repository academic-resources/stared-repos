function sum () {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i]; 
  }
  console.log(result);
  
  return result;
}

// console.log(sum(1, 2, 3, 4));

function sum2(...args) {
  let result = 0;
  for (let i = 0; i < args.length; i++) {
    console.log(args);
    result += args[i];
  }
  return result;
}

// console.log(sum2(1, 2, 3, 4));

Function.prototype.myBind = function(ctx) {
  let bindArgs = [].slice.call(arguments, 1);
  let that = this;
  return function () {
    let callArgs = [].slice.call(arguments);
    return that.apply(ctx, bindArgs.concat(callArgs));
  };
};

Function.prototype.myBind2 = function(ctx, ...args) {
  return (...callArgs) => {
    return this.apply(ctx, args.concat(callArgs));
  };
};

function curriedSum (numArgs) {
  let numbers = [];
  return function _curriedSum (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let sum = 0;
      for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
        console.log(sum);
      }
      return sum;
    } else {
      return _curriedSum;
    }
  };
}

// const s = curriedSum(4);
// s(5)(30)(20)(1);

Function.prototype.curry = function (numArgs) {
  const that = this;
  let argsArray = [];
  console.log(numArgs);
  return function _curry (arg) {
    argsArray.push(arg);
    if (argsArray.length === numArgs) {
      return that(...argsArray);
    } else {
      return _curry;
    }
  };
};

Function.prototype.curry2 = function (numArgs) {
  const that = this;
  let argsArray = [];
  return function _curry(arg) {
    argsArray.push(arg);
    if (argsArray.length === numArgs) {
      return that.apply(null, argsArray);
    } else {
      return _curry;
    }
  };
};


// const sumCurry = sum.curry(4);
// let x = sumCurry(5);
// console.log("hello");
// console.log(x(6)(3)(2));