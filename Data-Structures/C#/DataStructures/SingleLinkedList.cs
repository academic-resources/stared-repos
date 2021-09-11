using System;

namespace DataStructures.SLL
{
    public class Node
    {
        public int data;
        public Node next;

        public Node(int data)
        {
            this.data = data;
            this.next = null;
        }
    }

    public class SingleLinkedList
    {
        public Node head;
        public int length;

        public SingleLinkedList()
        {
            this.length = 0;
            this.head = null;
        }

        public void prependNode(int data)
        {
            Node newNode = new Node(data);

            if (this.length == 0)
            {
                this.head = newNode;
            }
            else
            {
                newNode.next = this.head;
                this.head = newNode;
            }

            this.length++;
        }

        public void appendNode(int data)
        {
            Node newNode = new Node(data);

            if (this.length == 0)
            {
                this.head = newNode;
                this.length++;
            }
            else
            {
                Node curNode = this.head;

                while (curNode.next != null)
                {
                    curNode = curNode.next;
                }

                curNode.next = newNode;
            }

            this.length++;
        }

        public void deleteNode(int data)
        {
            if (this.length == 0) return;

            Node curNode = this.head;
            if (curNode.data == data)
            {
                this.head = this.head.next;
                curNode.next = null;
                this.length--;
            }

            while (curNode.next != null)
            {
                if (curNode.next.data == data)
                {
                    Node deleteNode = curNode.next;
                    curNode.next = deleteNode.next;
                    deleteNode = null;
                    this.length--;
                } 
                else {
                    curNode = curNode.next;
                }
            }
        }

        public void deleteAllNodes(int data)
        {
            if (this.length == 0)
            {
                return;
            }
            Node curNode = this.head;
            while (this.head.data == data)
            {
                this.head = this.head.next;
                curNode = this.head;
                this.length--;
                // Stop if the List is empty
                if (curNode == null) return;
            }

            while (curNode.next != null)
            {
                if(curNode.next.data == data)
                {
                    Node deleteNode = curNode.next;
                    curNode.next = deleteNode.next;
                    deleteNode = null;
                    this.length--;
                }
                else
                {
                    curNode = curNode.next;
                }
            }
        }

        public Boolean isEmpty()
        {
            return this.length == 0 ? true : false;
        }

        public Node findNode(int data)
        {
            Node curNode = this.head;

            while (curNode.data != data)
            {
                if(curNode.next == null)
                {
                    return null;
                }
                else
                {
                    curNode = curNode.next;
                }
            }

            return curNode;
        }

        public Node getNextNode(Node node)
        {
            if (node is Node)
            {
                return node.next;
            }
            return null;
        }

        public void printList()
        {
            Node curNode = this.head;
            Console.WriteLine(String.Format("\nPrinting List of Length: {0}", this.length));
            while(curNode != null)
            {
                Console.WriteLine(curNode.data);
                curNode = curNode.next;
            }
        }
    }
}