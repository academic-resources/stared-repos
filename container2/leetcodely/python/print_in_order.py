import threading


class Foo:
    def __init__(self):
        self.lock = threading.Lock()
        self.first_completed = threading.Condition(lock=self.lock)
        self.second_completed = threading.Condition(lock=self.lock)
        self.counter = 0

    def first(self, printFirst: 'Callable[[], None]') -> None:
        with self.lock:
            printFirst()
            self.counter += 1
            self.first_completed.notify_all()

    def second(self, printSecond: 'Callable[[], None]') -> None:
        with self.lock:
            while self.counter != 1:
                self.first_completed.wait()
            printSecond()
            self.counter += 1
            self.second_completed.notify_all()

    def third(self, printThird: 'Callable[[], None]') -> None:
        with self.lock:
            while self.counter != 2:
                self.second_completed.wait()
            printThird()
