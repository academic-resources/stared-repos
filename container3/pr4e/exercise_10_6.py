#10.6
import string
file_handler = open('romeo-full.txt')
counts = dict()

for line in file_handler:
    line = line.translate(None, string.punctuation)
    line = line.lower()
    words = line.split()
    for word in words:
        if word not in counts:
            counts[word] = 1
        else:
            counts[word] += 1
#sort the dictionary by value
lst = list()
for key, val in counts.items():
    lst.append( (val, key) )
lst.sort(reverse=True)

for key, val in lst[:10]:
    print key, val
