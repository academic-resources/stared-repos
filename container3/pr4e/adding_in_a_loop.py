# Adding in a loop

zork = 0
array = [9, 41, 12, 3, 74, 15]

print 'Before zork is: ', zork
for thing in array:
    zork = zork + thing
    print zork, thing

print 'After zork is: ', zork
