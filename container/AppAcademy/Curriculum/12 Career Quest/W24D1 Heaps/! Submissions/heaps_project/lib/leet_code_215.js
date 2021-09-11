function findKthLargestSort(nums, k) {
  let sorted = nums.sort((a, b) => (a - b))
  return sorted[nums.length - k]
}

function findKthLargest(nums, k) {
  let heap = new MaxHeap()
  nums.forEach(num => heap.insert(num))
  for (let i = 1; i < k; i++) heap.deleteMax()
  return heap.deleteMax()
}

class MaxHeap {
  constructor() {
      this.array = [ null ]
  }

  getParent(idx) {
      return Math.floor(idx / 2)
  }

  getLeftChild(idx) {
      return idx * 2
  }

  getRightChild(idx) {
      return idx * 2 + 1
  }

  siftUp(idx) {
      if (idx === 1) return
      let parentIdx = this.getParent(idx)

      if (this.array[idx] > this.array[parentIdx]) {
          [this.array[idx], this.array[parentIdx]] =
          [this.array[parentIdx], this.array[idx]]
          this.siftUp(parentIdx)
      }
  }

  insert(val) {
      this.array.push(val)
      this.siftUp(this.array.length - 1)
  }

  siftDown(idx) {
      let leftIdx = this.getLeftChild(idx)
      let rightIdx = this.getRightChild(idx)
      let leftVal = this.array[leftIdx]
      let rightVal = this.array[rightIdx]
      let currVal = this.array[idx]

      if (leftVal === undefined) leftVal = -Infinity
      if (rightVal === undefined) rightVal = -Infinity
      if (currVal > leftVal && currVal > rightVal) return
      
      let swapIdx;
      leftVal > rightVal ? swapIdx = leftIdx : swapIdx = rightIdx; // But Does?

      [this.array[idx], this.array[swapIdx]] = [this.array[swapIdx], this.array[idx]]

      this.siftDown(swapIdx)
  }

  deleteMax() {
      if (this.array.length === 2) return this.array.pop()
      if (this.array.length === 1) return null

      let max = this.array[1]
      this.array[1] = this.array.pop()
      this.siftDown(1)

      return max
  }
}