"""Given an Iterator class interface with methods: next() and hasNext(), design and implement a PeekingIterator that
support the peek() operation -- it essentially peek() at the element that will be returned by the next call to next()."""


# Below is the interface for Iterator, which is already defined for you.

class Iterator(object):
    def __init__(self, nums):
        """
        Initializes an iterator object to the beginning of a list.
        :type nums: List[int]
        """

    def hasNext(self):
        """
        Returns true if the iteration has more elements.
        :rtype: bool
        """

    def next(self):
        """
        Returns the next element in the iteration.
        :rtype: int
        """


class PeekingIterator(object):
    def __init__(self, iterator):
        self.iter = iterator
        self.temp = self.iter.next() if self.iter.hasNext() else None

    def peek(self):
        return self.temp

    def next(self):
        res = self.temp
        self.temp = self.iter.next() if self.iter.hasNext() else None
        return res

    def hasNext(self):
        return self.temp is not None
