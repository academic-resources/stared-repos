input_file = raw_input('Enter file name: ')
file_handler = open(input_file)

counts = dict()
for line in file_handler:
    words = line.split()
    for word in words:
        word = word.lower()
        counts[word] = counts.get(word, 0) + 1

#print counts.items()

flipped = list()
for k, v in counts.items():
    #print k, v
    new_tuple = (v, k)
    #print new_tuple
    flipped.append(new_tuple)

#print flipped
flipped.sort(reverse=True)

print flipped[:5]

for k, v in flipped[:5]: #Only go thru the first five items
    print k, v
    
