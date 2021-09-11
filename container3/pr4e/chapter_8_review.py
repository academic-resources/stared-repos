# greet = 'Hello Bob'
# print len(greet)

# The range function creates a list
print range(4)

friends = ['juan', 'sally', 'harry']

print len(friends)

print range(len(friends))


for friend in friends:
    print 'Happy new year ', friend


for i in range(len(friends)):
    friend = friends[i]
    print 'Happy new year ', friend


t = [9, 41, 12, 3, 74, 15]

print t

print t[1:3]

print t[:4]

print t[3:]

print t[:]


#total = 0
#count = 0

#while True:
#    inp = raw_input('Input a number: ')
#    if inp == 'done': break
#    value = float(inp)
#    total = total + value
#    count = count + 1

#average = total / count
#print 'Average is: ', average


#numlist = list()

#while True:
#    inp = raw_input('Enter a number: ')
#    if inp == 'done': break
#    value = float(inp)
#    numlist.append(value)

#average = sum(numlist) / len(numlist)
#print 'Average is: ', average

#abc = 'With three words'
#stuff = abc.split()


inp = raw_input('Enter file: ')
file_handler = open(inp)

for line in file_handler:
    line = line.rstrip()
    if not line.startswith('From '): continue
    words = line.split()
    print words[2]



