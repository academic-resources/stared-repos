"""
===============
String Compression
===============

Given a string in the form of 'AAAABBBBCCCCDDDD', compress it to
become 'A4B4C4D4'. For this problem, you can falsely 'compress' strings
of single or double letters. For instance, it is okay for 'AAB' to return
'A2B1' even though this technically takes up more space.

The function should be case sensitive, so that a string 'AAAaaa' returns
'A3a3'
"""


def string_compression(string: str) -> str:
    result = ""
    length = len(string)

    # Edge case
    if length == 0:
        return ""

    # Edge case
    if length == 1:
        return string + "1"

    count = 1
    index = 1

    while index < length:
        # If the current character is the same as the previous
        # character, increase the count
        if string[index] == string[index - 1]:
            count += 1
        # Else, append the character with the count and reset
        # the count to one
        else:
            result += f"{result}{string[index-1]}{count}"
            count = 1

        index += 1

    result += f"{result}{string[index-1]}{count}"

    return result
