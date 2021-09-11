# assume positive integers as n
# 0! = 1
# Return a numerical value

def iter_factorial(n):
    result = 1
    # loop until 1
    while n > 1:
        # multiply
        result *= n
        n -= 1
    
    return result

n = 4
print('Result when n is', n, 'is: ', iter_factorial(n))


def rec_factorial(n):
    # base case, n=1
    if n == 1 or n == 0:
        return 1

    # recursive cases, when n>1
    else:
        return n * rec_factorial(n-1)

print('Result when recursive n is', n, 'is: ', rec_factorial(n))

def iter_fib(n):
    if n == 0:
        return 0
    
    if n == 1:
        return 1
    
    return iter_fib(n-1) + iter_fib(n-2)

print('Result when iter_fib n is', n, 'is: ', iter_fib(n))

# def rec_fib(n):