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
    if not line.startswith('From '): continue
    words = line.split()
    #print words
    word = words[5] # Pick the time from the list
    word = word[:2] # Slice and keep the hours only
    counts[word] = counts.get(word, 0) + 1 # Add entry to dictionary


a_list = counts.items() # Grab the items from dictionary and make a list

a_list.sort() # Sort the list
#print a_list 


for hour, freq in a_list: # Use for loop to iterate through the sorted list
    print hour, freq

# IT WORKSSSS!:)





#my_list = counts.items()
#print my_list

#for hour, freq in my_list:
#    print hour, freq

#flipped.sort(reverse=True)
#print flipped

#for k, v in flipped:
#    print k, v
