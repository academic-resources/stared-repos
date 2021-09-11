let startTime, endTime

function start() {
  startTime = new Date()
}

function end() {
  endTime = new Date()
  let timdDiff = endTime - startTime //in ms
  console.log("      " + timdDiff + " ms")
}

let { MaxHeap } = require ('./max_heap')

function heapify(arr) {
  let heap = new MaxHeap()
  arr.forEach(num => heap.insert(num))
  return heap.array
}

function sort(arr) {
  return arr.sort((a, b) => a - b)
}

function randomArray(size) {
  let array = []
  while (array.length < size) {
    let randomNum = Math.floor(Math.random() * 1000)
    array.push(randomNum)
  }
  return array
}

function runTest(size) {
  let array = randomArray(size)
  console.log(`\n----Testing array of size ${size}----`)
  console.log('    heapify')
  start()
  heapify(array)
  end()
  console.log('    full sort')
  start()
  sort(array)
  end()
  console.log()
}
runTest(10000)
runTest(100000)
runTest(1000000)
runTest(10000000)
