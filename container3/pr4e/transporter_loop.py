# Transporter Loop

while True:
    command = raw_input("Please say command: ")
    if command == "energize":
        print "Transport complete"
        break

    elif command == "abort":
        print "Aborting transport"
        break

    else:
        print "Did not understand command.. Quiting"
        break

print "Program Complete"

