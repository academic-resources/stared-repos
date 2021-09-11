# Exercise 9.2 Dictionaries and files
import string
import pprint
fname = raw_input('Enter file name: ')
try:
    fh = open(fname)
except:
    print 'File cannot be opened', fname
    exit()

counts = dict()
for line in fh:
    line = line.translate(None, string.punctuation)
    line = line.lower()
    words = line.split()
    for word in words:
        if word not in counts:
            counts[word] = 1
        else:
            counts[word] += 1

pprint.pprint(counts)
