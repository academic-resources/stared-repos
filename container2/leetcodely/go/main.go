package main

import (
	"github.com/soumasish/leetcodely/go/ds"
)

func main() {
	l := ds.NewSinglyLinkedList()
	l.Insert(23)
	l.Insert(32)
	l.Print()
	l.Remove(23)
	l.Print()
}
