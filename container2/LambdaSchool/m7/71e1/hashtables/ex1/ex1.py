from hashtable import HashTable
from hashtable import HashTableEntry
import ast
cache = {}


def get_indices_of_item_weights(weights, length, limit):
    hash_table = HashTable(64)
    if length == 0 or length == 1:
        return None
    if length == 2:
        if weights[0] + weights[1] == limit:
            hash_table.put(str(limit), (1, 0))
            for z in range(limit, limit+1):
                to_be_tupled = str(hash_table.get(f"{z}"))
                tupled = ast.literal_eval(str(to_be_tupled))
                return tupled
    else:
        for x in range(0, length):
            for y in range(0, length):
                if weights[x] + weights[y] == limit:
                    if x > y:
                        hash_table.put(str(limit), (x, y))
                        for z in range(limit, limit+1):
                            to_be_tupled = str(hash_table.get(f"{z}"))
                            tupled = ast.literal_eval(str(to_be_tupled))
                            return tupled
                    else:
                        hash_table.put(str(limit), (y, x))
                        for z in range(limit, limit+1):
                            to_be_tupled = str(hash_table.get(f"{z}"))
                            tupled = ast.literal_eval(str(to_be_tupled))
                            return tupled
