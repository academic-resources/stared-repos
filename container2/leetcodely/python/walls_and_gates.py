"""Created by sgoswami on 8/31/17."""
"""You are given a m x n 2D grid initialized with these three possible values.
-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that 
the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be 
filled with INF.
For example, given the 2D grid:

[['INF',  -1,  0,  'INF'],
['INF', 'INF', 'INF',  -1],
['INF',  -1, 'INF',  -1],
[ 0,  -1, 'INF', 'INF']]
  
After running your function, the 2D grid should be:

  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4"""

import collections


class Solution(object):
    def wallsAndGates(self, rooms):
        """
        :type rooms: List[List[int]]
        :rtype: void Do not return anything, modify rooms in-place instead.
        """
        queue = collections.deque()
        for i in range(len(rooms)):
            for j in range(len(rooms[i])):
                if rooms[i][j] == 0:
                    queue.appendleft((i, j))

        while len(queue) > 0:
            curr = queue.pop()
            if curr[0] + 1 < len(rooms) and rooms[curr[0] + 1][curr[1]] == 2147483647:
                rooms[curr[0] + 1][curr[1]] = rooms[curr[0]][curr[1]] + 1
                queue.appendleft((curr[0] + 1, curr[1]))
            if curr[0] - 1 >= 0 and rooms[curr[0] - 1][curr[1]] == 2147483647:
                rooms[curr[0] - 1][curr[1]] = rooms[curr[0]][curr[1]] + 1
                queue.appendleft((curr[0] - 1, curr[1]))
            if curr[1] + 1 < len(rooms[curr[0]]) and rooms[curr[0]][curr[1] + 1] == 2147483647:
                rooms[curr[0]][curr[1] + 1] = rooms[curr[0]][curr[1]] + 1
                queue.appendleft((curr[0], curr[1] + 1))
            if curr[1] - 1 >= 0 and rooms[curr[0]][curr[1] - 1] == 2147483647:
                rooms[curr[0]][curr[1] - 1] = rooms[curr[0]][curr[1]] + 1
                queue.appendleft((curr[0], curr[1] - 1))

        print(rooms)


if __name__ == '__main__':
    solution = Solution()
    solution.wallsAndGates([[2147483647, -1, 0, 2147483647],
                            [2147483647, 2147483647, 2147483647, -1],
                            [2147483647, -1, 2147483647, -1],
                            [0, -1, 2147483647, 2147483647]])
