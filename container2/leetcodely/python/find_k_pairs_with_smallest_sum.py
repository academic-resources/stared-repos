def kSmallestPairs(self, nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
    all_pairs = [[i, j] for i in nums1 for j in nums2]
    all_pairs = sorted(all_pairs, key=lambda x : x[0] + x[1])
    return all_pairs[:k]

# TODO: Incomplete


