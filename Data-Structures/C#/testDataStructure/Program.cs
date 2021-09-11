using System;
using DataStructures.SLL;

namespace testDataStructure
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            SingleLinkedList sLL = new SingleLinkedList();

            Console.WriteLine(sLL.isEmpty());

            sLL.prependNode(1);
            sLL.prependNode(2);
            sLL.appendNode(3);
            sLL.appendNode(4);

            sLL.printList();

            sLL.deleteNode(3);
            sLL.printList();

            sLL.prependNode(3);
            sLL.appendNode(3);
            sLL.appendNode(3);
            sLL.printList();
            sLL.deleteAllNodes(3);
            sLL.printList();

            Node found = sLL.findNode(1);
            Node next = sLL.getNextNode(found);

            Console.WriteLine("");

            Console.WriteLine(found.data);
            Console.WriteLine(next.data);

            Console.WriteLine(sLL.isEmpty());

            sLL.deleteAllNodes(2);
            sLL.deleteAllNodes(1);
            sLL.deleteAllNodes(4);

            Console.WriteLine(sLL.isEmpty());
            sLL.deleteAllNodes(1);
            sLL.deleteNode(1);
        }
    }
}
