""" Given two 1d vectors, implement an iterator to return their elements alternately.
For example, given two 1d vectors:
v1 = [1, 2]
v2 = [3, 4, 5, 6]
By calling next repeatedly until hasNext returns false, the order of elements returned by next should be:
[1, 3, 2, 4, 5, 6]. """

class ZigzagIterator(object):

    def __init__(self, v1, v2):
        """
        Initialize your data structure here.
        :type v1: List[int]
        :type v2: List[int]
        """
        self.queue = [item for item in (v1, v2) if item]

    def next(self):
        """
        :rtype: int
        """
        v = self.queue.pop(0)
        ans = v.pop(0)
        if v:
            self.queue.append(v)
        return ans

    def hasNext(self):
        """
        :rtype: bool
        """
        return len(self.queue) > 0


if __name__ == '__main__':
    zigzag = ZigzagIterator([1, 2], [3, 4, 5, 6])
    while zigzag.hasNext():
        print(zigzag.next())
