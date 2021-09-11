/* CHALLENGE 1 */

function sayHowdy() {
  console.log('Howdy');
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log('Partnah');
}
// After thinking it through, uncomment the following line to check your guess!
testMe(); // what order should these log out? Howdy or Partnah first?
// Partnah then Howdy


/* CHALLENGE 2 */

function delayedGreet() {
  // ADD CODE HERE
  setTimeout(() => console.log("welcome"), 3000)
}
// Uncomment the following line to check your work!
delayedGreet(); // should log (after 3 seconds): welcome


/* CHALLENGE 3 */

function helloGoodbye() {
  // ADD CODE HERE
  setTimeout(() => console.log("good bye"), 2000)
  console.log("hello")
}
// Uncomment the following line to check your work!
helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye


/* CHALLENGE 4 */

function brokenRecord() {
  // ADD CODE HERE
  let time = 0
  for(let i = 0; i < 5; i++) {
  	setTimeout(() => console.log("hi again"), time)
    time += 1000 
  }
}
// Uncomment the following line to check your work!
brokenRecord(); // should log (every second): hi again


/* CHALLENGE 5 */

function limitedRepeat() {
  // ADD CODE HERE
}
// Uncomment the following line to check your work!
// limitedRepeat(); // should log (every second, for 5 seconds): hi for now


/* CHALLENGE 6 */

function everyXsecsForYsecs() {
  // ADD CODE HERE
}
// Uncomment the following lines to check your work!
// function theEnd() {
//   console.log('This is the end!');
// }
// everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!


/* CHALLENGE 7 */

function delayCounter(target, wait) {

}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const countLogger = delayCounter(3, 1000)
// countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3

