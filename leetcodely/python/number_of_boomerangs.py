class Solution(object):
    def numberOfBoomerangs(self, points):
        """
        :type points: List[List[int]]
        :rtype: int
        """
        dist_map = {}
        for i in range(len(points)):
            a = points[i]
            for j in range(len(points)):
                if i != j:
                    b = points[j]
                    d = self.distance(a, b)
                    if d in dist_map:
                        dist_map[d] += 1
                    else:
                        dist_map[d] = 0

        ans = 0
        for k, v in dist_map.items():
            ans += v
        return ans

    def distance(self, a, b):
        return (b[0] - a[0]) ^ 2 + (b[1] - a[1]) ^ 2


if __name__ == '__main__':
    solution = Solution()
    print(solution.numberOfBoomerangs([[0,0],[1,0],[2,0]]))