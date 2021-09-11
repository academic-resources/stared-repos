# This first line is provided for you

hours = raw_input("Enter Hours: ")
rate = raw_input("Enter Rate: ")

try:
	hours = float(hours)
	rate = float(rate)
except:
	hours = -1
	rate = -1
if (hours > 0 and rate > 0):
	gross_pay = rate * hours
	print gross_pay
else:
	print "You did not enter numbers!"

