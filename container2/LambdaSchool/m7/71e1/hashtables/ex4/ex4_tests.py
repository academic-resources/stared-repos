import unittest

from ex4 import has_negatives


class TestEx4(unittest.TestCase):

    def test_small(self):
        result = has_negatives([1,2,3])
        self.assertTrue(result == [])

        result = has_negatives([-1,-2,1,2,3,4,-4])
        result.sort()
        self.assertTrue(result == [1, 2, 4])
        
    def test_large(self):
        a = list(range(5000000))
        a += [-1,-2,-3]

        result = has_negatives(a)
        result.sort()
        self.assertTrue(result == [1, 2, 3])
        
if __name__ == '__main__':
    unittest.main()
