# Search using a Boolean Variable

found = False
print 'Before', found
array = [9, 41, 12, 3, 74, 15]

for value in array:
    if value == 3:
        found = True
        break
    print found, value

print 'After', found
