from collections import Counter


def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
    dic = Counter(nums1)
    res = []
    for num in nums2:
        if num in dic and dic[num] > 0:
            res.append(num)
            dic[num] -= 1
    return res
