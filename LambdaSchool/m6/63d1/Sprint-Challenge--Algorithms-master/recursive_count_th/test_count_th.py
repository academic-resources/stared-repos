import unittest
import random
from count_th import *


class Test(unittest.TestCase):
    def setUp(self):
        self.word = ""

    def test_count_th_empty(self):
        self.word = ""
        count = count_th(self.word)
        self.assertEqual(0, count)

    def test_count_th_single(self):
        self.word = "abcthxyz"
        count = count_th(self.word)
        self.assertEqual(1, count)

    def test_count_th_multiple(self):
        self.word = "abcthefthghith"
        count = count_th(self.word)
        self.assertEqual(3, count)

    def test_count_backwards(self):
        self.word = "thhtthht"
        count = count_th(self.word)
        self.assertEqual(2, count)

    def test_count_th_mixedcase(self):
        self.word = "THtHThth"
        count = count_th(self.word)
        self.assertEqual(1, count)


if __name__ == "__main__":
    unittest.main()
