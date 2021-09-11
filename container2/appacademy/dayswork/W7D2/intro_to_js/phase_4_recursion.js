function range(start, end) {
    if (start === end) {
        return [start]
    }
    let output = [start]
    output = output.concat(range(start + 1, end))
    return output
}

// console.log(range(1,10));

function sumRec(array) {
    if (array.length === 1) {
        return array[0]
    }
    return array[0] + sumRec(array.slice(1)) 
}

// console.log(sumRec([1, 2, 3]))

function exponent_1(base, exp) {
    if (exp === 0) 
        return 1
        return base * exponent_1(base, exp -1)
    }
    
// console.log( exponent_1(10, 3));
    
function exponent_2(base, exp) {
    if (exp === 0) 
        return 1
    if (exp === 1) 
        return base
    if (exp % 2 === 0) {
        even_return = exponent_2(base, exp / 2)
        return even_return * even_return
    } else {
        odd_return = exponent_2(base, ( exp - 1) / 2)
        return base * odd_return * odd_return
    }
}

// console.log( exponent_2(10, 3));

function fib(n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2)
}

// console.log(fib(6));


// function fibonacci(n) {
//     const output = [];
//     let counter = 1;
//     while (output.length < n) {
//         output.push(fib(counter));
//         counter++;
//     }
//     return output;
// }

function fibonacci(n) {
    // console.log('n is ', n);
    if (n === 1) return [1]
    if (n === 2) return [1, 1]
    const last_fib = fibonacci(n-1)
    // debugger
    // console.log('last_fib is' , last_fib);
    
    last_fib.push(last_fib[last_fib.length - 1] + last_fib[last_fib.length - 2])
    return last_fib
}

console.log(fibonacci(6));
