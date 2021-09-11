# Largest and Smallest value

smallest = None # This is type in itself
print 'Before'
array = [9, 41, 12, 3, 74, 15]

for value in array:
    if smallest is None:
        smallest = value
    elif value < smallest:
        smallest = value
    print smallest, value

print 'After', smallest
