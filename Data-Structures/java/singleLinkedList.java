class SingleLinkedList {
    Node head;

    static class Node {
        int data;
        Node next;

        Node(int inData) {
            data = inData;
        }
        Node(String inData) {
            data = inData;
        }
    }

    public static SingleLinkedList appendNode(SingleLinkedList list, int data) {
        Node newNode = new Node(data);
        newNode.next = null;

        if(list.head == null) {
            list.head = newNode;
        } else {
            Node curNode = list.head;
            while(curNode.next != null) {
                curNode = curNode.next;
            }

            curNode.next = newNode;
        }

        return list;
    }

    public static void printList(SingleLinkedList list) {
        Node curNode = list.head;

        System.out.print("SingleLinkedList: ");

        while(curNode != null) {
            System.out.print(curNode.data + " ");
            curNode = curNode.next;
        }
    }

    public static void main(String[] args) {
        SingleLinkedList list = new SingleLinkedList();

        for (int i=0; i<8; i++) {
            list = appendNode(list, (i+1));
        }

        printList(list);
    }
}
