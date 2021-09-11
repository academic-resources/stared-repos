import functools

# Example 2le 1

l = [1,3,5,6,2]

print("The sum of the list element is: ", end="")
print(functools.reduce(lambda a, b: a + b, l))

# Example 2

print("The max element of the list is: ", end="")
print(functools.reduce(lambda a, b: a if a > b else b, l))
