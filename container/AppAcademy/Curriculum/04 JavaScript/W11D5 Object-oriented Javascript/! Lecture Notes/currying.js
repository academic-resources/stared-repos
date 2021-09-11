function addThreeNums(num1, num2, num3) {
  return num1 + num2 + num3;
};

function curriedAddThreeNums() {
  return function (num1) {
    num1:
    return function (num2) {
      num1; num2;
      return function (num3) {
        num1; num2; num3;
        return num1 + num2 + num3;
      }
    }
  }
};

const a = curriedAddThreeNums();
const b = a(1);
const c = b(2);
const result = c(3);
console.log(result)

console.log(curriedAddThreeNums()(1)(2)(3));

function curriedSum(numArgs) {
  const nums = [];

  return function _curriedSum(num) {
    nums.push(num);
    if (nums.length === numArgs) {
      //sum and return result
      let result = 0;
      nums.forEach(num => result += num)
      return result;
    } else {
      return _curriedSum; //not recursion because not invoked
      // NOT ^^ _curriedSum();
    }
  };
};

const curriedAdd = curriedSum(3);
console.log(curriedAdd(1)(2)(3));