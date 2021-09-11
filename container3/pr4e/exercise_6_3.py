
def count(word, letter):
    count = 0
    for char in word:
        if char == letter:
            count = count + 1
    print count
    print 'program complete'



inp_word = raw_input('Please enter a word: ')
inp_letter = raw_input('Please enter a letter: ')


count(inp_word, inp_letter)


# This program works! :D
