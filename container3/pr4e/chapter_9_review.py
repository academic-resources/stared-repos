# Dictionaries
# A bag of values, each with its own label, they must have lable (key(label) values)
# Also known as Associative Array

#purse = dict()

#purse['money'] = 12
#purse['candy'] =  3
#purse['tissues'] = 75

#print purse

#print purse['candy']

#purse['candy'] += 2



#counts = dict()

#names = ['john', 'larry', 'mark', 'tony', 'mark']
#for name in names:
#    if name not in counts:
#        counts[name] = 1
#        print counts
#    else:
#        counts[name] = counts[name] + 1
#print counts
#print name

#counts = dict()
#line = raw_input('Enter text: ')

#words = line.split() #produces a list
#print 'Words', words

#print 'Counting..'
#for word in words:
#    counts[word] = counts.get(word, 0) + 1
#print 'Counts', counts


#for key in counts:
#    print key, counts[key]

name = raw_input('Enter file name: ')
f_handle = open(name, 'r')
text = f_handle.read()
words = text.split()

counts = dict()
for word in words:
    counts[word] = counts.get(word, 0) + 1

bigCount = None
bigWord = None

for word,count in counts.items():
    if bigCount is None or count > bigCount:
        bigWord = word
        bigCount = count

print 'the most repeated word is: ',bigWord,'It repeats: ', bigCount, 'times.'




fhand = open('romeo.txt')
counts = dict()
for line in fhand:
    words = line.split()
    for word in words:
        counts[word] = counts.get(word, 0) + 1

lst = list()
for key, val in counts.items():
    lst.append( (val, key) ) #we're making a new list
lst.sort(reverse=True)

for val, key in lst[:10]:
    print key, val
