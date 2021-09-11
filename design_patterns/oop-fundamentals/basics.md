# OOP Basics

* Class (Concrete Class)
    * OMT Notation
    * UML Cheat sheet
* Abstract Class
* Mixin Class
* Interface
* Type

### Class (Concrete Class)

Defines object's internal data and representation, and defines the operations the
object can perform. Defines _how the object is implemented_.

Objects are created by __instantiating__ a class, which allocates storage for the object's
internal data (made up of instance variables) and associates the operations with these data.

#### OMT Notation

We can use OMT-based notation to represent classes.

![OMT Notation](https://upload.wikimedia.org/wikipedia/commons/9/9d/OMT_object_diagram.png)

#### UML Cheat sheet

![UML Cheat sheet](../uml-cheatsheet.png)

* [UML Relationships explain (Aggregation, Composition, etc)](https://linuxwell.wordpress.com/2011/08/13/uml-class-diagram/)

### Abstract Class

One whose main purpose is to define a common interface for its subclasses.

An abstract class will defer some or all of its implementation to operations
defined in subclasses, hence an abstract class cannot be instantiated.

The operations that an abstract class declares but doesn't implement
are called abstract operations.

### Mixin Class

Class that is intended to provide an optional interface or functionality to other classes.

It's similar to an abstract class in that it's not intended to be instantiated.

Mixin classes require multiple inheritance.

![Mixin](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/httpatomoreillycomsourceoreillyimages1547815.png)

### Interface

The set of all signatures defined by an object's operations is called the interface.
An object's interface characterizes the complete set of requests that can be sent
to the target.

Objects are known only through their interfaces.

An object's interface says nothing about its implementation, different objects
are free to implement requests differently. Two objects with completely different
implementations can have identical interfaces.

The run-time association of a request to an object and one of its operations
is known as __dynamic binding__.

### Type

Name used to denote a particular interface. We speak of an object as having the type
"Window" if it accepts all requests for the operations defined in the interface named
"Window". An object may have many types, and widely different objects can share a type.

Part of an object's interface may be characterized by one type, and other parts by
other types. Two objects of the same type need only share parts of their interfaces.

We say that a type is a __subtype__ of another if its interface contains the interface
of its supertype. Often we speak of a subtype _inheriting_ the interface of its supertype.

