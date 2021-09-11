input_file = raw_input('Enter file name: ')
file_handler = open(input_file)

counts = dict()
for line in file_handler:
    words = line.split()
    for word in words:
        wrd = word.lower()
        counts[wrd] = counts.get(wrd, 0) + 1

#print counts.items()

flip = list()
for k, v in counts.items():
    #print k, v
    new_tuple = (v, k)
    #print new_tuple
    flip.append(new_tuple)
#print flip

flip.sort(reverse=True)

print flip[:5]

for k, v in flip[:5]:
    print 'Winner', k, v

