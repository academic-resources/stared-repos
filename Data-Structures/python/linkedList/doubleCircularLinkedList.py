class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoubleLinkedList:
    def __init__(self):
        self.length = 0
        self.head = None
        self.tail = None

    def prependNode(self, data):
        newNode = Node(data)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
            newNode.next = newNode
            newNode.prev = newNode
        else:
            newNode.next = self.head
            newNode.prev = self.head.prev
            self.head.prev.next = newNode
            self.head.next.prev = newNode

            self.head = newNode

        self.length += 1

    def appendNode(self, data):
        newNode = Node(data)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
            newNode.next = newNode
            newNode.prev = newNode
        else:
            curNode = self.head
            while curNode.next != self.head:
                curNode = curNode.next

            newNode.next = self.head
            newNode.prev = curNode
            curNode.next = newNode
            self.tail = newNode

        self.length += 1

    def printList(self):
        # BUG: Only printing last Node
        if self.length == 0:
            return False
        curNode = self.head
        while curNode.next != self.head:
            print(curNode.data)
            curNode = curNode.next


dLL = DoubleLinkedList()

dLL.prependNode(1)
dLL.prependNode(2)
dLL.prependNode(3)
dLL.prependNode(4)

dLL.printList()
