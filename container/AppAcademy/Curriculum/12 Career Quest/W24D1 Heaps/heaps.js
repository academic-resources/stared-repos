class MaxHeap {
    constructor() {
        this.array = [null];
    }

    getParent(idx) {
        return Math.floor(idx / 2);
    }

    getLeftChild(idx) {
        return idx * 2;
    }

    getRightChild(idx) {
        return idx * 2 + 1;
    }

    insert(val) {
      // add the new node to the bottom level, far-left 
      this.array.push(val);
      
      // then, sift that value up the heap to restore heap property
      this.siftUp(this.array.length - 1);
    }

    siftUp(idx) {
        // if the node is already at the root, there's no further we can sift up
        if (idx === 1) return;
        
        let parentIdx = this.getParent(idx);

        // if the node is bigger than it's parent, we are breaking heap property...
        if (this.array[parentIdx] < this.array[idx]) {
            // so swap the node with it's parent
            [ this.array[parentIdx], this.array[idx] ] = [ this.array[idx], this.array[parentIdx] ];

            // and continue to sift it up recursively
            this.siftUp(parentIdx);
        }
    }
    deleteMax() {
      // recall that we have an empty position at the very front of the array, 
      // so an array length of 2 means there is only 1 item in the heap
      
      // if there is only 1 element in the heap, simply remove it
      if (this.array.length === 2) return this.array.pop();
      
      // if there are no elements in the heap, do nothing
      if (this.array.length === 1) return null;

      // otherwise remove the last element and make it the root at the front of the array
      let max = this.array[1];
      this.array[1] = this.array.pop();

      // then, sift the new root down to restore heap property
      this.siftDown(1);
      return max;
  }

  siftDown(idx) {
      let ary = this.array;
      let leftIdx = this.getLeftChild(idx);
      let rightIdx = this.getRightChild(idx); 
      let leftVal = ary[leftIdx];
      let rightVal = ary[rightIdx];
      let val = ary[idx]

      // if the node is missing children, consider the missing children as the value -Infinity
      // this allows the node to keep heap property, since any value is greater than -Infinity
      // this will also give us children values to compare later, undefined should not be used for comparison**
      if (leftVal === undefined) leftVal = -Infinity;
      if (rightVal === undefined) rightVal = -Infinity;
  
      // if the node is bigger than both children, we have restored heap property, so exit
      if (val > leftVal && val > rightVal) return;
  
      // otherwise the node is bigger than one of it's children,
      // so swap this node with the bigger between the two children**
      if (leftVal < rightVal) {
        var swapIdx = rightIdx;
      } else {
        var swapIdx = leftIdx;
      }
      [ ary[idx], ary[swapIdx] ] = [ ary[swapIdx], ary[idx] ];

      // and continue to sift it down recursively
      this.siftDown(swapIdx);
    }
}

let heap = new MaxHeap()
heap.insert(42)
heap.insert(32)
heap.insert(24)
heap.insert(100)
heap.insert(50)
heap.insert(27)
console.log(heap.array)
console.log(heap.deleteMax())
console.log(heap.array)


// Time Complexity Analysis
// insert: O(log(n))
// deleteMax: O(log(n))
// Recall that our heap will be a complete/balanced tree. This means it's height is log(n) where n is the number of items. Both insert and deleteMax have a time complexity of log(n) because of siftUp and siftDown respectively. In worst case insert, we will have to siftUp a leaf all the way to the root of the tree. In the worst case deleteMax, we will have to siftDown the new root all the way down to the leaf level. In either case, we'll have to traverse the full height of the tree, log(n).

// Array Heapify Analysis
// Now that we have established O(log(n)) for a single insertion, let's analyze the time complexity for turning an array into a heap (we call this heapify, coming in the next project :)). The algorithm itself is simple, just perform an insert for every element. Since there are n elements and each insert requires log(n) time, our total complexity for heapify is O(nlog(n))... Or is it? There is actually a tighter bound on heapify. The proof requires some math that you won't find valuable in your job search, but do understand that the true time complexity of heapify is amortized O(n). Amortized refers to the fact that our analysis is about performance over many insertions.

// Space Complexity Analysis
// O(n), since we use a single array to store heap data.