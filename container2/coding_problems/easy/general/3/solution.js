// This is an input class. Do not edit.
class Node {
	constructor(value) {
		this.value = value;
		this.prev = null;
		this.next = null;
	}
}

// Feel free to add new properties and methods to the class.
class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	setHead(node) {
		if (!this.head) {
			this.head = node
			this.tail = node
		} else {
			this.insertBefore(this.head, node)
		}
	}

	setTail(node) {
		if (!this.tail) {
			this.head = node
			this.tail = node
		} else {
			this.insertAfter(this.tail, node)
		}
	}

	insertBefore(node, nodeToInsert) {
		if (nodeToInsert) {
			this.remove(nodeToInsert)
			nodeToInsert.next = node
			nodeToInsert.prev = node.prev

			if (node && node.prev) {
				node.prev.next = nodeToInsert
			} else {
				this.head = nodeToInsert
			}

			if (node) node.prev = nodeToInsert
		}
	}

	insertAfter(node, nodeToInsert) {
		if (nodeToInsert) {
			this.remove(nodeToInsert)
			nodeToInsert.prev = node
			nodeToInsert.next = node.next

			if (node && node.next) {
				node.next.prev = nodeToInsert
			} else {
				this.tail = nodeToInsert
			}

			if (node) node.next = nodeToInsert
		}
	}

	insertAtPosition(position, nodeToInsert) {
		if (nodeToInsert) {
			if (position === 1) {
				this.setHead(nodeToInsert)
			} else {
				let currentNode = this.head
				let currentPos = 1
				while (currentNode && currentPos++ !== position) currentNode = currentNode.next
				if (!currentNode) {
					this.setTail(nodeToInsert)
				} else {
					this.insertBefore(currentNode, nodeToInsert)
				}
			}
		}
	}

	removeNodesWithValue(value) {
		let currentNode = this.head
		while (currentNode) {
			const next = currentNode.next		
			if (currentNode.value === value) this.remove(currentNode)
			currentNode = next
		}
	}

	remove(node) {
		if (node === this.head) this.head = this.head && this.head.next
		if (node === this.tail) this.tail = this.tail && this.tail.prev
		if (node.prev) node.prev.next = node.next
		if (node.next) node.next.prev = node.prev
		node.prev = null
		node.next = null
		node = null
	}

	containsNodeWithValue(value) {
		let currentNode = this.head
		while (currentNode && currentNode.value !== value) currentNode = currentNode.next
		return currentNode !== null
	}
}

// Do not edit the line below.
exports.Node = Node;
exports.DoublyLinkedList = DoublyLinkedList;
