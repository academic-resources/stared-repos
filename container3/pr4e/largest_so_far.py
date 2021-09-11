# Finding the largest value

largest = -1
array = [9, 41, 12, 3, 74, 15]
print 'Before running the largest number is: ', largest

for number in array:
    if number > largest:
        largest = number
        print 'The largest number so far is: ', largest

print 'After running the largest number is: ',  largest
print 'If you are curious, the original array had these numbers: ', array
