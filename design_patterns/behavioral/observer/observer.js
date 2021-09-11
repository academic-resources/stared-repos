/**
 * Subject:
 * + Knows its observers. Any number of Observer object may observe a subject.
 * + Provides an interface for attaching and detaching Observer objects.
*/
class Subject {
    observers = {}

    Attach(observer) {
        observer.SetSubject(this)
        this.observers[observer.GetId()] = observer
    }
    Dettach(observer) {
        delete this.observers[this.observer.getId()]
    }
    Notify() {
        console.log('Change in Subject, notifying all Observers...')
        for (const o of Object.values(this.observers)) o.Update() 
    }
}


/**
 * ConcreteSubject:
 * + Stores state of interest to ConcreteObserver objects.
 * + Sends a notification to its observers when its state changes.
 */
class ConcretSubject extends Subject {
    constructor(state) {
        super()
        this.subjectState = state
    }

    GetState() { return this.subjectState }
    SetState(state) {
        this.subjectState = state
        this.Notify()
    }
}


/*
 * Observer:
 * + Defines an updating interface for objects that should be notified of changes in a subject.
 */
class Observer {
    Update() {}
}


/**
 * ConcreteObserver
 * + Maintains a reference to a ConcreteSubject object.
 * + Stores state that should stay consistent with the subject's.
 * + Implements the Observer updating interface to keep its state consistent with the subject's.
 */
class ConcretObserver extends Observer{
    static currentId = 0
    
    constructor() {
        super()
        this.id = ++ConcretObserver.currentId
    }

    GetId() { return this.id }

    SetSubject(subject) { 
        this.subject = subject
        this.observerState = subject.GetState()
    }

    Update() {
        console.log(`Updating Observer-${this.id}`)
        this.observerState = this.subject.GetState()
    }
}

function demoClient() {
    const publisher = new ConcretSubject({ test: 'this is a test state' })
    const subscriber_1 = new ConcretObserver()
    const subscriber_2 = new ConcretObserver()

    console.log(subscriber_1)
    console.log(subscriber_2)

    publisher.Attach(subscriber_1)
    publisher.Attach(subscriber_2)

    publisher.SetState({
        test: 'this is change test'
    })

    console.log('-- Updated Observer 1 State --')
    console.log(subscriber_1.observerState)
}

demoClient()
