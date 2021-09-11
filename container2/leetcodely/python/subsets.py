"""Given a set of distinct integers, nums, return all possible subsets (the power set)."""


class Solution(object):
    def subsets(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        prev = result = [[]]

        for num in nums:
            for p in prev:
                p.append(num)
            prev.append([num])
            result.append(prev)
        return result


if __name__ == '__main__':
    solution = Solution()
    print(solution.subsets([1, 2, 3]))
