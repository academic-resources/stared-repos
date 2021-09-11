# Example 1: Zip different lengths
list_a = [1,2,3]
list_b = ['a', 'b', 'c', 'd']
zipped_list = zip(list_a, list_b)
print(list(zipped_list)) # [(1,'a'), (2,'b'), (3,'c')]


# Example 2: Unzip
x = [1,2,3]
y = [4,5,6]

zipped = zip(x,y)
print(list(zipped)) #[(1,4), (2,5), (3,6)]

x2, y2 = zip(*zip(x,y))
print(x == list(x2) and y == list(y2)) # True
