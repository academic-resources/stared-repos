// ADD CODE HERE
function createFunction() {
  return () => "hello world"
}
// Uncomment these to check your work!
const myFunction = createFunction();
console.log(myFunction()); //should log: 'hello world'


// ADD CODE HERE
function createFunctionWithInput(input) {
  return () => input
}
// UNCOMMENT THESE TO TEST YOUR WORK!
const sampleFunc = createFunctionWithInput('sample');
console.log(sampleFunc()); // should log: 'sample'
const helloFunc = createFunctionWithInput('hello');
console.log(helloFunc()); // should log: 'hello'


function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log('counter', counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();


// ADD CODE HERE
function addByX(num) {
  return (input) => input + num
}

const addByTwo = addByX(2);
console.log(addByTwo(1)); //should return 3
console.log(addByTwo(2)); //should return 4
console.log(addByTwo(3)); //should return 5

const addByThree = addByX(3);
console.log(addByThree(1)); //should return 4
console.log(addByThree(2)); //should return 5

const addByFour = addByX(4);
console.log(addByFour(4)); //should return 8
console.log(addByFour(10)); //should return 14


// ADD CODE HERE
function once(callback) {
  let called = false
	let invoked

  return (...args) => {
    if (!called) {
      called = !called
      invoked = callback(...args)
    }
		return invoked
  }
}
const addByTwoOnce = once(function(num) {
  return num + 2;
});

// UNCOMMENT THESE TO TEST YOUR WORK!
console.log(addByTwoOnce(5));  //should log 7
console.log(addByTwoOnce(10));  //should log 7
console.log(addByTwoOnce(9001));  //should log 7


// ADD CODE HERE
function after(cbCallCount, cb) {
  let count = 1
  return (...args) => {
    if (count === cbCallCount) return cb(...args)
		count++
  }
}
const called = function(string) { return('hello ' + string); };
const afterCalled = after(3, called);

// UNCOMMENT THESE LINES TO TEST YOUR WORK
console.log(afterCalled('world')); // -> nothing is printed
console.log(afterCalled('world')); // -> nothing is printed
console.log(afterCalled('world')); // -> 'hello world' is printed


// ADD CODE HERE
function delay(callback, waitTime) {
  return () => {
    setTimeout(callback, waitTime)
  }
}
// UNCOMMENT THE CODE BELOW TO TEST DELAY
let count = 0;
const delayedFunc = delay(() => count++, 1000);
delayedFunc(); //delayedFunc -> anon func with setTimeout in it
console.log(count); 												 // should print '0'
setTimeout(() => console.log(count), 1000); // should print '1' after 1 second


// ADD CODE HERE
function saveOutput(callback, password) {
  const log = {}
	function callBackDupe(...args) {
    if (args[0] === password) return log
    log[args[0]] = callback(args[0])
    return callback(...args)
  }
  return callBackDupe
}
// Uncomment these to check your work!
const multiplyBy2 = function(num) { return num * 2; };
const multBy2AndLog = saveOutput(multiplyBy2, 'boo');
console.log(multBy2AndLog(2)); // should log: 4
console.log(multBy2AndLog(9)); // should log: 18
console.log(multBy2AndLog('boo')); // should log: { 2: 4, 9: 18 }


// ADD CODE HERE
function cycleIterator(array) {
  let i = 0
  return () => {
    if (i >= array.length) i = 0
    return array[i++]
  }
}
// Uncomment these to check your work!
const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // should log: 'Fri'
console.log(getDay()); // should log: 'Sat'
console.log(getDay()); // should log: 'Sun'
console.log(getDay()); // should log: 'Fri'


// ADD CODE HERE
function defineFirstArg(callback, arg) {
  return (...args) => {
    return callback(arg, ...args)
  }
}
// Uncomment these to check your work!
const subtract = function(big, small) { return big - small; };
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // should log: 15


// ADD CODE HERE
function dateStamp(callback) {
  const log = {}
  return (...args) => {
    log.date = new Date().toDateString()
    log.output = callback(...args)
  	return log
  }
}
// Uncomment these to check your work!
const stampedMultBy2 = dateStamp(n => n * 2);
console.log(stampedMultBy2(4)); // should log: { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // should log: { date: (today's date), output: 12 }


// ADD CODE HERE
function censor() {
  let storedPairs = []
  return (...args) => {
    if (args.length === 2) storedPairs.push(args)
    if (args.length === 1) {
  		let censored = args[0]
      storedPairs.forEach(pair => {
        const [lookup, change] = pair
        censored = censored.replace(lookup, change)
      })
      return censored
    }
  }
}
// Uncomment these to check your work!
const changeScene = censor();
changeScene('dogs', 'cats');
changeScene('quick', 'slow');
console.log(changeScene('The quick, brown fox jumps over the lazy dogs.')); // should log: 'The slow, brown fox jumps over the lazy cats.'