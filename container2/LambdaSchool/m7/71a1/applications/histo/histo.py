# This function takes a single filename string as an argument, e.g. robin.txt
# It should open the file, and work through it to produce the output.
from collections import OrderedDict
import operator 
def word_count(s):
        cache = {}
        # Ignore each of the following characters: " : , . - + = / \ | [] {}() * ^ &
        ignored_characters = ['\"', ':', ';', ',', '.', '-', '+', '=', '/',
                              "\\", '|', '[', ']', '{', '}', '(', ')', '*', '^', '&']
        word_dictionary = {}
        print('------------------------------------')
        # If the input contains no ignored characters, return an empty dictionary.
        # otherwise get rid of punctuation
        # print(f"string = {s}")
        check_for_ignored = list(s)
        count = 0
        # print(f"check_for_ignored before = {check_for_ignored}")
        for letter1 in s:
            if letter1 == chr(10) or letter1 == chr(13) or letter1 == chr(ord('\t')):
                s.replace(letter1, ' ')
                count += 1
        for letter1 in s:
            for letter in ignored_characters:
                if letter in check_for_ignored:
                    check_for_ignored.remove(letter)
                    count += 1
        if count == 0:
            return word_dictionary
        else:
            separator = ""
            # get string minus punctuation
            word_string = separator.join(check_for_ignored)
            word_string = word_string.replace('\n', ' ')
            word_string = word_string.replace('\r', ' ')
            word_string = word_string.replace('\t', ' ')
            # print(f"word_string = {word_string}")
            # Case should be ignored.
            # Output keys must be lowercase.
            word_string = word_string.lower()

            # split string w/o punctuation into array by space
            # Split the strings into words on any whitespace.
            word_array = word_string.split(" ")

            # if item not in cache, add it and its count to cache
            for word in word_array:
                current_word_count = "#"
                if word not in cache:
                    cache[word] = current_word_count
                else:
                    # 'Hello, my cat. And my cat doesn't say "hello" back.'
                    # Output:  It returns a dictionary of words and their counts:
                    # {'hello': 2, 'my': 2, 'cat': 2, 'and': 1, "doesn't": 1, 'say': 1, 'back': 1}
                    # Key order in the dictionary doesn't matter.
                    cache[word] = (cache[word] + "#")

            delete = [key for key in cache if key ==
                      " " or key == "" or key == None]

            # delete the key
            for key in delete:
                del cache[key]
            # print(f"cache = {cache}")
            return cache

def histo_function(file_name):
    # This function takes a single string as an argument.
    with open("E:\\projects\\LambdaSchool\\m7\\71a1\\applications\\histo\\" + file_name + ".txt") as f:
        # Case should be ignored, and all output forced to lowercase.
        words = f.read().lower()
        # Ignore each of the following characters:
            # " : , . - + = / \ | [ ] { } ( ) * ^ &
        words.replace('\"', "")
        words.replace(".", "")
        words.replace(",", "")
        words.replace("?", "")
        words.replace("!", "")
        words.replace("\\n", " ")
        words.replace("\\r", " ")
        words.replace("\\t", " ")
        # Split the strings into words on any whitespace.
    word_count_dictionary = word_count(words)
    # Print a histogram showing the word count for each word, one hash mark for every occurrence of the word.
    # Output will be first ordered by the number of words, then by the word (alphabetically).
    values_ordered_wcd = sorted(
        word_count_dictionary.items(), key=operator.itemgetter(0))
    ordered_wc_dictionary = sorted(
        values_ordered_wcd, key=operator.itemgetter(1), reverse=True)
    # The hash marks should be left justified two spaces after the longest word.
    for key, value in ordered_wc_dictionary:
        s = ""
        for x in range(0, (16 - len(key))):
            s = s + " "
        print(key, s, value)

histo_function('robin')



    # Hints
        # `.items()` method on a dictionary might be useful.
        # it's possible for `.sort()` to sort on multiple keys at once.
        # negatives might help where `reverse` won't.
        # you can print a variable field width in an f-string with nested braces, like so `{x: {y}}`
