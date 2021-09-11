class Heap:
    def __init__(self):
        self.storage = []

    # insert node at end of array and shift item up if appropriate
    def insert(self, x):
        self.storage.append(x)
        self._bubble_up(len(self.storage) - 1)

    # delete last node in array and shift items around in response 
    def delete(self):
        first = self.storage[0]

        # set first node as last node
        node_last = self.storage[len(self.storage) - 1]
        self.storage[0] = node_last

        # delete last node 
        del self.storage[len(self.storage) - 1]

        # if not empty shift node 0
        if len(self.storage):
            self._sift_down(0)

        # return original first node
        return first

    # get first item of array, which is also max value
    def get_max(self):
        return self.storage[0]

    # return length of storage array 
    def get_size(self):
        return len(self.storage)

    # if current index greater than parent index, swap them; recursively run
    def _bubble_up(self, current_index):
        # get parent index 
        ip = max(0, ((current_index + 1) // 2) - 1)
        p = self.storage[ip]
        c = self.storage[current_index]
        # check if current index greater than parent index 
        if p < c:
            # if it is, swap them 
            self.storage[ip], self.storage[current_index] = c, p
            # recursively run this 
            self._bubble_up(ip)

    #
    def _sift_down(self, index):
        # assign to variables nodes converted to array/indexes:
        # (left 2x+1 | right 2x+2) minus one for index number 
        ln = index * 2
        rn = index * 2 + 1

        # shifting default to not done 
        shifting_done = False

        # running this while swapping not complete 
        while not shifting_done:

            # try to swap this way first 
            try:
                # if current storage[index] less than storage[leftnode] OR current storage[index] less than storage[rightnode]
                if self.storage[index] < self.storage[ln] or self.storage[index] < self.storage[rn]:
                    # if storage[leftnode] > storage[rightnode]
                    if self.storage[ln] > self.storage[rn]:
                        # swap current node & left node
                        self.storage[index], self.storage[ln] = self.storage[ln], self.storage[index]
                        # set current index as leftnode
                        index = ln
                        # get new left node 
                        ln = ln * 2
                        # get new right node 
                        rn = ln * 2 + 1
                    # if storage[leftnode] < storage[rightnode]
                    else:
                        # swap current node & right node 
                        self.storage[index], self.storage[rn] = self.storage[rn], self.storage[index]
                        # set current index as rightnode
                        index = rn
                        # get new left node
                        ln = rn * 2
                        # get new right node
                        rn = rn * 2 + 1
                else:
                    # shifting complete
                    shifting_done = True

            # if it errors out, swap like this
            except IndexError:
                try:
                    # if storage[index] less than storage[leftnode]
                    if self.storage[index] < self.storage[ln]:
                        # swap 
                        self.storage[index], self.storage[ln] = self.storage[ln], self.storage[index]
                        # set current index as left node 
                        index = ln
                        # shifting complete
                        shifting_done = True
                    # shifting complete
                    else:
                        shifting_done = True
                # shifting complete
                except IndexError:
                    shifting_done = True

        for index, val in enumerate(self.storage):
            self._bubble_up(index)
