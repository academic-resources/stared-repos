# Constructor and Prototype

## Constructor

Sometimes we need a "blueprint" for creating many objects of the same "type". The way to create an "object type", is to use an object _constructor function_. Objects of the same type are created by calling the constructor function with the `new` keyword.

```js
function Person(first, last, age) {
	this.firstName = first;
	this.lastName = last;
	this.age = age;
	this.fullName = function() {
		return `${this.firstName}, ${this.lastName}`;
	}
}
const me = new Person('Nacho', 'Herrera', 25);
```

The `constructor` property returns a reference to the `Object` constructor function that created the instance object. Note that the value of this property is a reference to the function itself.

All objects, with the exception of objects created with `Object.create(null)` will have a `constructor` property. Objects created without the explicit use of a constructor function (such as object- and array-literals) will have a `constructor` property that points to the Fundamental Object constructor type for that object.

```js
let o = {};
o.constructor === Object // true

let a = [];
a.constructor === Array // true

let n = new Number(3);
n.constructor === Number // true

function Tree(name) { this.name = name }
let myTree = new Tree('Redwood')
console.log(`myTree.constructor is ${myTree.constructor}`);
```

## Changing the `constructor` of an object

It's not always safe to rely on the `constructor` property of an object, except for Boolean, Number, and String, as they have read-only native constructors.

```js
myVar.constructor = myType
```

## Changing the `constructor` of a function

Mostly this property is used for defining a funciton as a function-constructor with further calling it with `new` and prototype-inherits chain.

```js
function Parent() {/* ... */}
Parent.prototype.parentMethod = function parentMethod() {}

function Child() { Parent.call(this) }

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child // return original constructor to child after re-defining its prototype
```

## `this` keyword in constructor functions

In JS, `this` is the object that "owns" the code. In a constructor function the value of `this` will become the new object when a new object is created.

## Prototype

Prototypes are the mechanism by which JS objects inherit features from one another. The `prototype` property can be used to add methods to existing constructors.

### Prototype-based language?

To provide inheritance, objects can have `prototype` object, which acts as a template object from where objects can inherit methods and properties.

An object's prototype object may also have a prototype object, which it inherits methods and properties from, and so on. This is often referred to as __Prototype Chain__, and explains why different objects have methods and properties defined on other objects available to them.

To be exact, properties and methods are defined on the `prototype` property on the Objects' `constructor` functions, not the object instances themselves.

In JS, a link is made between the object instance and its prototype (deprected `__proto__` property, which is derived from the `prototype` property on the constructor), and the methods and properties are found by __walking up the chain of prototypes__. We can use `Object.getPrototypeOf(obj)` to get the property on the constructor. For example, `Object.getPrototypeOf(new Foobar())` refers to the same object as `Foobar.prototype`.

### Prototype Inheritance Example

Suppose we have the following code:

```js
let person1 = new Person('Nacho', 'Herrera');
```

What's happening is that `person1` inherits from prototype of `Person` which inhertis from prototype of `Object`. This is why you can call a method on person1 that's actually defined on `Object`, such as `person1.valueOf()`.

Since JS doesn't exactly have sub-class objects, Prototype is a useful workaround to make a "base class" object of certain functions that act as objects.

```js
var Person = function(name) {
  this.name = name;
  this.canTalk = true;
};

Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
};

var Employee = function(name, title) {
  Person.call(this, name);
  this.title = title;
};

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee; //If you don't set Object.prototype.constructor to Employee, 
                                           //it will take prototype.constructor of Person (parent). 
                                           //To avoid that, we set the prototype.constructor to Employee (child).


Employee.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name + ', the ' + this.title);
  }
};

var Customer = function(name) {
  Person.call(this, name);
};

Customer.prototype = Object.create(Person.prototype);
Customer.prototype.constructor = Customer; //If you don't set Object.prototype.constructor to Customer, 
                                           //it will take prototype.constructor of Person (parent). 
                                           //To avoid that, we set the prototype.constructor to Customer (child).


var Mime = function(name) {
  Person.call(this, name);
  this.canTalk = false;
};

Mime.prototype = Object.create(Person.prototype);
Mime.prototype.constructor = Mime; //If you don't set Object.prototype.constructor to Mime,
                                   //it will take prototype.constructor of Person (parent).
                                   //To avoid that, we set the prototype.constructor to Mime (child).


var bob = new Employee('Bob', 'Builder');
var joe = new Customer('Joe');
var rg = new Employee('Red Green', 'Handyman');
var mike = new Customer('Mike');
var mime = new Mime('Mime');

bob.greet();
// Hi, I am Bob, the Builder

joe.greet();
// Hi, I am Joe

rg.greet();
// Hi, I am Red Green, the Handyman

mike.greet();
// Hi, I am Mike

mime.greet();
```
