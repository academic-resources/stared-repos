class HashMap:
    def __init__(self):
        self.store = [None for _ in range(16)]
        self.size = 0

    def get(self, key):
        key_hash = self._hash(key)
        index = self._position(key_hash)
        if not self.store[index]:
            return None
        else:
            list_at_index = self.store[index]
            return next((i.value for i in list_at_index if i.key == key), None)

    def put(self, key, value):
        p = Node(key, value)
        key_hash = self._hash(key)
        index = self._position(key_hash)
        if not self.store[index]:
            self.store[index] = [p]
            self.size += 1
        else:
            list_at_index = self.store[index]
            if p not in list_at_index:
                list_at_index.append(p)
                self.size += 1
            else:
                _ = next((i.update(value) for i in list_at_index if i == p), None)

    def __len__(self):
        return self.size

    def _hash(self, key):
        if isinstance(key, int):
            return key
        result = 5381
        for char in key:
            result = 33 * result + ord(char)
        return result

    def _position(self, key_hash):
        return key_hash % 15


class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value

    def __eq__(self, other):
        return self.key == other.key

    def update(self, value):
        self.value = value


if __name__ == '__main__':
    hashmap = HashMap()
    hashmap.put(2, 12)
    print(hashmap.get(2))
    hashmap.put('asd', 13)
    hashmap.put(2, 11)
    print(hashmap.get(2))
    print(hashmap.get('asd'))
    print(hashmap.get('ade'))
