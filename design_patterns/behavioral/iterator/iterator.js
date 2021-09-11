class Iterator {
    constructor(aggregate) { 
        this.aggregate = aggregate
        this.position = 0
    }
    First() {}
    Next() {}
    IsDone() {}
    CurrentItem() {}
}

class ListIterator extends Iterator {
    First() {
        return this.aggregate[0]
    }
    Next() {
        if (this.IsDone()) { return 'Cursor placed at last element!' }
        return this.aggregate[this.position++]
    }
    IsDone() { return this.position === this.aggregate.length - 1 }
    CurrentItem() { return this.aggregate[this.position] }
}

class AbstractList {
    CreateIterator() {}
    Count() {}
    Append(item) {}
}

class List extends AbstractList {
    constructor() {
        super()
        this.structure = []
    }
    CreateIterator() { return new ListIterator(this.structure) }
    Count() { return this.structure.length }
    Append(item) {
        this.structure.push(item)
        return this
    }
}

function demoClient() {
    const myList = new List()
    myList.Append(1).Append(2).Append(3)
    console.log(`Going to iterate over List with ${myList.Count()} items`)
    
    const myListIt = myList.CreateIterator()
    console.log(myListIt.Next())
    console.log('Is iterator done?', myListIt.IsDone())
    console.log(myListIt.Next())
    console.log(myListIt.Next())
    console.log(myListIt.Next())
    console.log(myListIt.First())
    console.log('Is iterator done?', myListIt.IsDone())
    console.log('Iterator is placed at item:', myListIt.CurrentItem())
}

demoClient()
