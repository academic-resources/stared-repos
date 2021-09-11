function range (start, end) {
    const numbers = [];
    if (start === end) {
        return numbers;
    }
    // const next_val = range(start + 1, end)
    // numbers.push(next_val);
    numbers.push(start);
    return numbers.concat(range(start + 1, end));
}

// console.log(range(1, 5));

function sumRec (arr) {
    let sum = 0;
    if (arr.length === 0) {
        return 0;
    }
    let first = arr[0];
    sum += sumRec(arr.slice(1)) + first;
    return sum;
}

console.log(sumRec([1,2,3,4]));

    // return arr.first if arr.size <= 1
    // arr.first + sum(arr[1..-1])

function exponent(base, exp) {
  if (exp == 0) {
    return 1;
  }
  return base * exponent(base, exp - 1);
}

console.log(exponent(2,4));

function fibonnaci (n) {
  let base_numbers = [1,1]
  if (n === 2) {
    return base_numbers;
  } else if (n === 1) {
    return [1];
  }
  let new_fib = fibonnaci(n-1);
  let next_fib = new_fib[new_fib.length - 1] + new_fib[new_fib.length - 2];
  new_fib.push(next_fib);
  return new_fib;
}

// console.log(fibonnaci(10));


function deepDup (arr) {
    let duplicated_array = [];
    arr.forEach(function(el) {
        if (el instanceof Object) {
            duplicated_array.push(deepDup(el));
        } else {
            duplicated_array.push(el);
        }
    }); return duplicated_array;
}

console.log(deepDup([1, 3, 5, 7]));
console.log(([1] == 1));