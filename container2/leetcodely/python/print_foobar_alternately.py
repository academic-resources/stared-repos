import threading


class FooBar:
    def __init__(self, n):
        self.n = n
        self.trigger = 0
        self.lock = threading.Lock()
        self.foo_not_printed = threading.Condition(lock=self.lock)
        self.bar_not_printed = threading.Condition(lock=self.lock)

    def foo(self, printFoo: 'Callable[[], None]') -> None:

        for i in range(self.n):
            # printFoo() outputs "foo". Do not change or remove this line.
            self.lock.acquire()
            while self.trigger != 0:
                self.bar_not_printed.wait()
            printFoo()
            self.trigger = 1
            self.foo_not_printed.notify_all()
            self.lock.release()

    def bar(self, printBar: 'Callable[[], None]') -> None:

        for i in range(self.n):
            # printBar() outputs "bar". Do not change or remove this line.
            self.lock.acquire()
            while self.trigger != 1:
                self.foo_not_printed.wait()
            printBar()
            self.trigger = 0
            self.bar_not_printed.notify_all()
            self.lock.release()