# Find Rotation Point

# Let's say we're given an alphabetically-sorted list of words that has been rotated at a single point. It might look something like this:

words = [
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
    'asymptote', # <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
]


# Write a function that, given a list of words such as this, returns the index of the rotation point. You can assume that no words will be duplicated.

print(find_rotation_point(words))  # returns 5

# Can you do this with O(lg n) runtime complexity?