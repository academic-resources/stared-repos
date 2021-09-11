package io.soumasish;

public class AddTwoNumbers {
    public class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
        }
    }
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode p = null, head = null;
        int carry = 0;
        while(true){
            int sum = 0;
            if(l1 != null) sum += l1.val;
            if (l2 != null) sum += l2.val;
            sum += carry;
            if(sum >= 10){
                sum = sum - 10;
                carry = 1;
            }else{
                carry = 0;
            }
            ListNode temp = new ListNode(sum);
            if(p == null){
                p = temp;
                head = p;
            }
            else{
                p.next = temp;
                p = p.next;
            }
            if(l1 != null) l1 = l1.next;
            if(l2 != null) l2 = l2.next;
            if(l1 == null && l2 == null && carry == 0) break;

        }
        return head;

    }

}
