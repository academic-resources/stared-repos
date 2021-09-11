"""Given a time represented in the format "HH:MM", form the next closest time by reusing the current digits.
There is no limit on how many times a digit can be reused.

You may assume the given input string is always valid. For example, "01:34", "12:09" are all valid. "1:34", "12:9"
 are all invalid."""


class Solution:
    def nextClosestTime(self, time):
        """
        :type time: str
        :rtype: str
        """
        nums = {time[0], time[1], time[3], time[4]}
        times = set()
        for n1 in nums:
            for n2 in nums:
                for n3 in nums:
                    for n4 in nums:
                        if int(n1) * 10 + int(n2) < 24 and int(n3) * 10 + int(n4) < 60:
                            times.add(n1 + n2 + ':' + n3 + n4)
        times = sorted(list(times))
        return times[(times.index(time) + 1) % len(times)]


if __name__ == '__main__':
    solution = Solution()
    print(solution.nextClosestTime('19:34'))
