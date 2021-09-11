"""Created by sgoswami on 10/8/17."""
"""You're now a baseball game point recorder.

Given a list of strings, each string can be one of the 4 following ds:

Integer (one round's score): Directly represents the number of points you get in this round.
"+" (one round's score): Represents that the points you get in this round are the sum of the last two valid round's 
points.
"D" (one round's score): Represents that the points you get in this round are the doubled data of the last valid 
round's points.
"C" (an operation, which isn't a round's score): Represents the last valid round's points you get were invalid and 
should be removed.
Each round's operation is permanent and could have an impact on the round before and the round after.

You need to return the sum of the points you could get in all the rounds."""


class Solution(object):
    def calPoints(self, ops):
        """
        :type ops: List[str]
        :rtype: int
        """
        stack = []
        for item in ops:
            if item == '+':
                stack.append(stack[-1] + stack[-2])
            elif item == 'D':
                stack.append(stack[-1] * 2)
            elif item == 'C':
                stack.pop()
            else:
                stack.append(int(item))
        return sum(stack)


if __name__ == '__main__':
    solution = Solution()
    print(solution.calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"]))
