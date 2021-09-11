
/* The four principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. window/global object binding:  "this" is the "browser-wide" object in the global scope, outside most object when you haven't defined one.
* 2. implicit binding:  when a function is called by a dot right before it.
* 3. new binding:  when you make a new object from an already constructed function.
* 4. explicit binding:  when either call or apply method is used.

*
* write out a code example of each explanation above
*/

// Principle 1:  code example for Window Binding
function askStore(storeName) {
console.log(this);
return "My favorite store is " + storeName + "!";
}
askStore("Fry's");

// Principle 2:  code example for Implicit Binding
const myBusiness = {
    bName: 'A Quo Co.',
    firstName: 'Erica',
    lastName: 'Ingram',
    year: '2009',
    introduceBiz: function (title) {
        console.log("My name is " + myBusiness.firstName + " " + myBusiness.lastName + " and I am the " + { title } + " at  " + myBusiness.bName);
        console.log(this);}
}
myBusiness.introduceBiz('owner');

// Principle 3:  code example for New Binding
function myBusiness (firstN, lastN, yearStart, title) {
    this.bName = 'A Quo Co.';
    this.firstName = firstN;
    this.lastName = lastN;
    this.year = yearStart;
    this.title = title;
    this.introduceBiz = function () {
        console.log("My name is " + this.firstName + " " + this.lastName + " and I am the " + this.title + " at " + this.bName + " since " + this.yearStart + ".");
        }
}
const adam = new myBusiness('Adam', 'Ingram', '2010', 'operations manager');
const erica = new myBusiness('Erica', 'Ingram', '2009', 'owner');
adam.introduceBiz();
erica.introduceBiz();

// Principle 4:  code example for Explicit Binding
adam.introduceBiz.call(erica);
erica.introduceBiz.apply(adam);
