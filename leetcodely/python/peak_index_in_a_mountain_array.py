"""Let's call an array A a mountain if the following properties hold:

A.length >= 3
There exists some 0 < i < A.length - 1 such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]
Given an array that is definitely a mountain, return any i such that
 A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1].

Example 1:
Input: [0,1,0]
Output: 1

Example 2:
Input: [0,2,1,0]
Output: 1
"""


class Solution(object):
    def peakIndexInMountainArray(self, A):
        """
        :type A: List[int]
        :rtype: int
        """
        low, high = 0, len(A) - 1
        while low <= high:
            mid = low + (high - low) // 2
            if A[mid - 1] < A[mid] < A[mid + 1]:
                low = mid + 1
            elif A[mid - 1] > A[mid] > A[mid + 1]:
                high = mid - 1
            else:
                return mid
        return -1


if __name__ == '__main__':
    solution = Solution()
    print(solution.peakIndexInMountainArray([3, 4, 5, 1]))
