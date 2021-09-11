const readline = require("readline");
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addNumbers = (sum, numsLeft, cb) => {
    if (numsLeft > 0) {
    reader.question("Give me a number!", (input) => {
      input = parseInt(input);
      let newsum = input + sum;
      console.log(newsum);
      addNumbers(newsum, --numsLeft, cb);
    });
  } else {
    cb(sum)
  }
}

addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));