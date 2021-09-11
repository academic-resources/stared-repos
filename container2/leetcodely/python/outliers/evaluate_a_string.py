"""Given a mathematical expression in the form of a string evaluate it maintaining the natural order of precedence of
the operators."""
"""This solution uses the shunting-yard algorithm approach and is suitable when the number of operands are minimal."""

import re


class Solution:
    def evalExpression(self, s):
        operator_stack, operand_stack = [], []
        tokens = [i for i in re.split(r'(\d+|\W+)', s) if i]
        for token in tokens:
            if token.isdigit():
                operand_stack.append(int(token))
            else:
                while len(operator_stack) > 0 and self.has_higher_precedence(operator_stack[-1], token):
                    val = self.evaluate(operand_stack.pop(), operator_stack.pop(), operand_stack.pop())
                    operand_stack.append(val)
                operator_stack.append(token)
        while len(operator_stack) > 0:
            val = self.evaluate(operand_stack.pop(), operator_stack.pop(), operand_stack.pop())
            operand_stack.append(val)
        return operand_stack[-1]

    def has_higher_precedence(self, opr1, opr2):
        if opr1 == '/' or opr1 == '*' and opr2 == '+' or opr2 == '-':
            return True
        return False

    def evaluate(self, a, b, c):
        if b == '/':
            return c/a
        elif b == '*':
            return c*a
        elif b == '-':
            return c-a
        else:
            return c+a


if __name__ == '__main__':
    solution = Solution()
    print(solution.evalExpression('3+3-6*2'))
