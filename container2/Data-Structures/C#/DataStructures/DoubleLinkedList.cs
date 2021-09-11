using System;

namespace DataStructures.DLL
{
    public class Node
    {
        public int data;
        public Node next;
        public Node prev;

        public Node(int data)
        {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }

    public class DoubleLinkedList
    {
        public Node head;
        public Node tail;
        public int length;

        public DoubleLinkedList()
        {
            this.length = 0;
            this.head = null;
            this.tail = null;
        }

        public void prependNode(int data)
        {
            Node newNode = new Node(data);

            if(this.length == 0)
            {
                this.head = newNode;
                this.tail = newNode;
            }
            else
            {
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }

            this.length++;
        }

        public void appendNode(int data)
        {
            Node newNode = new Node(data);

            if(this.length ==0)
            {
                this.head = newNode;
                this.tail = newNode;
            }
            else
            {
                Node curNode = this.head;
                while (curNode.next != null)
                {
                    curNode = curNode.next;
                }

                newNode.prev = curNode;
                curNode.next = newNode;
                this.tail = newNode;
            }

            this.length++;
        }

        public Node getNextNode(Node node)
        {
            return (node.next == null) ? null : node.next;
        }

        public Boolean isEmpty()
        {
            return this.length == 0;
        }

        public void printList()
        {
            Node curNode = this.head;
            Console.WriteLine(String.Format("\nPrinting List of Length: {0}", this.length));
            while (curNode != null)
            {
                Console.WriteLine(curNode.data);
                curNode = curNode.next;
            }
        }
    }
}
