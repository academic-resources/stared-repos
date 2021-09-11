# fib(0) = 0
# fib(1) = 1
# fib(n) = fib(n-1) + fib(n-2)

# Brute force solution with poor run time:

# def fib(n):
#     if n == 0:
#         return 0
    
#     if n == 1:
#         return 1
    
#     return fib(n-1) + fib(n-2)

# for i in range(10):
#     print(fib(i))


# Memoization (top down) solution
# O(n) time complexity, O(n) space complexity

# cache = {}

# def fib_memo(n):

#     if n not in cache:
#         cache[n] = fib_memo(n-1) + fib_memo(n-2)

#     return cache[n]

# cache[0] = 0
# cache[1] = 1

# for i in range(50):
#     print(fib_memo(i))

# print(cache)

# Iterative (bottom up) solution
# O(n) time complexity, O(1) space complexity

def fib_iter(n):

    if n == 0:
        return 0

    if n == 1:
        return 1

    p0 = 0
    p1 = 1

    for i in range(n-1):
        next_val = p0 + p1

        p0 = p1
        p1 = next_val

    return next_val

for i in range(10):
    print(f'{i}: {fib_iter(i)}')


