# Chapter 11 Regular Expressions

##hand = open('mbox-short.txt')
##for line in hand:
##    line = line.rstrip()
##    if line.find('From:') >= 0:
##        print line


import re # Using regular expressions

##hand = open('mbox-short.txt')
##for line in hand:
##    line = line.rstrip()
##    if re.search('^From:',line):
##        print line


##x = 'My 2 favorite numbers are 19 and 42'
##y = re.findall('[0-9]+', x)
##print y
##
##y = re.findall('[aeiou]+', x)
##
##print y


hand = open('mbox-short.txt')
for line in hand:
    if re.findall('^From .*@([^ ]*)', line):
        print line
