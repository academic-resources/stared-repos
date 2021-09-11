"""We are given an array asteroids of integers representing asteroids in a row.
For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right,
negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode.
If both are the same size, both will explode. Two asteroids moving in the same direction will never meet."""


class Solution:
    def asteroidCollision(self, asteroids):
        """
        :type asteroids: List[int]
        :rtype: List[int]
        """
        stack = []
        for asteroid in asteroids:
            if len(stack) == 0 or asteroid > 0:
                stack.append(asteroid)
            elif asteroid < 0:
                while len(stack) > 0 and stack[-1] > 0:
                    if stack[-1] == abs(asteroid):
                        stack.pop()
                        break
                    elif stack[-1] < abs(asteroid):
                        stack.pop()
                    elif stack[-1] > abs(asteroid):
                        break
                else:
                    stack.append(asteroid)

        return stack


if __name__ == '__main__':
    solution = Solution()
    print(solution.asteroidCollision([-2, -1, 1, 2]))
