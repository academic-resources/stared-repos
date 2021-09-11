"""Created by sgoswami on 4/15/17 as part of leetcode"""
"""Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order."""
"""For example, Given the following matrix:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
You should return [1,2,3,6,9,8,7,4,5]"""


class Solution(object):
    def spiralOrder(self, matrix):
        """
        :type matrix: List[List[int]]
        :rtype: List[int]
        """
        if not matrix or len(matrix) == 0:
            return matrix
        result = []

        def traverse(row_begin, col_begin, row_end, col_end):
            if row_begin > row_end or col_begin > col_end:
                return
            for i in range(col_begin, col_end + 1):
                result.append(matrix[row_begin][i])
            row_begin += 1

            for i in range(row_begin, row_end + 1):
                result.append(matrix[i][col_end])
            col_end -= 1

            for i in range(col_end, col_begin - 1, -1):
                result.append(matrix[row_end][i])
            row_end -= 1

            for i in range(row_end, row_begin - 1, -1):
                result.append(matrix[i][col_begin])
            col_begin += 1
            traverse(row_begin, col_begin, row_end, col_end)
        traverse(0, 0, len(matrix) - 1, len(matrix[0]) - 1)

        return result


if __name__ == '__main__':
    s = Solution()
    print(s.spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))
