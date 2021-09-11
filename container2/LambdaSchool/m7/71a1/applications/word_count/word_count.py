

# This function takes a single string as an argument.
def word_count(s):
    cache = {}
    # Ignore each of the following characters: " : , . - + = / \ | [] {}() * ^ &
    ignored_characters = ['\"', ':', ';', ',', '.', '-', '+', '=', '/',
                          "\\", '|', '[', ']', '{', '}', '(', ')', '*', '^', '&']
    word_dictionary = {}
    print('------------------------------------')
    # If the input contains no ignored characters, return an empty dictionary.
    # otherwise get rid of punctuation
    print(f"string = {s}")
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
    print(f"check_for_ignored after = {check_for_ignored}")
    
    print(f"count = {count}")
    if count == 0:
        return word_dictionary
    else:
        separator = ""
        # get string minus punctuation 
        word_string = separator.join(check_for_ignored)
        word_string = word_string.replace('\n', ' ')
        word_string = word_string.replace('\r', ' ')
        word_string = word_string.replace('\t', ' ')
        print(f"word_string = {word_string}")
        # Case should be ignored.
        # Output keys must be lowercase.
        word_string = word_string.lower()

        # split string w/o punctuation into array by space
        # Split the strings into words on any whitespace.
        word_array = word_string.split(" ")

        print(f"word_array = {word_array}")
        # if item not in cache, add it and its count to cache
        for word in word_array:
            current_word_count = 1
            if word not in cache:
                cache[word] = current_word_count
            else:
                # 'Hello, my cat. And my cat doesn't say "hello" back.'
                # Output:  It returns a dictionary of words and their counts:
                # {'hello': 2, 'my': 2, 'cat': 2, 'and': 1, "doesn't": 1, 'say': 1, 'back': 1}
                # Key order in the dictionary doesn't matter.
                cache[word] = (cache[word] + 1)

        delete = [key for key in cache if key ==
                  " " or key == "" or key == None]

        # delete the key
        for key in delete:
            del cache[key]

        print(f"cache= {cache}")

        return cache


if __name__ == "__main__":
    print(word_count(""))
    print(word_count("Hello"))
    print(word_count('Hello, my cat. And my cat doesn\'t say "hello" back.'))
    print(word_count('This is a test of the emergency broadcast network. This is only a test.'))
