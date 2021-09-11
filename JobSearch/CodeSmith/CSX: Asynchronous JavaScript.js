// Add code here
console.log("I am at the beginning of the code")

setTimeout(() => console.log("I am in the setTimeout callback function"), 600)

console.log("I am at the end of the code")


// Add code here
function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i)
  }
}

const delays = [200, 500, 0, 350]

function delayLog(delayTime, i) {
	setTimeout(() => console.log(`printing element ${i}`), delayTime)
}

forEach(delays, delayLog)


let dataReceived;

function ajaxSimulate(id, callback) {
  const database = ['Aaron', 'Barbara', 'Chris'];
  // Add code here
  setTimeout(() => callback(database[id]))
}

// Also add code here
function storeData(data) {
  dataReceived = data
  console.log(dataReceived)
}

ajaxSimulate(1, storeData)
console.log(dataReceived) // => undefined because it hasn't been set yet.


// Add code here
function limitedInterval(callback, wait, limit) {
  let waitTime = wait
  while (waitTime < limit) {
    setTimeout(callback, waitTime)
    waitTime += wait
  }
}
// /* Uncomment the following line and click 'run' to test your work */
limitedInterval(() => console.log('repeating'), 100, 550); // should log 'repeating' once per 100 ms, five times.


// Add code here
function runInOrder(funcArray, waitArray) {
  let waitTime = 0
	funcArray.forEach((callback, i) => {
    waitTime += waitArray[i]
    setTimeout(callback, waitTime)
  })
}
// /* Uncomment the following lines and click 'run' to test your work */

function sayHi() {
  console.log('hi');
}
function sayBye() {
  console.log('bye');
}
function sayHowdy() {
  console.log('howdy');
}

runInOrder([sayHi, sayBye, sayHowdy], [200, 100, 300]);

/*
should log:
'hi' (after 200 ms)
'bye' (100 ms after 'hi')
'howdy' (300 ms after 'bye')
*/
