"""Created by sgoswami on 7/4/17."""
"""Convert a non-negative integer to its english words representation. Given input is guaranteed 
to be less than 2^31 - 1."""


class Solution(object):
    def __init__(self):
        self.units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven',
                 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
        self.tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
        self.thousands = ['', 'Thousand', 'Million', 'Billion']

    def numberToWords(self, num):
        """
        :type num: int
        :rtype: str
        """
        if num == 0:
            return "Zero"
        res = ""
        for i in range(len(self.thousands)):
            if num % 1000 != 0:
                res = self.helper(num % 1000) + self.thousands[i] + " " + res
            num //= 1000
        return res.strip()

    def helper(self, num):
        if num == 0:
            return ""
        elif num < 20:
            return self.units[num] + " "
        elif num < 100:
            return self.tens[num // 10] + " " + self.helper(num % 10)
        else:
            return self.units[num // 100] + " Hundred " + self.helper(num % 100)


if __name__ == '__main__':
    solution = Solution()
    print(solution.numberToWords(23))
