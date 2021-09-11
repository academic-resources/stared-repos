def no_dups(s):
    # Input: a string of words separated by spaces. Only the letters a-z are utilized.
    # Output: the string in the same order, but with subsequent duplicate words removed.
    # There must be no extra spaces at the end of your returned string.
    # The solution must be O(n).

    word_array = s.split(" ")
    print(word_array)
    cache = {}
    no_duplicates = []
    for word in word_array:
        if word not in cache:
            cache[word] = 1
            no_duplicates.append(word)
    final_string = ' '.join(no_duplicates)
    print(final_string)
    return final_string


if __name__ == "__main__":
    print(no_dups(""))
    print(no_dups("hello"))
    print(no_dups("hello hello"))
    print(no_dups("cats dogs fish cats dogs"))
    print(no_dups("spam spam spam eggs spam sausage spam spam and spam"))
