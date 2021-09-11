import threading


class Stack:
    def __init__(self, capacity):
        self.stack = []
        self.capacity = capacity
        self.lock = threading.Lock()
        self.buffer_not_full = threading.Condition(self.lock)
        self.buffer_not_empty = threading.Condition(self.lock)

    def push(self, item):
        with self.lock:
            while len(self.stack) == self.capacity:
                self.buffer_not_full.wait()
            self.stack.append(item)
            self.buffer_not_empty.notify_all()

    def pop(self):
        with self.lock:
            while len(self.stack) == 0:
                self.buffer_not_empty.wait()
            item = self.stack.pop()
            self.buffer_not_full.notify_all()
            return item




