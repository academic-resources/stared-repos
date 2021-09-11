class A:
    def whoami(self):
        print('A')

class B:
    def whoami(self):
        print('B')

class C(A, B):
    pass

c = C()
c.whoami()
print(C.mro())
