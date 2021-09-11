const fibonacci = num => {
  const result = [0, 1];

  for (let i = 2; i <= num; i++) {
    const previousNumber1 = result[i - 1];
    const previousNumber2 = result[i - 2];
    result.push(previousNumber1 + previousNumber2);
  }

  return result[num];
}


const fibonacci_recursive = num => {
  // Base case
  if (num < 2) {
    return num;
  }

  return fibonacci_recursive(num - 1) + fibonacci_recursive(num -2);
}
