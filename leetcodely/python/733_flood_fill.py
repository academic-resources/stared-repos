"""An image is represented by a 2-D array of integers, each integer representing the pixel value of
the image (from 0 to 65535). Given a coordinate (sr, sc) representing the starting pixel (row and column) of the flood fill,
and a pixel value newColor, "flood fill" the image.

To perform a "flood fill", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel
of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same
color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.

At the end, return the modified image."""


class Solution:
    def floodFill(self, image, sr, sc, newColor):
        """
        :type image: List[List[int]]
        :type sr: int
        :type sc: int
        :type newColor: int
        :rtype: List[List[int]]
        """
        visited = [[0 for _ in range(len(image[0]))] for _ in range(len(image))]
        self.dfs(image, visited, sr, sc, image[sr][sc], newColor)
        return image

    def dfs(self, image, visited, row, col, oldColor, newColor):
        if visited[row][col] == 1 or image[row][col] != oldColor:
            return
        visited[row][col] = 1
        image[row][col] = newColor
        if row + 1 < len(image):
            self.dfs(image, visited, row + 1, col, oldColor, newColor)
        if row - 1 >= 0:
            self.dfs(image, visited, row - 1, col, oldColor, newColor)
        if col + 1 < len(image[0]):
            self.dfs(image, visited, row, col + 1, oldColor, newColor)
        if col - 1 >= 0:
            self.dfs(image, visited, row, col - 1, oldColor, newColor)


if __name__ == '__main__':
    image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
    solution = Solution()
    print(solution.floodFill(image, 1, 1, 2))
