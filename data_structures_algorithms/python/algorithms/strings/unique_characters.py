"""
===============
Unique Characters
===============

Determine if a string is made up of all unique characters.
"""


# Single line solution
def unique_char_one(string: str) -> bool:
    return len(set(string)) == len(string)


# More verbose solution
def unique_char_two(string: str) -> bool:
    characters = set()

    for letter in string:
        # If the letter already exists - it is not unique
        if letter in characters:
            return False
        else:
            characters.add(letter)

    return True
