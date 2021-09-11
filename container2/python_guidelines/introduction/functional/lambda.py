# Example 1

#### Consider the following example
def func(a): return a+1

print(func(1)) #2

#### Can be also defined as
anonFunc = lambda a: a+1
print(anonFunc(1)) #2


# Example 2

def make_incrementor(n):
    return lambda x: x + n

f = make_incrementor(42)
print(f(1)) #43
