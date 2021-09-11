from typing import Any


class HashTable:
    def __init__(self, size: int):
        self.size = size
        self.slots = [None] * self.size
        self.data = [None] * self.size

    def put(self, key: int, data: Any):
        hash_value = self.hash_function(key, len(self.slots))

        if self.slots[hash_value] is None:
            self.slots[hash_value] = key
            self.data[hash_value] = data
        else:
            if self.slots[hash_value] == key:
                self.data[hash_value] = data
            else:
                next_slot = self.rehash(hash_value, len(self.slots))

                while (
                    self.slots[next_slot] is not None and
                    self.slots[next_slot] != key
                ):
                    next_slot = self.rehash(next_slot, len(self.slots))

                if self.slots[next_slot] is None:
                    self.slots[next_slot] = key
                    self.data[next_slot] = data
                else:
                    self.data[next_slot] = data

    def hash_function(self, key: int, size: int):
        return key % size

    def rehash(self, old_hash: int, size: int):
        return (old_hash + 1) % size

    def get(self, key: int):
        start_slot = self.hash_function(key, len(self.slots))
        data = None
        stop = False
        found = False
        position = start_slot

        # Loop until we determine whether the key is empty or found
        while self.slots[position] is not None and not found and not stop:
            if self.slots[position] == key:
                found = True
                data = self.data[position]
            else:
                position = self.rehash(position, len(self.slots))
                if position == start_slot:
                    stop = True

        return data

    # Special Python methods to allow bracket notation
    def __getitem__(self, key: int):
        return self.get(key)

    def __setitem___(self, key: int, data: Any):
        return self.put(key, data)
