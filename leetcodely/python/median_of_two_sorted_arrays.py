"""Created by sgoswami on 3/23/17 as part of leetcode"""

"""There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays.
 The overall run time complexity should be O(log (m+n))."""
import sys


class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        shorter, longer = (nums1, nums2) if len(nums1) < len(nums2) else (nums2, nums1)

        x, y = len(shorter), len(longer)
        low, high = 0, x
        while low <= high:
            partition_x = (low + high) // 2
            partition_y = (x + y + 1) // 2 - partition_x

            max_left_x = -sys.maxsize if partition_x == 0 else shorter[partition_x - 1]
            min_right_x = sys.maxsize if partition_y == 0 else shorter[partition_x]

            max_left_y = -sys.maxsize if partition_y == 0 else longer[partition_y - 1]
            min_right_y = sys.maxsize if partition_y == 0 else longer[partition_y]

            if max_left_x <= min_right_y and max_left_y <= min_right_x:
                if (x + y) % 2 == 0:
                    return (max(max_left_x, max_left_y) + min(min_right_x, min_right_y)) / 2
                else:
                    return max(max_left_x, max_left_y)
            elif max_left_x > min_right_y:
                high = partition_x + 1
            else:
                low = partition_x - 1
        raise ValueError("Input arrays were not sorted.")


if __name__ == '__main__':
    arr1 = [1, 3]
    arr2 = [2]
    solution = Solution()
    print(solution.findMedianSortedArrays(arr1, arr2))
