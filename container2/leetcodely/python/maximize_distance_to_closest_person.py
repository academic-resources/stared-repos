"""In a row of seats, 1 represents a person sitting in that seat, and 0 represents that the seat is empty.
There is at least one empty seat, and at least one person sitting.
Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized.
Return that maximum distance to closest person."""


class Solution(object):
    def maxDistToClosest(self, seats):
        """
        :type seats: List[int]
        :rtype: int
        """
        last_index = -1
        max_len = 0
        for i in range(len(seats)):
            if seats[i] == 1:
                max_len = max(max_len, abs(i - last_index - 1))
                last_index = i

        if seats[0] == 0:
            for i in range(len(seats)):
                if seats[i] == 1:
                    max_len = max(max_len, i)
        if seats[-1] == 0:
            seats = seats[::-1]
            for i in range(len(seats)):
                if seats[i] == 1:
                    max_len = max(max_len, i)
        return max_len


if __name__ == '__main__':
    solution = Solution()
    print(solution.maxDistToClosest([1, 0, 0, 0, 1, 0, 1]))
    print(solution.maxDistToClosest([1, 0, 0, 0]))
