class HashTableEntry:
    """
    Linked List hash table key/value pair
    """
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None


# Hash table can't have fewer than this many slots
MIN_CAPACITY = 8


class HashTable:
    """
    A hash table that with `capacity` buckets
    that accepts string keys.
    Implement this.
    

    return hash
    """

    def __init__(self, capacity):
        self.capacity = capacity
        self.storage = [None] * capacity
        self.head = None

    def get_hash_table(self):
        return self.storage

    def get_num_slots(self):
        """
        Return the length of the list you're using to hold the hash
        table data. (Not the number of items stored in the hash table,
        but the number of slots in the main list.)

        One of the tests relies on this.
        Implement this.
        """

        self.length = len(self.storage)
        return self.length


    def get_load_factor(self):
        """
        Return the load factor for this hash table.
        Implement this.
        """

        self.get_num_slots()
        load_factor = self.length / self.capacity
        return load_factor

    def adjust_load_factor(self):

        load_factor = self.get_load_factor()

        if load_factor > 0.7:
            # automatically rehash the table to double its previous size.
            self.resize(self, self.capacity * 2)
        elif load_factor < 0.2:
            # automatically rehash the table to half its previous size, down to a minimum of 8 slots.
            self.resize(self, self.capacity/2)

    def fnv1(self, key):
        """
        FNV-1 Hash, 64-bit
        Implement this, and/or DJB2.   

        algorithm fnv-1 is

        hash := 14695981039346656037 do

        for each byte_of_data to be hashed
            hash := hash × 1099511628211 
            hash := hash XOR byte_of_data

        return hash
        
        """

        FNV_offset_basis = 14695981039346656037
        FNV_prime = 1099511628211

        hash = FNV_offset_basis
        kByte = key.encode()

        for byte in kByte:
            hash = hash**byte
            hash = hash * FNV_prime

        return hash 


    def djb2(self, key):
        """
        DJB2 hash, 32-bit

        Implement this, and/or FNV-1.
        """

        hash = 5381

        for byte in key:
            ordByte = ord(byte)
            hash = (hash * 33) + ordByte

        return hash

    def hash_index(self, key):
        """
        Take an arbitrary key and return a valid integer index
        between within the storage capacity of the hash table.
        """
        return self.fnv1(key) % self.capacity
        # return self.djb2(key) % self.capacity

    def put(self, key, value):
        """
        Store the value with the given key.
        Hash collisions should be handled with Linked List Chaining.
        Implement this.
        """

        # get index number & current node
        index = self.hash_index(key)
        current_node = self.storage[index]
        new_node = HashTableEntry(key, value)

        # if node found in tree then replace it, else add new
        if current_node:
            current_node = value
        else:
            new_node.next = self.head
            self.head = new_node

        return new_node



    def delete(self, key):
        """
        Remove the value stored with the given key.
        Print a warning if the key is not found.
        Implement this.
        """
        # get tree head
        current_node = self.head

        # if tree head exists 
        if current_node:
            
            # while it exists change to none, else change to next 
            while current_node:
                # if its key matches submitted key, change to none 
                if current_node.key == key:
                    current_node.key = None
                # else change to next node 
                else:
                    current_node = current_node.next

        # if tree head nonexistent, tell user 
        else:
            print('No keys found for that value.')

        return None
            


    def get(self, key):
        """
        Retrieve the value stored with the given key.
        Returns None if the key is not found.
        Implement this.
        """

        # get tree head 
        current_node = self.head

        # if it exists 
        if current_node:

            # while it exists return its value, else change to next
            while current_node:
                if current_node.key == key:
                    return current_node.value
                else:
                    current_node = current_node.next

        # if tree head nonexistent, tell user
        else:
            print('No keys found for that value.')

        return None



    def resize(self, new_capacity):
        """
        Changes the capacity of the hash table and
        rehashes all key/value pairs.
        Implement this.
        """

        # set next storage capacity 
        next_storage = [None] * new_capacity

        # for each node in storage right now 
        for current_node in self.storage:
            # if the current one exists 
            if current_node:
                # get hashed index of current node[0]
                key_hashed = self.hash_index(current_node[0])
                # use hashed key as index in next storage & set as current node
                next_storage[key_hashed] = current_node

        # set current storage to next storage  
        self.storage = next_storage


if __name__ == "__main__":
    ht = HashTable(8)

    ht.put("line_1", "'Twas brillig, and the slithy toves")
    ht.put("line_2", "Did gyre and gimble in the wabe:")
    ht.put("line_3", "All mimsy were the borogoves,")
    ht.put("line_4", "And the mome raths outgrabe.")
    ht.put("line_5", '"Beware the Jabberwock, my son!')
    ht.put("line_6", "The jaws that bite, the claws that catch!")
    ht.put("line_7", "Beware the Jubjub bird, and shun")
    ht.put("line_8", 'The frumious Bandersnatch!"')
    ht.put("line_9", "He took his vorpal sword in hand;")
    ht.put("line_10", "Long time the manxome foe he sought--")
    ht.put("line_11", "So rested he by the Tumtum tree")
    ht.put("line_12", "And stood awhile in thought.")

    print("")

    # Test storing beyond capacity
    for i in range(1, 13):
        print(ht.get(f"line_{i}"))

    # Test resizing
    old_capacity = ht.get_num_slots()
    ht.resize(ht.capacity * 2)
    new_capacity = ht.get_num_slots()

    print(f"\nResized from {old_capacity} to {new_capacity}.\n")

    # Test if data intact after resizing
    for i in range(1, 13):
        print(ht.get(f"line_{i}"))

    print("")
