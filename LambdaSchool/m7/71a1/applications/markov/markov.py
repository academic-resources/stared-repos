import random

# Read in all the words in one go
# Read the file input.txt and split it into words.
with open("E:\\projects\\LambdaSchool\\m7\\71a1\\applications\\markov\\input.txt") as f:
    words = f.read()
words = words.replace(chr(ord('\n')), ' ')
word_array = words.split(" ")
# get set of words
word_set = set(word_array)
# print('set = ' + str(word_set))
# Don't worry about changing punctuation or capitalization. For example, a "word" might be "Hello, . Just leave it all in there.
print('----------------')
# make dictionary
word_dictionary = {}
start_words = []
stop_words = []
for word in word_set:
    word_dictionary[word] = ""
# go through list of words again & add 'following_words" to dictionary from input
# leave duplicates in for this part. If a the word and is seen following the word goats multiple times, include all those ands. It'll give more convincing results because it is modelling the frequency of how often a word follows another word.
# Analyze the text, building up the dataset of which words can follow particular words.
for x in range(0, len(word_array)):
        if x + 1 >= len(word_array):
            word_dictionary[word] = ""
        else:
            word = word_array[x]
            word_dictionary[word] = word_dictionary[word] + " " + word_array[x + 1]
del word_dictionary['']

# Start words are words that begin with a capital, or a " followed by a capital.
# Stop words are words that end in any of the punctuation .?!, or that punctuation followed by a ".
for x in range(0, len(word_array)):
    if word_array[x].startswith('"') and word_array[x][1].isupper() or word_array[x].istitle():
        start_words.append(word_array[x])
    elif word_array[x].endswith(".") or word_array[x].endswith('?') or word_array[x].endswith('!') or word_array[x].endswith('"') and word_array[x][len(word_array[x])-2] == '.' or word_array[x].endswith('"') and word_array[x][len(word_array[x])-2] == '!' or word_array[x].endswith('"') and word_array[x][len(word_array[x])-2] == '?':
        stop_words.append(word_array[x])
# start with a start word
# Choose a random "start word" to begin.
next_word = ""
start_word = random.choice(start_words)
current_sentence = start_word
while next_word not in stop_words:
    # then chain words until you reach a stop word
    word_selection = word_dictionary[start_word]
    current_word_selection_array = word_selection.split(" ")
    next_word = random.choice(current_word_selection_array)
    # stop if it's a stop word
    current_sentence = current_sentence + " " + next_word
    if next_word in stop_words:
        break
# print string
print(current_sentence)






# Loop through:
    # Print the word.
    # If it's a "stop word", stop.
    # Else randomly choose a word that can follow this one.
    # Start words are words that begin with a capital, or a " followed by a capital.
    # Stop words are words that end in any of the punctuation .?!, or that punctuation followed by a ".

# Hints:
# random.choice() can choose a random word out of a list.
# print(s, end=" ") will print a space after every word instead of a newline.

# TODO: analyze which words can follow other words
# Your code here


# TODO: construct 5 random sentences
# Your code here

