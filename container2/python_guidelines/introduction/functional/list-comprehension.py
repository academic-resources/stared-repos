#### Example 1

# We'll make something equivalent to the following
# squares = []
# for x in range(10):
#    squares.append(x**2)

# squares = list(map(lambda x: x**2, range(10)))

squares = [x**2 for x in range(10)]

print(squares)

#### Example 2

comprehension = [(x,y) for x in [1,2,3] for y in [3,1,4] if x != y]
print(comprehension)


#### Example 3 - Nested List Comprehension

matrix = [
        [1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        ]

nested_comprehension = [[row[i] for row in matrix] for i in range(4)]
print(nested_comprehension)
