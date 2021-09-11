"""Created by sgoswami on 6/17/17."""
"""Write an efficient algorithm that searches for a value in an m x n matrix. 
This matrix has the following properties:
Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom."""


class Solution(object):
    def searchMatrix(self, matrix, target):
        """
        :type matrix: List[List[int]]
        :type target: int
        :rtype: bool
        """
        if not matrix or len(matrix) == 0 or len(matrix[0]) == 0:
            return False
        # row, col = len(matrix) - 1, 0
        # while row >= 0 and col < len(matrix[row]):
        #     if matrix[row][col] == target:
        #         return True
        #     else:
        #         if target < matrix[row][col]:
        #             row -= 1
        #         else:
        #             col += 1
        # return False
        row, col = len(matrix) - 1, 0
        while row >= 0 and col < len(matrix[row]):
            if target < matrix[row][col]:
                row -= 1
            elif target > matrix[row][col]:
                col += 1
            elif target == matrix[row][col]:
                return True
        return False


if __name__ == '__main__':
    solution = Solution()
    print(solution.searchMatrix([[-1], [-1]], 0))
