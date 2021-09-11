import heapq


class MaxStack:

    def __init__(self):
        self.stack = []

    def push(self, x: int) -> None:
        self.stack.append(x)

    def pop(self) -> int:
        return self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def peekMax(self) -> int:
        return max(self.stack)

    def popMax(self) -> int:
        max_item = self.peekMax()
        i = len(self.stack) - 1
        while self.stack[i] != max_item:
            i -= 1
        del(self.stack[i])
        return max_item


stack = MaxStack()
stack.push(5)
stack.push(1)
stack.push(5)
print(stack.top())
print(stack.popMax())
print(stack.top())
