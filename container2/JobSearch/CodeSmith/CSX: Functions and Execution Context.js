// ADD CODE HERE
function addTwo(num) { return num + 2 }
// Uncomment these to check your work!
console.log(typeof addTwo); // should log: 'function'
console.log(addTwo(10)); // should log: 12


// ADD CODE HERE
function addS(string) {return string + "s"}
// Uncomment these to check your work!
console.log(typeof addS); // should log: 'function'
console.log(addS('cat')); // should log: 'cats'


const x = 3;

function isX1(num) {
    const x = 5;
    return num === x;
}

function isX2(num) {
    return num === x;
}

const one = isX1(5);
const two = isX2(x);

// Uncomment these to check your work!
console.log(one); // should log: true
console.log(two); // should log: true


let calls = "";

function jerry(str) {
	return str + "Jerry" + kramer(calls)
}

function george(str) {
	return str + "George" + elaine(calls)
}

function elaine(str) {
	return str + "Elaine"
}

function kramer(str) {
	return str + "Kramer" + george(calls)
}

// should return: 'JerryKramerGeorgeElaine'
calls = jerry(calls);
console.log(calls)


function getRemainder(num1, num2) {
  //your code goes here...
	return num1 > num2 ? num1 % num2 : num2 % num1
}

//Uncomment the lines below to test your code

console.log(getRemainder(17, 5)); //=> 2
console.log(getRemainder(20, 5)); //=> 0
console.log(getRemainder(8, 22)); //=> 6
console.log(getRemainder(7, 42)); //=> 0


function lastLetter(word) {
  //your code goes here...
	return word[word.length - 1]
}

//Uncomment the lines below to test your code

console.log(lastLetter("hello")); //=> "o"
console.log(lastLetter("goodbye!")); //=> "!"
console.log(lastLetter("ZeltoiD")); //=> "D"
console.log(lastLetter("I love Javascript")); //=> "t"


function gradeCalculator(grade) {
  //your code goes here...
	return grade >= 90 ? "A" : grade >= 80 ? "B" :
  			grade >= 70 ? "C" : grade >= 60 ? "D" : "F"
}

//Uncomment the lines below to test your code

console.log(gradeCalculator(92)); //=> "A"
console.log(gradeCalculator(84)); //=> "B"
console.log(gradeCalculator(70)); //=> "C"
console.log(gradeCalculator(61)); //=> "D"
console.log(gradeCalculator(43)); //=> "F"


function wereAwesome(you, yourBuddy) {
  // your code here...
	return `${yourBuddy} and ${you} are awesome!`
}

//Comment in the code below to test your function:

console.log(wereAwesome("Dave", "Will")); //=> "Will and Dave are awesome!"
console.log(wereAwesome("Victoria", "Jenny")); //=> "Jenny and Victoria are awesome!"
console.log(wereAwesome("Chris", "Jac")); //=> "Jac and Chris are awesome!"
console.log(wereAwesome("Phillip", "Skyler")); //=> "Phillip and Skyler are awesome!"


function disemvowel(string) {
  // your code here...
  return string.split('').map(char => "aeiouAEIOU".includes(char) ? '' : char).join('')
}

//Comment in the code below to test your function:

console.log(disemvowel('CodeSmith')); // => 'CdSmth'
console.log(disemvowel('BANANA')); // => 'BNN'
console.log(disemvowel('hello world')); // => 'hll wrld'


function arrayBuilder(obj) {
  // your code here...
	let builtArray = []
  for (let key of Object.keys(obj)) {
    for (let i = 0; i < obj[key]; i++) {
			builtArray.push(key)
    }
  }
  return builtArray
}

//Comment in the code below to test your function:

console.log(arrayBuilder({'cats': 2, 'dogs': 1})); //=> ['cats', 'cats', 'dogs']
console.log(arrayBuilder({})); //=> []


