#!/bin/python3

# Complete the repeatedString function below.
def repeatedString(string, characters):
    count = 0
    length = len(string)
    remainder = characters % length
    quotient = characters // length

    temp_string = string * quotient
    temp_add = string[0:remainder]
    final_string = temp_string + temp_add
    list_string = list(final_string)
    for iter in list_string:
        if "a" in iter:
            count += 1
    return count


string = "aba"
characters = 10

print(repeatedString(string, characters))
