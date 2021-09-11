# Use the file name mbox-short.txt as the file name
fname = raw_input("Enter file name: ")
fh = open(fname)
count = 0
for line in fh:
    if not line.startswith("X-DSPAM-Confidence:") : continue
    atpos =  line.find('0')
    extract = line[atpos:]
    extract = type(float)
    count = count + 1
    print line
print "Done"




read
open
gets 
