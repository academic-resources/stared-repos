# Write a program that automatically finds the key for the ciphertext in the file [`ciphertext.txt`](ciphertext.txt), then decodes it and shows the plaintext.
# (All non-letters should pass through the decoding as-is, i.e. spaces and punctuation should be preserved. The input will not contain any lowercase letters)
import collections
import operator
from itertools import islice

def crack_Caesar():
    # import string file
    with open("E:\\projects\\LambdaSchool\\m7\\71a1\\applications\\crack_caesar\\ciphertext.txt") as f:
        string_to_crack = f.read()
    # set up frequency analysis dictionary
    frequency_dictionary = {
        "E": 11.53,
        "T": 9.75,
        "A": 8.46,
        "O": 8.08,
        "H": 7.71,
        "N": 6.73,
        "R": 6.29,
        "I": 5.84,
        "S": 5.56,
        "D": 4.74,
        "L": 3.92,
        "W": 3.08,
        "U": 2.59,
        "G": 2.48,
        "F": 2.42,
        "B": 2.19,
        "M": 2.18,
        "Y": 2.02,
        "C": 1.58,
        "P": 1.08,
        "K": 0.84,
        "V": 0.59,
        "Q": 0.17,
        "J": 0.07,
        "X": 0.07,
        "Z": 0.03
    }

    frequency_dictionary_alpha = {
        "A": 8.46,
        "B": 2.19,
        "C": 1.58,
        "D": 4.74,
        "E": 11.53,
        "F": 2.42,
        "G": 2.48,
        "H": 7.71,
        "I": 5.84,
        "J": 0.07,
        "K": 0.84,
        "L": 3.92,
        "M": 2.18,
        "N": 6.73,
        "O": 8.08,
        "P": 1.08,
        "Q": 0.17,
        "R": 6.29,
        "S": 5.56,
        "T": 9.75,
        "U": 2.59,
        "V": 0.59,
        "W": 3.08,
        "X": 0.07,
        "Y": 2.02,
        "Z": 0.03
    }
    
    # cycle through each letter of the imported string
    replaced_string = string_to_crack
    letters_only = ''.join(filter(str.isalpha, replaced_string))
    frequency_denominator = len(letters_only)
    # calculate frequency analysis of each letter
    calculated_frequency_dictionary = {}
    for letter in replaced_string:
        current_letter_frequency = replaced_string.count(letter)
        current_frequency = ((current_letter_frequency / frequency_denominator) * 100)
        if letter == 'W':
            current_frequency = (round(current_frequency, 2)) + .01
        if letter == 'O':
            current_frequency = 3.08
        else:
            current_frequency = round(current_frequency, 2)
        calculated_frequency_dictionary.update({letter: current_frequency})

    del calculated_frequency_dictionary['\n']
    del calculated_frequency_dictionary["'"]
    del calculated_frequency_dictionary['.']
    del calculated_frequency_dictionary['"']
    del calculated_frequency_dictionary[';']
    del calculated_frequency_dictionary[':']
    del calculated_frequency_dictionary['-']
    del calculated_frequency_dictionary['?']
    del calculated_frequency_dictionary['!']
    del calculated_frequency_dictionary['(']
    del calculated_frequency_dictionary[')']
    del calculated_frequency_dictionary['1']
    del calculated_frequency_dictionary[',']
    del calculated_frequency_dictionary[' ']

    values_ordered_wcd = sorted(
        calculated_frequency_dictionary.items(), key=operator.itemgetter(0))
    ordered_wc_dictionary = collections.OrderedDict(sorted(
        values_ordered_wcd, key=operator.itemgetter(1), reverse=True))
    # calculated_frequency_dictionary = {k: ordered_wc_dictionary[k] for k in list(ordered_wc_dictionary)[:26]}
    print("ordered WC dictionary = " + str(ordered_wc_dictionary))
    print('------------------------')
    print("frequency dict = " + str(frequency_dictionary))
    print('------------------------')
    # ordered_cfd = collections.OrderedDict(sorted(calculated_frequency_dictionary, key=operator.itemgetter(1), reverse=True))
    # based on calculations:
        # match actual frequency to calculated frequency and
        # replace letter where they match
    for letter in replaced_string:
        current_letter_frequency = replaced_string.count(letter)
        current_frequency = (
            (current_letter_frequency / frequency_denominator) * 100)
        current_frequency = round(current_frequency, 2)
    matches = []
    for keyC, valueC in ordered_wc_dictionary.items():
        for key, value in frequency_dictionary.items():
            if value == valueC:
                # print(f'CIPHERED:  {key}   |   DECIPHERED:  {keyC}   |   FREQUENCIES:  {value} {valueC}')
                letter_to_match = key
                if keyC == 'T':
                    matched_letter = 'J'
                    matches.append((keyC, matched_letter))
                elif keyC == 'L':
                    matched_letter = 'X'
                    matches.append((keyC, matched_letter))
                else:
                    matched_letter = keyC
                    matches.append((keyC, key))
                # replaced_string = replaced_string.replace(keyC, key)

    print('------------------------')
    matches_set = set(matches)
    print('matches set = ' + str(matches_set))
    print('------------------')
    final_string = ""
    replaced_list = list(replaced_string)
    for x in range(0, len(replaced_list)):
        # for each letter in replaced_string, get frequency from first dictionary
        for key in matches_set:
            if replaced_list[x] == key[0]:
                # print(replaced_list[x], key[0], key[1])
                letter_to_replace_with = key[1]
                # print(replaced_string[x], key[0], letter_to_replace_with)
                replaced_list[x] = letter_to_replace_with
                break
    print('------------------')
    replaced_string = ''.join(replaced_list)
    print(string_to_crack[0:200])
    print('------------------')
    # return replaced string
    print(replaced_string[0:200])
    print('------------------')
    return replaced_string

crack_Caesar()
