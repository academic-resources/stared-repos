# 10.2 Autograder assignment

name = raw_input("Enter file: ")
if len(name) < 1 : name = "mbox-short.txt"
try:
    handle = open(name)
except:
    print 'File cannot be opened.', name
    exit()

counts = dict()
for line in handle:
    words = line.split()
    for word in words:
        #word = word.lower()
        counts[word] = counts.get(word, 0) + 1



my_list = counts.items()




flipped = list()

for key, val in my_list:
    new_tuple = (val, key)
    flipped.append(new_tuple)

#print flipped

flipped.sort(reverse=True)

#print flipped[:5]mb

for key, val in flipped[:10]:
    print "Winner", key, val

