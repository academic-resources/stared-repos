# Example 1
alphabets = ['a','b','d','e','i','j','o']

def filterVowels(alphabet):
    vowels = ['a','e','i','o','u']

    if (alphabet in vowels):
        return True
    else:
        return False

filteredVowels = filter(filterVowels, alphabets)

print(list(filteredVowels))
