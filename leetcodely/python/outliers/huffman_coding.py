"""Huffman coding is a lossless data compression algorithm. The idea is to assign variable-length codes to input
characters, lengths of the assigned codes are based on the frequencies of corresponding characters.
The most frequent character gets the smallest code and the least frequent character gets the largest code.

We'd apply the following rules in order of priority to break ties.
1. Least frequency
2. Shortest length
3. Lexicographic ordering.
"""
import heapq
from collections import Counter


class HuffmanCoding:
    def __init__(self):
        self.heap = []

    def encode(self, string):
        frequency_map = Counter(string)
        for k, v in frequency_map.items():
            p = Node(k, v)
            heapq.heappush(self.heap, p)
        while len(self.heap) > 2:
            p = heapq.heappop(self.heap)
            q = heapq.heappop(self.heap)
            n = Node(p.key + q.key, p.value + q.value)
            n.left = p
            n.right = q
            heapq.heappush(self.heap, n)

        def traverse(p, path):
            if not p.left and not p.right:
                frequency_map[p.key] = str(path)
                return
            if p.left:
                traverse(p.left, path + str(0))
            if p.right:
                traverse(p.right, path + str(1))

        root = heapq.heappop(self.heap)
        traverse(root, '')
        res = ''
        for item in string:
            res += str(frequency_map[item])
        return res

    def decode(self, string):
        pass


class Node:
    def __init__(self, key: str, value: int):
        self.key = key
        self.value = value
        self.left = None
        self.right = None

    def __lt__(self, other):
        if self.value > other.value:
            return True
        elif len(self.key) > len(other.key):
            return True
        elif self.key > other.key:
            return True


if __name__ == '__main__':
    huffman = HuffmanCoding()
    print(huffman.encode('katya'))
