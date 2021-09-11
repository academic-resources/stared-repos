// Which one of the following Javascript Functions perform the given tasks Correctly?

// - The function takes one numeric variable as parameter
// - If the variable is 0 then it creates a dialogue box which says "zero"
// - If the variable is 1 then it creates a dialogue box which says "one"
// - Otherwise it creates a dialogue box which says "Invalid input"

// My Answer:
function myFunction(value) {
  switch (value) {
      case 0:
          str = "zero";
          break;
      case 1:
          str = "one";
          break;
      default:
          str = "Invalid input";
          break;
  }
  alert(str);
}

console.log(0)
console.log(1)
console.log(2)