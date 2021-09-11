input_file = raw_input("Enter file name: ")
file_handler = open(input_file)
my_list = list()

for line in file_handler:
    words = line.rstrip()
    words = line.split()
    for word in words:
        if words is not my_list:
            my_list.append(word)
    my_list.sort()

print my_list
