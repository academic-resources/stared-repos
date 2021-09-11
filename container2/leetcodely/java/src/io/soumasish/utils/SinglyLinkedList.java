package io.soumasish.utils;

public class SinglyLinkedList {

    private class Node{
        private int value;
        private Node next;

        Node(int x){
            value = x;
            next = null;
        }
    }
    private Node head;
    private int size;

    public SinglyLinkedList(){
        head = null;
        size = 0;
    }
     public void insert(int item){
        Node p = new Node(item);
        size ++;
        if(head == null){
            head = p;
            return;
        }
        p.next = head;
        head = p;

     }
}
