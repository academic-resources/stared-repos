"""Given an integer array sorted in ascending order, write a function to search target in nums.  If target exists,
then return its index, otherwise return -1. However, the array size is unknown to you. You may only access the array
using an ArrayReader interface, where ArrayReader.get(k) returns the element of the array at index k (0-indexed).

You may assume all integers in the array are less than 10000, and if you access the array out of bounds,
ArrayReader.get will return 2147483647."""


class ArrayReader:
    def __init__(self, arr):
        self.arr = arr

    def get(self, index):
        if index >= len(self.arr):
            return 2147483647
        else:
            return self.arr[index]


class Solution(object):
    def search(self, reader, target):
        """
        :type reader: ArrayReader
        :type target: int
        :rtype: int
        """
        hi = 1
        while reader.get(hi) < target:
            hi = hi << 1
        lo = hi >> 1

        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if reader.get(mid) < target:
                lo = mid + 1
            elif reader.get(mid) > target:
                hi = mid - 1
            else:
                return mid
        return -1


if __name__ == '__main__':
    reader = ArrayReader([-1, 0, 3, 5, 9, 12])
    solution = Solution()
    print(solution.search(reader, 9))
