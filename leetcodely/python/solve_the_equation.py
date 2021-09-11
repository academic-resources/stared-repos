"""Created by sgoswami on 8/6/17."""
"""Solve a given equation and return the value of x in the form of string "x=#value". 
The equation contains only '+', '-' operation, the variable x and its coefficient.
If there is no solution for the equation, return "No solution".
If there are infinite solutions for the equation, return "Infinite solutions".
If there is exactly one solution for the equation, we ensure that the value of x is an integer."""


class Solution(object):
    def solveEquation(self, equation):
        """
        :type equation: str
        :rtype: str
        """
        def evaluate(expr):
            coeff, const = 0, 0
            groups = expr.split('+')
            for group in groups:
                terms = group.split('-') if '-' in group else [group]
                negate = 1
                for term in terms:
                    if term:
                        if term[-1] == 'x':
                            coeff += negate * (int(term[:-1]) if term[:-1] else 1)
                        else:
                            const += negate * int(term)
                    negate = -1
            return coeff, const
        left, right = equation.split('=')
        coeff_left, const_left = evaluate(left)
        coeff_right, const_right = evaluate(right)

        if coeff_left == coeff_right:
            return "Infinite Solutions" if const_left == const_right else "No Solutions"
        return 'x=' + str((const_right - const_left)// (coeff_right - coeff_left))



