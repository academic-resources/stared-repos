# Finding the Average in a Loop

count = 0
sum = 0
array = [9, 41, 12, 3, 74, 15]

print 'Before', count, sum

for value in array:
    count = count + 1
    sum = sum + value

    print count, sum, value

print 'After', count, sum, sum/count , 'Keep in mind this is a truncating division'
