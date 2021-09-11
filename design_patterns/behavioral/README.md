# Behavioral Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects, they describe patterns ofcommunication between them. These patterns characterize complex control flow that's difficult to follow at run-time. They shift your focus away from flow of control to let you concentrate just on the way objects are interconnected.

Behavioral _class_ patterns use _inheritance_ to distribute behavior between classes (_Template Method_ and _Interpreter_).

Behavioral _object_ patterns use _object composition_ rather than inheritance. Some describe how a group of peer objects cooperate to perform a task that no single object can carry out by itself. An important issue here is how peer objects know about each other. Peers could maintain explicit references to each other, but that would increasse their coupling (_Mediator, Chain of Responsibility, Observer_).

Other behavioral _object_ patterns are concerned with _encapsulating behavior_ in an object and delegating requests to it (_Strategy, Command, State, Visitor, Iterator_).

## Dicussion of Behavioral Patterns

* Encapsulating Variation
* Objects as Arguments
* Should Communication be Encapsulated or Distributed
* Summary

### Encapsulating Variation

Encapsulating variation is a theme of many behavioral patterns. When an aspect of a program changes frequently, these patterns define an object that encapsulates that aspect. Then other parts of the the program can collaborate with the object whenever they depend on that aspect. The patterns usually define an abstract class that describes the encapsulating object, and the pattern derives its name from that object. For example:

* a `Strategy` object encapsulates an algorithm.

* a `State` object encapsulates a state-dependent behavior.

* a `Mediator` object encapsulates the protocol between objects.

* an `Iterator` object encapsulates the way you access and traverse the components of an aggregate object.

These patterns describe aspects of a program that are likely to change. Most patterns have two kinds of objects: the new object(s) that encapsulate the aspect, and the existing object(s) that use the new ones. Usually the functionality of new objects would be an integral part of the existing objects were it not for the pattern. For example, code for a `Strategy` would probably be wired into the strategy's `Context`, and code for a `State` would be implemented directly in the state's `Context`.

But not all object behavioral patterns partition functionality like this. For example, _Chain of Responsibility_ deals with an arbitrary number of objects (i.e., a chain), all of which may already exist in the system.

_Chain of Responsibility_ illustrates another difference in behavioral patterns: Not all define static communication relationships between classes. _Chain of Responsibility_ prescribes communication between an open-ended number of objects. Other patterns involve objects that are passed around as arguments.

### Objects as Arguments

Several patterns introduce an object that's _always_ used as an argument. One of these is _Visitor_. A `Visitor` object is the argument to a polymorphic `Accept` operation on the object it visits. The visitor is never considered a part of those objects, even though the conventional alternative to the pattern is to distribute `Visitor` code across the object structure classes.

Other patterns define objects that act as magic tokens to be passed around and invoked at a later time. Both _Command_ and _Memento_ fall into this category. In _Command_, the token represents a request, in _Memento_, it represents the internal state of an object at a particular time. In both cases, the token can have a complex internal representation, but the client is never aware of it. But even here there are differences. Polymorphism is important in the _command_ pattern, because executing the `Command` object is a polymorphic operation. In contrast, the `Memento` interface is so narrow that a memento can only be passed as a value. So it's likely to present no molymorphic operations at all to its clients.

### Should Communication be Encapsulated or Distributed?

_Mediator_ and _Observer_ are competing patterns. The difference between them is that _Observer_ distributes communication by introducing `Observer` and `Subject` objects, whereas a `Mediator` object encapsulates the communication between other objects.

In the _Observer_ pattern, there is no single object that encapsulates a constraint. Instead, the `Observer` and the `Subject` must cooperate to maintain the constraint. Communication patterns are determined by the way observers and subjects are interconnected: a single subject usually has many observers, and sometimes the observer of one subject is a subject of another observer.

The _Mediator_ pattern centralizes rather than distributes. It places the responsibility for maintaining a constraint squarely in the `mediator`.

We've found it easier to make reusable `Observers` and `Subjects` than to make reusable `Mediators`. The _Observer_ pattern promotes partitioning and loose coupling between `Observer` and `Subject`, and that leads to finer-grained classes that are more apt to be reused.

On the other hand, it's easier to understand the flow of communication in _Mediator_ than in _Observer_. `Observers` and `Subjects` are usually connected shortly after they're created, and it's hard to see how they are connected later in the program. The indirection that _Observer_ introduces will make a system harder to understand.

### Decoupliung Senders and Receivers

When collaborating objects refer to each other directly, they become dependent on each other, and that can have an adverse impact on the layering and reusability of a system. _Command_, Observer_, _Mediator_, and _Chain of Responsbility_ address how you can decouple senders and receivers, but with different trade-offs.

The _Command_ pattern supports decoupling by using a `Command` object to define binding between a sender and receiver. It provides a simple interface for issuing the request (`Execute`). Defining the sender-receiver connection in a separate object lets the sender work with different receiver. It keeps the sender decoupled from the receivers, making senders easy to reuse. Moreover, you can reuse the `Command` object to parameterize a receiver with different senders. The `Command` pattern nominally requires a subclass for each sender-receiver connection, altough the pattern describes implementation techniques that avoid subclassing.

The _Observer_ pattern decouples senders (subjects) from receivers (observers) by defining an interface for signaling changes in subjects. _Observer_ defines a looser sender-receiving binding than _Command_, since a subject may have multiple observers, and their number can vary at run-time. The `Subject` and `Observer` interfaces in the _Observer_ pattern are designed for communicating changes. Therefore the _Observer_ pattern is best for decoupling objects when there are data dependencies between them.

The _Mediator_ pattern decouples objects by having them refer to each other indirectly through a `Mediator` object. A `Mediator` object routes requests between `Colleague` objects and centralizes their communication. Consequently, colleagues can only talk to each other through the `Mediator` interface. Because this interface is fixed, the `Mediator` might have to implement its own dispatching scheme for added flexibility. Requests can be encoded and arguments packed in such a way that colleagues can request an open-ended set of operations. The _Mediator_ pattern can reduce subclassing in a system, because it centralizes communication behavior in one class instead of distributing it among subclasses. However, _ad hoc_ dispatching schemes often decrease type safety.

The _Chain of Responsibility_ pattern decouples the sender from the receiver by passing the request along a chain of potential receivers. Since the interface between senders and receivers if fixed, _Chain of Responsibility_ may also require a custom dispatching scheme. Hence it has the same type-safety drawbacks as `Mediator`. _Chain of Responsibility_ is a good way to decouple the sender and the receiver if the chain is already part of the system's structure, and one of several objects may be in a position to handle the request. Moreover, the pattern offers added flexibility in that the chain can be changed or extended easily.

### Summary

With few exceptions, behavioral design patterns complement and reinforce each other. A class in a _Chain of Responsibility_, for example, will probably include at least one application of _Template Method_. The tempalte method can use primitive operations to determine whether the object should handle the request and to choose the object to forward to. The chain can use the _Command_ pattern to represent requests as objects. _Interpreter_ can use the _State_ pattern to define parsing contexts. An iterator can traverse an aggregate, and a visitor can apply an operation to each element in the aggregate.

Behavioral patterns work well with other patterns, too. For example, a system that uses the _Composite_ pattern might use a visitor to perform operations on components of the composition. It could use _Chain of Responsibility_ to let components access global properties through their parent. It could also use _Decorator_ to override these properties on parts of the composition. It could use the _Observer_ pattern to tie one object structure to another and the _State_ pattern to let a component change its behavior as its state changes. The composition itself might be created using the approach in _Builder_, and it might be treated as a _Prototype_ by some other part of the system.;

Well-designed object-oriented systems are just like this, they have multiple patterns embedded in them, but not because their designers necessarily thought in these terms. Composition at the _pattern_ level rather than the class or object levels lets us achieve the same synergy with greater ease.
