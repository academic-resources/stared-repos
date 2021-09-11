"""
This is the same test, but with big hash tables that are _unlikely_ to
have collisions after the 3 inserts we do.

Does not collide with DJB2 or FNV-1-64. But could collide with other hashes.
"""

import unittest
from hashtable import HashTable

class TestHashTable(unittest.TestCase):

    def test_hash_table_insertion_and_retrieval(self):
        ht = HashTable(0x10000)

        ht.put("key-0", "val-0")
        ht.put("key-1", "val-1")
        ht.put("key-2", "val-2")

        return_value = ht.get("key-0")
        self.assertTrue(return_value == "val-0")
        return_value = ht.get("key-1")
        self.assertTrue(return_value == "val-1")
        return_value = ht.get("key-2")
        self.assertTrue(return_value == "val-2")

    def test_hash_table_pution_overwrites_correctly(self):
        ht = HashTable(0x10000)

        ht.put("key-0", "val-0")
        ht.put("key-1", "val-1")
        ht.put("key-2", "val-2")

        ht.put("key-0", "new-val-0")
        ht.put("key-1", "new-val-1")
        ht.put("key-2", "new-val-2")

        return_value = ht.get("key-0")
        self.assertTrue(return_value == "new-val-0")
        return_value = ht.get("key-1")
        self.assertTrue(return_value == "new-val-1")
        return_value = ht.get("key-2")
        self.assertTrue(return_value == "new-val-2")

    def test_hash_table_removes_correctly(self):
        ht = HashTable(0x10000)

        ht.put("key-0", "val-0")
        ht.put("key-1", "val-1")
        ht.put("key-2", "val-2")

        return_value = ht.get("key-0")
        self.assertTrue(return_value == "val-0")
        return_value = ht.get("key-1")
        self.assertTrue(return_value == "val-1")
        return_value = ht.get("key-2")
        self.assertTrue(return_value == "val-2")

        ht.delete("key-2")
        ht.delete("key-1")
        ht.delete("key-0")

        return_value = ht.get("key-0")
        self.assertTrue(return_value is None)
        return_value = ht.get("key-1")
        self.assertTrue(return_value is None)
        return_value = ht.get("key-2")
        self.assertTrue(return_value is None)

if __name__ == '__main__':
    unittest.main()
