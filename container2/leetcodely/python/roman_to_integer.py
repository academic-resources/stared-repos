class Solution:
    def romanToInt(self, s: str) -> int:
        mapper = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1}
        total, i = 0, 0
        while i < len(s):
            if len(s) - i >= 2 and mapper[s[i]] < mapper[s[i + 1]]:
                total += (mapper[s[i + 1]] - mapper[s[i]])
                i += 2
            else:
                total += mapper[s[i]]
                i += 1
        return total


import unittest


class TestRomanToInteger(unittest.TestCase):
    def test_one(self):
        self.assertEqual(Solution().romanToInt('III'), 3)

    def test_two(self):
        self.assertEqual(Solution().romanToInt('IV'), 4)

    def test_three(self):
        self.assertEqual(Solution().romanToInt('IX'), 9)

    def test_four(self):
        self.assertEqual(Solution().romanToInt('LVIII'), 58)

    def test_five(self):
        self.assertEqual(Solution().romanToInt('MCMXCIV'), 1994)


unittest.main(exit=False)
