"""Given a non-negative integer represented as a non-empty array of digits, plus one to the integer.
You may assume the integer do not contain any leading zero, except the number 0 itself.
The digits are stored such that the most significant digit is at the head of the list."""


class Solution(object):
    def plusOne(self, digits):
        """
        :type digits: List[int]
        :rtype: List[int]
        """
        res = digits[:]
        carry = 1
        for i in range(len(digits) - 1, -1, -1):
            val = digits[i] + carry
            carry, val = divmod(val, 10)
            res[i] = val
            if i == 0 and carry > 0:
                res.insert(0, carry)
        return res


if __name__ == '__main__':
    solution = Solution()
    print(solution.plusOne([9, 9]))
