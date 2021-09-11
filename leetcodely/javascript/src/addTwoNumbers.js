/* You are given two non-empty linked lists representing two non-negative integers.
*The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
 *
 * /**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 *
 */

class ListNode{
    constructor(val){
        this.val = val;
        this.next = null;
    }

}
createList = (num) =>{
    let head, curr, prev;
    head = curr = prev = ListNode(-1);
    let strNum = num.toString();
    for(const c of strNum){
        curr = new ListNode(parseInt(c, 10))
        prev.next = curr
    }
    return head;

};

addTwoNumbers = (l1, l2) => {

    let p, curr;
    let carry = 0;
    p = curr = new ListNode(0);
    while (l1 || l2) {
        let a = l1 !== null ? l1.val : 0;
        let b = l2 !== null ? l2.val : 0;
        let sum = a + b + carry;
        curr.next = new ListNode(sum%10);
        curr = curr.next;
        carry = Math.floor(sum/10);
        if(l1 !== null){
            l1 = l1.next;
        }
        if(l2 !== null){
            l2 = l2.next;
        }
    }
    if(carry===1)
        curr.next=new ListNode(carry);
    return p.next;

};
l1 = createList(243);
console.log(l1.val);
l2 = createList(708);
console.log(l2.val);
l3 = addTwoNumbers(l1, l2);
console.log(l3.val);
