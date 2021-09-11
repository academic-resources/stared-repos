#ifndef LINKED_LIST_SINGLYLINKEDLIST_HPP
#define LINKED_LIST_SINGLYLINKEDLIST_HPP

#include <iostream>
#include "node.hpp"

template <typename T>
class SinglyLinkedList {

private:
    Node<T>* head;
    std::size_t count;

public:
    SinglyLinkedList();
    SinglyLinkedList(const SinglyLinkedList& source);
    SinglyLinkedList& operator=(const SinglyLinkedList& source);
    ~SinglyLinkedList();
    void insert(T);
    void remove(T);
    bool isEmpty();
    int length();
    void print();

};

template <typename T>
SinglyLinkedList<T>::SinglyLinkedList() : head(nullptr), count(0){}

template <typename T>
template <typename T>
SinglyLinkedList<T>::SinglyLinkedList(const SinglyLinkedList& source){

    Node<T>* curr = source.head;

    while(curr != nullptr){
        Node<T>* p = new Node<T>;
        p->data = curr->data;
        curr = curr->next;

    }

}

//template <typename T>
//SinglyLinkedList<T>::SinglyLinkedList& operator=(const SinglyLinkedList<T>& source){
//    //not sure how to implment this.
//}

template <typename T>
SinglyLinkedList<T>::~SinglyLinkedList() {
    if(!isEmpty()){
        Node<T>* temp = head;
        Node<T>* prev = nullptr;
        while(temp->next != nullptr){
            prev = temp;
            temp = temp->next;
            delete prev;
        }
        delete temp;
    }
}

template <typename T>
bool SinglyLinkedList<T>::isEmpty() {
    return head == nullptr;
}

template <typename T>
void SinglyLinkedList<T>::insert(T item) {
    Node<T>* p = new Node<T>(item);
    p->next = head;
    head = p;
    count += 1;

}

template <typename T>
void SinglyLinkedList<T>::remove(T item) {
    bool present = false;
    if (head->data == item){
        Node<T>* temp = head;
        head = head->next;
        delete(temp);
        count -= 1;
        return;
    }
    Node<T>* temp = head;
    while (temp->next != nullptr){
        if (temp->next->data == item){
            Node<T>* removable = temp->next;
            temp->next = temp->next->next;
            delete(removable);
            present = true;
            count -= 1;
            break;
        } else{
            temp = temp->next;
        }
    }
    if(!present){
        throw std::invalid_argument("item not present in list");
    }
}

template <typename T>
int SinglyLinkedList<T>::length() {
    return count;
}

template <typename T>
void SinglyLinkedList<T>::print() {
    if(isEmpty()){
        throw std::invalid_argument("Can't print an empty list!");
    }
    Node<T>* temp = head;
    while(temp != nullptr){
        if(temp->next != nullptr){
            std::cout<<temp->data;
            std::cout<<"->";
        }else{
            std::cout<<temp->data;
        }
        temp = temp->next;
    }
    std::cout<<std::endl;

}

#endif //LINKED_LIST_SINGLYLINKEDLIST_HPP