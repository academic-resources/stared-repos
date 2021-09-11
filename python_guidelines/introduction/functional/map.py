myList = [1,2,3,4,5,6,7,8]
myOtherList = [9,10,11,12,13,14,15,16,17] # Notice it has one more element

# Example 1

def pow_two(x):
    return x**2

myMap = map(pow_two, myList)

print(list(myMap))

# Example 2

myLambdaMap = map(lambda x: x + x, myList)

print(list(myLambdaMap))

# Example 3

myJointMap = map(lambda x, y: x + y, myList, myOtherList)

print(list(myJointMap))

# Example 4

l = ['sat', 'bat', 'cat', 'mat']

def listifyStrings(arr):
    return list(map(list, arr))

print (listifyStrings(l))
