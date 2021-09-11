class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.len = 0

    def add(self, item):
        if not self.head:
            self.head = ListNode(item)

        else:
            p = ListNode(item)
            p.next = self.head
            self.head = p
        self.len += 1

    def remove(self, item):
        if not self.head:
            return ValueError('Can\'t remove from a list with no items.')
        curr = self.head
        while curr:
            if curr.next.val == item:
                curr.next = curr.next.next
            curr = curr.next
        self.size -= 1

    def __iter__(self):
        self.top = self.head
        return self

    def __next__(self):
        if self.top:
            curr = self.top
        else:
            raise StopIteration()
        self.top = self.top.next
        return curr.val

    def __len__(self):
        return self.len

    def __str__(self):
        if not self.head:
            return '[]'
        s = '['
        curr = self.head
        for item in self:
            s += str(item)
            if curr.next:
                s += ','
            curr = curr.next
        s += ']'
        return s


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


if __name__ == '__main__':
    slist = SinglyLinkedList()
    slist.add(12)
    slist.add(13)
    slist.add(14)
    print(slist)
