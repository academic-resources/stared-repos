/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Default Window Binding is the global context this 
is given when no other rules are applied. This will 
search up the parent chain to find what is being called, 
and will return either the Window or an error/undefined 
if it cannot be found.
 
* 2. Implicit Binding is when dot notation is used to call
a function. Whatever is to the left of the dot is defined 
at the context for This in the function or object.

* 3. New Binding is when new is used to create a context
for This with each time it is called. It works in every 
instance where New is pointing to.

* 4. Explicit Binding is when we utilize .call(),
.apply(), or .bind() to explicitly set the context
of This. With .call() and .apply(), we are specifically
setting the This to pass through as the context.
With .bind() we are creating a new function with an
explicitly set This.

*
* write out a code example of each explanation above
*/

// Principle 1

function sayHello(item){
    console.log(this)
}
console.log(sayHello());

// Principle 2

let unicorn = {
    firstName: 'Angela',
    favoriteFood: 'Apples',
    farts: 'Rainbows',
    myself: function(){
        return `My name is ${this.firstName}. My favorite food is ${this.favoriteFood} and I fart ${this.farts}.`
    }
}
unicorn.myself();

// Principle 3

function PastaDish(shape, sauce, topping){
    this.shape = shape;
    this.sauce = sauce;
    this.topping = topping;
    this.letsEat = function(){
        return `I am excited to eat ${shape} pasta with ${sauce} sauce with ${topping} on top.`
    }
}

let alfredo = new PastaDish('bowtie', 'alfredo', 'parmesan');

alfredo.letsEat();

// Principle 4

function Introduction(hobby, pet) {
    return `Hi, my name is ${this.name}. I am from ${this.hometown} but live in ${this.currentTown} now. I enjoy ${hobby} and have a pet ${pet}.`
}

const Julie = {
    name: 'Julie',
    hometown: 'Charlottesville',
    currentTown: 'Houston',
}

Introduction.call(Julie, 'soccer', 'chicken');

const info = ['soccer', 'chicken'];
Introduction.apply(Julie, info);

const julieFacts = Introduction.bind(Julie);
julieFacts('soccer', 'chicken');