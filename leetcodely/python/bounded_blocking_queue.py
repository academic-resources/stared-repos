from collections import deque
import threading


class BoundedBlockingQueue(object):

    def __init__(self, capacity: int):
        self.queue = deque()
        self.capacity = capacity
        self.lock = threading.Lock()
        self.buffer_not_full = threading.Condition(lock=self.lock)
        self.buffer_not_empty = threading.Condition(lock=self.lock)

    def enqueue(self, element: int) -> None:
        with self.lock:
            while len(self.queue) == self.capacity:
                self.buffer_not_full.wait()
            self.queue.append(element)
            self.buffer_not_empty.notify_all()

    def dequeue(self) -> int:
        with self.lock:
            while len(self.queue) == 0:
                self.buffer_not_empty.wait()
            item = self.queue.popleft()
            self.buffer_not_full.notify_all()
            return item

    def size(self) -> int:
        return len(self.queue)