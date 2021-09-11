import heapq


class Solution:
    def minimumTime(numOfParts, parts):
        heap = []
        for item in parts:
            heapq.heappush(heap, item)
        result = 0
        while len(heap) > 1:
            first = heapq.heappop(heap)
            second = heapq.heappop(heap)
            total = first + second
            result += total
            heapq.heappush(heap, total)

        return result

solution = Solution()
print(solution.minimumTime(4, [8, 4, 6, 12]))

