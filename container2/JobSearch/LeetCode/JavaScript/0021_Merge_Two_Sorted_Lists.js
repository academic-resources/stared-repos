// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

// Example:

// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

 function ListNode(val) {
     this.val = val;
     this.next = null;
 }

var mergeTwoLists = function(l1, l2) {
	if (l1 === null && l2 === null) return null
	if (l1 === null) return l2
	if (l2 === null) return l1

	let mergedList = new ListNode()
	let mergedHead = mergedList

	if (l1.val < l2.val) {
		mergedList.val = l1.val
		l1 = l1.next
	} else {
		mergedList.val = l2.val
		l2 = l2.next
	}

	while (l1 && l2) {
		if (l1.val < l2.val) {
			mergedList.next = l1
			l1 = l1.next
		} else {
			mergedList.next = l2
			l2 = l2.next
		}
		mergedList = mergedList.next
	}

	l1 ? mergedList.next = l1 : mergedList.next = l2
	return mergedHead
};


var mergeTwoListsRecurs = function(l1, l2) {
		if (!l1 || !l2) return l1 ? l1 : l2 ? l2 : l1

		if (l1.val > l2.val) {
				l2.next = mergeTwoListsRecurs(l1, l2.next)
				return l2
		} else {
				l1.next = mergeTwoListsRecurs(l2, l1.next)
				return l1
		}
};


let list1 = new ListNode(1)
list1.next = new ListNode(2)
list1.next.next = new ListNode(4)

let list2 = new ListNode(2)
list2.next = new ListNode(3)
list2.next.next = new ListNode(4)

let list3 = mergeTwoLists(list1, list2)
let list4 = new ListNode(10)
let list5 = new ListNode(20)

const listVals = (node) => {
	while (node) {
		console.log(node.val)
		node = node.next
	}
}

listVals(list3)
console.log("=================")
// listVals(mergeTwoLists(list3, list4))
listVals(mergeTwoListsRecurs(list3, list4))
console.log("=================")
listVals(mergeTwoListsRecurs(list4, list5))