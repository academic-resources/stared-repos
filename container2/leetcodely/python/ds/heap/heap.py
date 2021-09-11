import heapq
from python.ds.heap.error import HeapError


class MinHeap:
    def __init__(self):
        self.heap = []

    def push(self, item):
        heapq.heappush(self.heap, item)

    def pop(self):
        return heapq.heappop(self.heap)

    def peek(self):
        if len(self.heap) == 0:
            raise HeapError("Peeking into an empty heap")
        return heapq.nsmallest(1, self.heap)[0]

    def __len__(self):
        return len(self.heap)


class MaxHeap(MinHeap):
    def __init__(self):
        super().__init__()

    def peek(self):
        if len(self.heap) == 0:
            raise HeapError("Peeking into an empty heap")
        return heapq.nlargest(1, self.heap)[0]

    def pop(self):
        if len(self.heap) == 0:
            raise HeapError("Popping off an empty heap")
        return self.heap.pop()


if __name__ == '__main__':
    min_heap = MinHeap()
    min_heap.push(12)
    min_heap.push(3)
    min_heap.push(17)
    print(min_heap.pop())
    print(min_heap.pop())
