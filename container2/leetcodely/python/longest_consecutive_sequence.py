"""Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
Your algorithm should run in O(n) complexity."""


class Solution:
    def longestConsecutive(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        visited = set()
        for num in nums:
            visited.add(num)

        max_len = 0
        for num in nums:
            if num - 1 not in visited:
                curr = 0
                item = num
                while item in visited:
                    curr += 1
                    item += 1
                max_len = max(max_len, curr)
        return max_len


if __name__ == '__main__':
    solution = Solution()
    print(solution.longestConsecutive([100, 4, 200, 1, 3, 2]))
