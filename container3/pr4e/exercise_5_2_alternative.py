largest = None
smallest = None
while True:
        num = raw_input("Enter a number: ")
        try:
            # Handle the edge cases
            if num == "done" or num == "Done":
                break
            num = int(num)
            if num > largest:
                largest = num
            elif num < largest:
                smallest = num
            else:
                print "Invalid input"

        except:
            print "Invalid input"


print "Maximum is",largest
print "Minimum is",smallest
