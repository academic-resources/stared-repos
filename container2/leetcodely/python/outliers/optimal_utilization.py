class Solution:
    def optimalUtilization(deviceCapacity, foregroundAppList, backgroundAppList):
        result = {}

        for i in range(len(foregroundAppList)):
            for j in range(len(backgroundAppList)):
                utilization = foregroundAppList[i][1] + backgroundAppList[j][1]
                if utilization <= deviceCapacity:
                    result[(foregroundAppList[i][0], backgroundAppList[j][0])] = utilization

        try:
            maximum = max(result.values())
        except ValueError as v:
            return [[]]
        return [list(key) for key, value in result.items() if value == maximum]


solution = Solution()
print(solution.optimalUtilization(7, [[1, 2], [2, 4], [3, 6]], [[1, 2]]))
print(solution.optimalUtilization(10, [[1, 3], [2, 5], [3, 7], [4, 10]], [[1, 2], [2, 3], [3, 4], [4, 5]]))
print(solution.optimalUtilization(16, [[2, 7], [3, 14]], [[2, 10], [3, 14]]))
