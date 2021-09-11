import math

def foo(n):
    sq_root = int(math.sqrt(n))
    count = []
    for i in range(0, sq_root):
        count.append(i)
    return count

# For a given number n, what is the maximum number of time the loop runs?
# For a given number n, how many time units is it going to take to process?

print('n' + '\t' + 'sqrt(n)')
print('1' + '\t' + f'{len(foo(1))}')
print('2' + '\t' + f'{len(foo(2))}')
print('3' + '\t' + f'{len(foo(3))}')
print('4' + '\t' + f'{len(foo(4))}')
print('5' + '\t' + f'{len(foo(5))}')
print('6' + '\t' + f'{len(foo(6))}')
print('7' + '\t' + f'{len(foo(7))}')
print('8' + '\t' + f'{len(foo(8))}')
print('9' + '\t' + f'{len(foo(9))}')
print('10' + '\t' + f'{len(foo(10))}')
print('11' + '\t' + f'{len(foo(11))}')
print('12' + '\t' + f'{len(foo(12))}')

# ---------------------------------------------

def bar(n):
    s = 0

    for i in range(n):
        for j in range(n):
            s += i * j

    return s

def bar_expanded(n):
    s = 0
    i_count = []
    j_count = []

    for i in range(n):
        i_count.append(i)
        for j in range(n):
            j_count.append(j)
            s += i * j

    return f's: {s}, i count: {len(i_count)}, j count: {len(j_count)}'

print(bar(5))
print(bar_expanded(5))

# ---------------------------------------------

def baz(n):
    s = 0

    for i in range(n):
        for j in range(int(math.sqrt(n))):
            s += i * j

    return s

def baz_expanded(n):
    s = 0
    i_count = []
    j_count = []

    for i in range(n):
        i_count.append(i)
        for j in range(int(math.sqrt(n))):
            j_count.append(j)
            s += i * j

    return f's: {s}, i count: {len(i_count)}, j count: {len(j_count)}'

print(baz(25))
print(int(math.sqrt(25)))
print(baz_expanded(25))

# ---------------------------------------------

def frotz(n):
    s = 0

    for i in range(n):
        for j in range(2*n):
            s += i * j

    return s

def frotz_expanded(n):
    s = 0
    i_count = []
    j_count = []

    for i in range(n):
        i_count.append(i)
        for j in range(2*n):
            j_count.append(j)
            s += i * j

    return f's: {s}, i count: {len(i_count)}, j count: {len(j_count)}'

print(frotz(5))
print(frotz_expanded(5))

# ---------------------------------------------

def booley(x):
    sum = 0
    for i in range(0, 1463):
        i += sum
        for j in range(0,x):
            for k in range(x, x+15):
                sum +=1

# ---------------------------------------------

def bogey(array):

    print(array[1])
    midpoint = len(array) // 2
    
    for i in range(0, midpoint):
        print(array[i])

    for _ in range(1000):
        print('hi')


# len(array) // 2 is integer division that says the length of the array divided by two


