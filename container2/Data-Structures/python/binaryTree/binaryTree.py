class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


class BinaryTree:
    def __init__(self):
        self.length = 0
        self.root = None

    def addNode(self, data):
        newNode = Node(data)
        if self.root == None:
            self.root = newNode
        else:
            # added = self.traverseList(self.root, newNode)
            # print(added)
            if not self.traverseList(self.root, newNode):
                print("value already stored {}".format(data))
                return
        self.length += 1

    def traverseList(self, curNode, newNode):
        if newNode.data == curNode.data:
            return False

        if newNode.data > curNode.data:
            if curNode.right == None:
                curNode.right = newNode
                return True
            else:
                return self.traverseList(curNode.right, newNode)

        else:
            if curNode.left == None:
                curNode.left = newNode
                return True
            else:
                return self.traverseList(curNode.left, newNode)

    def printTree(self):
        self.traversePrintTree(self.root)

    def traversePrintTree(self, curNode):
        print(curNode.data)
        if curNode.left != None:
            self.traversePrintTree(curNode.left)
        if curNode.right != None:
            self.traversePrintTree(curNode.right)



bT = BinaryTree()

# adding Nodes
bT.addNode(8)
bT.addNode(4)
bT.addNode(12)
bT.addNode(2)
bT.addNode(6)
bT.addNode(10)
bT.addNode(14)
bT.addNode(3)

print("\n")
# check correct length
print(bT.length)
print("\n")

# adding duplicate Nodes
bT.addNode(10)
bT.addNode(4)
bT.addNode(3)
print("\n")

# Display Nodes
bT.printTree()
