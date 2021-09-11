import time
import unittest
from sliding_window_max import sliding_window_max

class Test(unittest.TestCase):
    def test_sliding_window_max_large_input(self):
        arr = []
        k = 1000

        with open("E:\\projects\\LambdaSchool\\m6\\63c1\\sliding_window_max\\data\\input.txt") as file:
            for line in file:
                arr.append(int(line.strip()))

        expected = []

        with open("E:\\projects\\LambdaSchool\\m6\\63c1\\sliding_window_max\\data\\output.txt") as file:
            for line in file:
                expected.append(int(line.strip()))

        start_time = time.time()
        answer = sliding_window_max(arr, k)
        end_time = time.time()
        print('start = ' + str(start_time) + ' end = ' + str(end_time) + ' total time = ' + str(start_time-end_time))
        self.assertTrue((end_time - start_time) < 1)
        self.assertEqual(answer, expected)


if __name__ == '__main__':
    unittest.main()
