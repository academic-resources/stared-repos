while True:
    line = raw_input('> ')
    if line[0] == '#':
        continue
    if line == 'done':
        break
    print line
print 'Done!'


count = 0
for iteration_var in [3, 5, 7, 9, 11, 13]:
    count = count + 1
    print 'There are', count, 'numbers inside the given list'
print 'final count:', count
