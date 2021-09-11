"""Created by sgoswami on 9/3/17."""
"""Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

For example, given the following matrix:

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
Return 6."""


class Solution(object):
    def maximalRectangle(self, matrix):
        """
        :type matrix: List[List[str]]
        :rtype: int
        """
        max_area = -1
        memo = [0 for _ in range(len(matrix))]
        for i, v in enumerate(matrix):
            memo = [memo[j] + v[j] for j in range(len(matrix))]
            curr_area = self.largestRectangleArea(memo)
            max_area = max(max_area, curr_area)
        return max_area

    def largestRectangleArea(self, heights):
        """
        :type heights: List[int]
        :rtype: int
        """
        if not heights or len(heights) == 0:
            return 0
        stack = []
        i, area = 0, -1
        while i < len(heights):
            if len(stack) == 0 or heights[stack[-1]] <= heights[i]:
                stack.append(i)
                i += 1
            else:
                top = stack.pop()
                if len(stack) == 0:
                    curr_area = heights[top] * i
                else:
                    curr_area = heights[top] * (i - stack[-1] - 1)
                area = max(area, curr_area)

        while len(stack) > 0:
            top = stack.pop()
            if len(stack) == 0:
                curr_area = heights[top] * i
            else:
                curr_area = heights[top] * (i - stack[-1] - 1)
            area = max(area, curr_area)
        return area


if __name__ == '__main__':
    solution = Solution()
    print(solution.maximalRectangle([[1, 0, 1, 0, 0],
                                     [1, 0, 1, 1, 1],
                                     [1, 1, 1, 1, 1],
                                     [1, 0, 0, 1, 0]]))
