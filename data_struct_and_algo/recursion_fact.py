def fact_recursive(n):
    if n == 1:
        return 1
    else:
        return fact_recursive(n - 1) * n


print(fact_recursive(5))


def fact_iterative(n):
    temp = 1
    sum = 1
    for i in range(1, n):
        sum *= i * temp
    return sum


print(fact_iterative(5))
