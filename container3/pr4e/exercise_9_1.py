# Exercise 9.1

input_file = raw_input('Enter file name: ')
file_handler = open(input_file)

text = file_handler.read()
print len(text)
words = text.split()
print len(words)

cow = dict()
for word in words:
    if word in cow:
        cow[word] = cow.get(word, 0) + 1
    else:
        cow[word] = 1
    
print cow.items()

max_value = None
max_word = None
for key, value in cow.items():
    if max_value == None: max_value = value
    if max_value < value:
        max_value = value
        max_key = key
    print key, value
    
print max_value
