const madLib = (v, a, n) =>
  `We shall ${v.toUpperCase()} the ${a.toUpperCase()} ${n.toUpperCase()}`;
console.log(madLib("make", "best", "guac"));

const isSubstring = (searchString, subString) =>
  searchString.indexOf(subString) !== -1;
console.log(isSubstring("time to program", "time"));
console.log(isSubstring("Jump for joy", "joys"));

const fizzBuzz = array =>
  array.filter(
    num => (num % 3 === 0 && num % 5 !== 0) || (num % 5 === 0 && num % 3 !== 0)
  );
console.log(fizzBuzz([3, 5, 15]));

const isPrime = num => {
  if (num === 2) return true;
  let i = 2;
  while (i < num) {
    if (num % i === 0) return false;
    i++;
  }
  return true;
};
console.log(isPrime(2));
console.log(isPrime(10));
console.log(isPrime(15485863));
console.log(isPrime(3548563));

const firstNPrimes = n => {
  let result = [];
  let candidate = 2;
  while (result.length < n) {
    if (isPrime(candidate)) {
      result.push(candidate);
    }
    candidate++;
  }
  return result;
};

const sumOfNPrimes = n => {
  let firstn = firstNPrimes(n);
  return firstn.reduce((acc, p) => acc + p, 0);
};

console.log(sumOfNPrimes(0));
console.log(sumOfNPrimes(1));
console.log(sumOfNPrimes(4));
