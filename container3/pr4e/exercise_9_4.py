# Exercise 9.4

name = raw_input("Enter file: ")
if len(name) < 1 : name = "mbox-short.txt"
handle = open(name)

senders = dict()
counts = 0

for line in handle:
    line.rstrip()
    if not line.startswith('From '):
        continue
    words = line.split()
    person = words[1]
    senders[person] = senders.get(person, 0) + 1
    #print senders

    bigword = None
    bigcount = None
    myWord = None
    myCount = None

    for myWord,myCount in senders.items():
        if bigword is None or myCount > bigcount:
            bigword = myWord
            bigcount = myCount
print bigword
print bigcount
    

    
    #for line in words:
#        if line not in counts:
#            counts[line] = 1
#        else:
#            counts[line] += 1
#m    print counts
