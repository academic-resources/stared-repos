while True:
    age = raw_input("Please enter your age: ")
    try:
        if age == "done" or age == "Done":
            print "Ok, bye!"
            break
        age = int(age)
        if age >= 18:
            print "You can vote! Hoorray!"
            break
        elif age <= 0:
            print "Please enter a valid age"            
        else:
            print "Sorry, we need you to be at least 18"
        
    except:
        print "Sorry, I didn't get that."
        continue

print "Program complete"

    
