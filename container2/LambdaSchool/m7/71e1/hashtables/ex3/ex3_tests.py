import unittest

from ex3 import intersection


class TestEx2(unittest.TestCase):
    def test_small(self):
        
        result = intersection([
            [1,2,3],
            [1,4,5],
            [1,6,7]
        ])
        self.assertTrue(result == [1])
        
        result = intersection([
            [1],
            [1],
        ])
        self.assertTrue(result == [1])
        
        result = intersection([
            [1,2],
            [1],
        ])
        self.assertTrue(result == [1])

        result = intersection([
            [1,2,3],
            [1,4,5,3],
            [1,6,7,3]
        ])
        result.sort()
        self.assertTrue(result == [1, 3])
        
    def test_large(self):
        arrays = [
            list(range(1000000, 2000000)) + [1,2,3],
            list(range(2000000, 3000000)) + [1,2,3],
            list(range(3000000, 4000000)) + [1,2,3],
            list(range(4000000, 5000000)) + [1,2,3],
            list(range(5000000, 6000000)) + [1,2,3],
            list(range(6000000, 7000000)) + [1,2,3],
            list(range(7000000, 8000000)) + [1,2,3],
            list(range(8000000, 9000000)) + [1,2,3],
            list(range(9000000, 10000000)) + [1,2,3],
            list(range(10000000, 11000000)) + [1,2,3]
        ]
        result = intersection(arrays)
        result.sort()
        self.assertTrue(result == [1, 2, 3])
        

if __name__ == '__main__':
    unittest.main()
