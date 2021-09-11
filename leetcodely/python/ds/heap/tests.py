import unittest
from python.ds.heap.heap import MinHeap, MaxHeap


class TestHeap(unittest.TestCase):

    def test_push(self):
        min_heap = MinHeap()
        max_heap = MaxHeap()
        min_heap.push(12)
        max_heap.push(13)
        self.assertEqual(len(min_heap), 1)
        self.assertEqual(len(max_heap), 1)

    def test_peek(self):
        min_heap = MinHeap()
        max_heap = MaxHeap()
        min_heap.push(15)
        max_heap.push(17)
        min_heap.push(11)
        max_heap.push(9)
        self.assertEqual(min_heap.peek(), 11)
        self.assertEqual(max_heap.peek(), 17)

    def test_pop(self):
        min_heap = MinHeap()
        max_heap = MaxHeap()
        min_heap.push(12)
        max_heap.push(13)
        min_heap.push(15)
        max_heap.push(17)
        min_heap.push(11)
        max_heap.push(9)
        self.assertEqual(min_heap.pop(), 11)
        self.assertEqual(max_heap.pop(), 17)
        self.assertEqual(min_heap.pop(), 12)
        self.assertEqual(max_heap.peek(), 13)
        self.assertEqual(min_heap.pop(), 15)
        self.assertEqual(max_heap.peek(), 9)


if __name__ == '__main__':
    unittest.main()