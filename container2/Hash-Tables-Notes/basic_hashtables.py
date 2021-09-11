# '''
# Basic hash table key/value pair
# '''
class Pair:
    def __init__(self, key, value):
        self.key = key
        self.value = value


# '''
# Basic hash table
# Fill this in.  All storage values should be initialized to None
# '''
class BasicHashTable:
    def __init__(self, capacity):
        self.capacity = capacity
        # self.count = 0
        self.storage = [None] * capacity


# '''
# Fill this in.
# Research and implement the djb2 hash function
# '''
def hash(string, max):
    hash = 5381
    for i in string:
        hash = (( hash << 5) + hash) + ord(i)
    return hash % max

def djb2(key):
    hash = 5381
    for i in key:
        print(f'Hash: {hash}, Hash * 33: {hash * 33}, ord(i): {ord(i)}. SUM: {(hash*33)+ord(i)}')
        # On each loop, it adds hash * 33 to the Unicode point of that letter in the string, and updates hash to that sum.
        hash = (hash * 33) + ord(i)
    return hash

print(djb2('pih'))


# '''
# Fill this in.

# If you are overwriting a value with a different key, print a warning.
# '''
def hash_table_insert(hash_table, key, value):
    index = hash(key, hash_table.capacity)
    pair = Pair(key, value)
    stored_pair = hash_table.storage[index]

    if hash_table.storage[index] is not None:
        if pair.key != stored_pair.key:
            print(f"Warning: Index at {str(index)} is currently ({hash_table.storage[index]}). It will now be overwritten.")

    # Now lets overwrite it
    hash_table.storage[index] = pair


# '''
# Fill this in.

# If you try to remove a value that isn't there, print a warning.
# '''
def hash_table_remove(hash_table, key):
    index = hash(key, hash_table.capacity)

    if (hash_table.storage[index] is None or
            hash_table.storage[index].key != key):
        print(f'Unable to remove item with key: {key}')
    else:
        hash_table.storage[index] = None


# '''
# Fill this in.

# Should return None if the key is not found.
# '''
def hash_table_retrieve(hash_table, key):
    index = hash(key, hash_table.capacity)

    if hash_table.storage[index] is not None:
        if hash_table.storage[index].key == key:
            return hash_table.storage[index].value
        print(f'Key {key} at that index does not match.')

    print(f'Unable to find value with key: {key}')
    return None


def Testing():
    ht = BasicHashTable(16)

    hash_table_insert(ht, "line", "Here today...\n")

    hash_table_remove(ht, "line")

    if hash_table_retrieve(ht, "line") is None:
        print("...gone tomorrow (success!)")
    else:
        print("ERROR:  STILL HERE")


Testing()
