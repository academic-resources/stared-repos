"""Given numRows, generate the first numRows of Pascal's triangle.
For example, given numRows = 5,
Return
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]"""

class Solution:
    def generate(self, numRows):
        """
        :type numRows: int
        :rtype: List[List[int]]
        """
        result = []
        for i in range(numRows):
            curr = []
            for j in range(i+1):
                element = self.combination(i, j)
                curr.append(element)
            result.append(curr)
        return result

    def combination(self, row, item):
        if item > row:
            raise ValueError('Item cannot be greater than row')
        a, b, c = self.factorial(row), self.factorial(row - item), self.factorial(item)
        return a//(b*c)

    def factorial(self, num):
        if num == 0 or num == 1:
            return 1
        if num <= 0:
            raise ValueError('Factorial cannot be calculated for negative numbers')
        res = 1
        while num >= 1:
            res *= num
            num -= 1
        return res


if __name__ == '__main__':
    solution = Solution()
    print(solution.generate(5))