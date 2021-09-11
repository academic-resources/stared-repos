// Write a function that takes an unsigned integer and return the number of '1' bits it has (also known as the Hamming weight).

 

// Example 1:

// Input: 00000000000000000000000000001011
// Output: 3
// Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.
// Example 2:

// Input: 00000000000000000000000010000000
// Output: 1
// Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.
// Example 3:

// Input: 11111111111111111111111111111101
// Output: 31
// Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.
 

// Note:

// Note that in some languages such as Java, there is no unsigned integer type. In this case, the input will be given as signed integer type and should not affect your implementation, as the internal binary representation of the integer is the same whether it is signed or unsigned.
// In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 3 above the input represents the signed integer -3.
 

// Follow up:

// If this function is called many times, how would you optimize it?

/**
 * @param {number} n - a positive integer
 * @return {number}
 */

 // mine
function hammingWeight(n) {
  return n.toString(2).split('').reduce((sum, bit) => Number(sum) + Number(bit))
}

console.log(hammingWeight(00000000000000000000000000001011))
console.log(hammingWeight(00000000000000000000000010000000))
console.log(hammingWeight(11111111111111111111111111111101))

// RegEx
function hammingWeightRegex(n) {
  return n.toString(2).replace(/0/g, '').length;
}

console.log(hammingWeightRegex(00000000000000000000000000001011))
console.log(hammingWeightRegex(00000000000000000000000010000000))
console.log(hammingWeightRegex(11111111111111111111111111111101))

// loop an flip O(1)
  function hammingWeightBitMask(n) {
    let bits = 0
    let mask = 1
    for (let i = 0; i < 32; i++) {
      if ((n & mask) != 0) bits++
      mask <<= 1
    }
    return bits
  }

console.log(hammingWeightBitMask(00000000000000000000000000001011))
console.log(hammingWeightBitMask(00000000000000000000000010000000))
console.log(hammingWeightBitMask(11111111111111111111111111111101))


function hammingWeightBitManip(n) {
  let result = 0;
  while (n != 0) {
      if ((n & 1) === 1) result++;
      n = n >>> 1;
  }
  return result;
}

console.log(hammingWeightBitManip(00000000000000000000000000001011))
console.log(hammingWeightBitManip(00000000000000000000000010000000))
console.log(hammingWeightBitManip(11111111111111111111111111111101))