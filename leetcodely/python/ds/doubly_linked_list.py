class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.len = 0

    def add(self, item):
        if not self.head:
            self.head = ListNode(item)
        else:
            p = ListNode(item)
            p.next = self.head
            self.head.previous = p
            self.head = p
        self.len += 1

    def remove(self, item):
        curr = self.head
        flag = False
        while curr:
            if curr.next.val == item:
                flag = True
                curr.next = curr.next.next
                if curr.next:
                    curr.next.previous = curr
                break
            curr = curr.next
        if not flag:
            raise ValueError("Removing an item that is not present in the list")

    def __len__(self):
        return self.len

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

    def __str__(self):
        s = '['
        for item in self:
            s += str(item)
            s += ', '
        s += ']'
        return s


class ListNode:
    def __init__(self, item):
        self.val = item
        self.previous = None
        self.next = None


if __name__ == '__main__':
    p = DoublyLinkedList()
    p.add(12)
    p.add(13)
    p.add(14)
    print(p)
    p.remove(12)
    print(p)
