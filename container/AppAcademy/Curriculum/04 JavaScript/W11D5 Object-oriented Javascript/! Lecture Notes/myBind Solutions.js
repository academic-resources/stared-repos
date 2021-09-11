// Function.prototype.myBind = function (ctx) {
//   return () => {
//      return this.apply(ctx);
//   }
// }

// myBind with arguments
Function.prototype.myBind = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, callArgs.concat(bindArgs))
  }
}

// myBind with args ES5
// Function.prototype.myBind = function(context) {
//   let that = this;
//   var bindArgsList = [].slice.call(arguments, 1);
//   return function() {
//     var callArgsList = [].slice.call(arguments);
//     return that.apply(context, bindArgsList.concat(callArgsList))
//   }
// }

class Cat {
  constructor(name) {
    this.name = name;
  }

  meow() {
    console.log(`${ this.name } says meow!`);
  }

  playWith(person1, person2) {
    console.log(`${ this.name } plays with ${ person1 } and ${ person2 }`)
  }
}

const curie = new Cat("Curie");
// setTimeout(curie.meow.myBind(curie), 1000); 
const unboundMeow = Cat.prototype.meow;
const boundMeow = unboundMeow.myBind(curie);
setTimeout(boundMeow, 1000);

const unboundPlayWith = Cat.prototype.playWith;
const boundPlayWith = unboundPlayWith.myBind(curie, "Tommy");
boundPlayWith("Mashu");