# Use words.txt as the file name
fname = raw_input("Enter file name: ")
fh = open('words.txt')
for line in fh:
    line = line.rstrip()
    line = line.upper()
    print line
