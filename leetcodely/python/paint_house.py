"""Created by sgoswami on 7/29/17."""
"""There are a row of n houses, each house can be painted with one of the three colors: red, blue or green. The cost of 
painting each house with a certain color is different. You have to paint all the houses such that no two adjacent 
houses have the same color.

The cost of painting each house with a certain color is represented by a n x 3 cost matrix. For example, costs[0][0] 
is the cost of painting house 0 with color red; costs[1][2] is the cost of painting house 1 with color green, 
and so on... Find the minimum cost to paint all houses."""


class Solution(object):
    def minCost(self, costs):
        """
        :type costs: List[List[int]]
        :rtype: int
        """
        # Greedy approach will not yield an optimum solution here
        if not costs:
            return 0
        F = costs[0]
        curr = [0] * 3
        for i in range(1, len(costs)):
            curr[0] = min(F[1], F[2]) + costs[i][0]
            curr[1] = min(F[0], F[2]) + costs[i][1]
            curr[2] = min(F[0], F[1]) + costs[i][2]
            F = curr[:]
        return min(F)

        # if not costs:
        #     return 0
        # f = costs[0]
        # curr = [0] * 3
        #
        # for i in range(1, len(costs)):
        #     curr[0] = min(f[1], f[2]) + costs[i][0]
        #     curr[1] = min(f[0], f[2]) + costs[i][1]
        #     curr[2] = min(f[0], f[1]) + costs[i][2]
        #     f = curr[:]
        # return min(f)

if __name__ == '__main__':
    solution = Solution()
    print(solution.minCost([[5, 8, 6], [19, 14, 13], [7, 5, 12], [14, 15, 17], [3, 20, 10]]))