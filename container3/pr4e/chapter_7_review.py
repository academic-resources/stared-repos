#file_handler = open('mbox-short.txt')
#count = 0

#for line in file_handler:
#    count = count + 1

#print 'Line count is: ', count



#inp = file_handler.read()
#print len(inp)

#print inp[:20] #slicing

#for line in file_handler:
#    line = line.rstrip()
#    # Skip lines that don't interest us
#    #if line.startswith('From:'):
#    if not line.startswith('From:'):
#        continue
#    print line

#

#for line in file_handler:
#    line = line.rstrip()
#    if not '@uct.ac.za' in line:
#        continue
#    print line

input_file = raw_input('Enter file name: ')
try:
    file_handler = open(input_file)
except:
    print 'File cannot be opened: ', input_file
    exit()

count = 0

for line in file_handler:
    if line.startswith('Subject:'):
        count = count + 1
print 'There were', count, 'subject lines in', input_file
