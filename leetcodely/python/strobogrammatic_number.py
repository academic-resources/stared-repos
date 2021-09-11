"""A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).
Write a function to determine if a number is strobogrammatic. The number is represented as a string."""


class Solution(object):
    def isStrobogrammatic(self, num):
        """
        :type num: str
        :rtype: bool
        """
        numbers = {"6": "9", "9": "6", "8": "8", "0": "0", "1": "1"}

        low, high = 0, len(num) - 1
        while low <= high:
            if num[low] not in numbers:
                return False
            if numbers[num[low]] != num[high]:
                return False
            low += 1
            high -= 1
        return True


if __name__ == '__main__':
    solution = Solution()
    print(solution.isStrobogrammatic('2'))
