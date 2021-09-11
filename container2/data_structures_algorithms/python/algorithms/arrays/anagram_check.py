"""
===============
Anagram check
===============

Given two strings, check to see if they're anagrams of each other.
"""


# Not optimal in interview - relies on built in methods
def anagram_check_one(string_one: str, string_two: str) -> bool:
    string_one = string_one.replace(' ', '').lower()
    string_two = string_two.replace(' ', '').lower()

    # Verify that the lengths of each string are equal
    if len(string_one) != len(string_two):
        return False

    return sorted(string_one) == sorted(string_two)


# More manual solution
def anagram_check_two(string_one: str, string_two: str) -> bool:
    string_one = string_one.replace(' ', '').lower()
    string_two = string_two.replace(' ', '').lower()

    # Verify that the lengths of each string are equal
    if len(string_one) != len(string_two):
        return False

    # Keeps track of all letters found in strings
    count = {}

    # Adding the first string's letter counts to dictionary of count
    for letter in string_one:
        if letter in count:
            count[letter] += 1
        else:
            count[letter] = 1

    for letter in string_two:
        if letter in count:
            count[letter] -= 1
        else:
            # If the letter doesn't exist - then they are not anagrams
            return False

    for key in count:
        # A count greater than one indicates the
        # first string had more letters
        if count[key] > 0:
            return False

    return True
