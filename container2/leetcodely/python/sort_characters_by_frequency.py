"""Created by sgoswami on 8/6/17."""
"""Given a string, sort it in decreasing order based on the frequency of characters.
Input:
"tree"

Output:
"eert"

Explanation:
'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer."""
import collections


class Solution(object):
    def frequencySort(self, s):
        """
        :type s: str
        :rtype: str
        """
        freq_map = collections.Counter(s)
        reverse_map = {}
        for k, v in freq_map.items():
            reverse_map.setdefault(v, []).append(k)
        ordered = collections.OrderedDict(sorted(reverse_map.items(), reverse=True))
        res = ''
        for k, v in ordered.items():
            for item in v:
                res += self.get_k_occurences(item, k)

        return res

    def get_k_occurences(self, c, k):
        return ''.join([c for _ in range(k)])

if __name__ == '__main__':
    solution = Solution()
    print(solution.frequencySort('Aabb'))

