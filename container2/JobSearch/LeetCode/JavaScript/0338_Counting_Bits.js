// Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

// Example 1:

// Input: 2
// Output: [0,1,1]
// Example 2:

// Input: 5
// Output: [0,1,1,2,1,2]
// Follow up:

// It is very easy to come up with a solution with run time O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a single pass?
// Space complexity should be O(n).
// Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.

// 0,1,1,2,1,2

/**
 * @param {number} num
 * @return {number[]}
 */

function countBitsGroups(num, groupSize = 2) {
  const result = []
  let group = []
  for (let i = 0; i <= num; i++) {
    group.push(Number(hammingWeight(i)))
    if ((i + 1) % groupSize === 0) {result.push(group); group = []}
  }
  return [...result, group]
}

function countBits(num) {
  const result = []
  for (let i = 0; i <= num; i++) {
    result.push(Number(hammingWeight(i)))
  }
  return result
}

function hammingWeight(n) {
  return n.toString(2).split('').reduce((sum, bit) => Number(sum) + Number(bit))
}

console.log(countBits())
console.log(countBits(2))
console.log(countBits(5))
console.log(countBits(10))

function countBitsPatternFull(num) {
  const result = []
  let seed = "01"
  console.log(seed)
  let seedGrowth = ""
  for (let i = 0; i <= num; i++) {
    const seedLn = seed.length
    let position = i % seedLn
    let groupCt = i / seedLn | 0
    let base = result[groupCt] || 0
    let elem = base + Number(seed[position])
    result.push(elem)
    seedGrowth += elem
    if (seedGrowth.length === 2 * seedLn) {
      seed = seedGrowth
      console.log(seed)
    }
  }
  return result
}

console.log(countBitsPatternFull(32))


function countBitsPattern(num) {
  const result = []
  let seed = "01"
  for (let i = 0; i <= num; i++) {
    let position = i % 2
    let groupCt = i / 2 | 0
    let base = result[groupCt] || 0
    result.push(base + Number(seed[position]))
  }
  return result
}

console.log(countBitsPattern())
console.log(countBitsPattern(2))
console.log(countBitsPattern(5))
console.log(countBitsPattern(10))

function countBitsPattern2(num) {
  const result = [0]
  for (let i = 1; i <= num; i++) {
    let position = i % 2
    let groupCt = i / 2 | 0
    let base = result[groupCt]
    result.push(base + position)
  }
  return result
}

console.log(countBitsPattern2())
console.log(countBitsPattern2(2))
console.log(countBitsPattern2(5))
console.log(countBitsPattern2(10))

function countBitsBitManip(num) {
  let result = [0]
  for (let i = 1; i <= num; ++i){
      if (i % 2 === 0 ) result[i] = result[i >> 1];
      else result[i] = result[i - 1] + 1;
  }
  return result;
}

console.log(countBitsBitManip())
console.log(countBitsBitManip(2))
console.log(countBitsBitManip(5))

// console.log(countBitsGroups(32));



