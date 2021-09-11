
my_string = raw_input('Enter a number: ')

try:
	ivalue = int(my_string)
except:
	ivalue = -1

if ivalue > 0:
	print 'Nice work'
else:
	print 'Not a number'