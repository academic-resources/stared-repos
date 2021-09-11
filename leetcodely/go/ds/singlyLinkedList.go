package ds

import (
	"errors"
	"fmt"
)

type node struct {
	data int
	next *node
}

type SinglyLinkedList struct {
	head *node
	size int
}

func NewSinglyLinkedList() *SinglyLinkedList {
	return &SinglyLinkedList{
		head: nil,
	}
}

func (l *SinglyLinkedList) Insert(data int) error {
	n := &node{
		data: data,
	}
	if l.head == nil {
		l.head = n
	} else {
		n.next = l.head
		l.head = n
	}
	l.size++
	return nil
}

func (l *SinglyLinkedList) Remove(data int) error {
	if l.head.data == data {
		l.head = l.head.next

	} else {
		curr := l.head
		for !(curr == nil) {
			if curr.next == nil {
				return errors.New("item doesn't exist in the list")
			} else if curr.next.data == data {
				curr.next = curr.next.next
			}
			curr = curr.next
		}
	}
	return nil
}

func (l *SinglyLinkedList) Print() error {
	curr := l.head
	if curr == nil {
		return errors.New("Empty List")
	}
	for curr != nil {
		fmt.Println(curr.data)
		curr = curr.next
	}

	return nil
}
