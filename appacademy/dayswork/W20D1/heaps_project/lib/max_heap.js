class MaxHeap {
  constructor() {
    this.array = [null]
  }

  getParent(idx) {
    return Math.floor(idx / 2)
  }

  getLeftChild(idx) {
    return idx * 2
  }

  getRightChild(idx) {
    return 2 * idx + 1
  }

  siftUp(idx) {
    if (idx === 1) return
    const parentIdx = this.getParent(idx)
    if (this.array[idx] > this.array[parentIdx]) {
      ;[this.array[idx], this.array[parentIdx]] = [
        this.array[parentIdx],
        this.array[idx]
      ]
      this.siftUp(parentIdx)
    }
  }

  insert(val) {
    this.array.push(val)
    this.siftUp(this.array.length - 1)
  }

  siftDown(idx) {
    const leftIdx = idx * 2
    const rightIdx = leftIdx + 1
    const leftVal = this.array[leftIdx] || -Infinity
    const rightVal = this.array[rightIdx] || -Infinity
    const thisVal = this.array[idx]

    if (thisVal >= leftVal && thisVal >= rightVal) return

    let swapIdx
    if (leftVal > rightVal) {
      swapIdx = leftIdx
    } else {
      swapIdx = rightIdx
    }

    ;[this.array[swapIdx], this.array[idx]] = [
      this.array[idx],
      this.array[swapIdx]
    ]

    this.siftDown(swapIdx)
  }

  deleteMax() {
    if (this.array.length === 1) return null
    if (this.array.length === 2) return this.array.pop()
    const max = this.array[1]
    this.array[1] = this.array.pop()
    this.siftDown(1)
    return max
  }
}

module.exports = {
  MaxHeap
}
