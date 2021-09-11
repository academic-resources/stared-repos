package io.soumasish;

public class RemoveNthNodeFromList {
    private class ListNode{
        int val;
        ListNode next;
        ListNode(int x){ val = x;}
    }
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode previous=head, current=head, next=head;
        while(current.next != null){
            current = current.next;
        }
        return null;
    }
}
