# OOP Intermediate

* Class versus Interface Inheritance
* Composition
* Inheritance versus Composition
* Delegation
* Inheritance versus Parameterized Types

### Class versus Interface Inheritance (sub-typing)

Class inheritance defines an object's implementation in terms of another object's implementation.
In short, its a mechanism for code and representation sharing.

Interface inheritance or _sub-typing_ describes when an object can be used in place of another.

### Composition

Object composition is an alternative to class inheritance. Here, new functionality is obtained
by assembling or _composing_ objects to get more complex functionality. This requires that
the objects being composed have well-defined interfaces, no internal details of objects are visible.

### Inheritance versus Composition

Class inheritance is defined statically at compile-time and is straightforward to use. It also makes
it easier to modify the implementation being reused. When a subclass overrides some but not all
operations, it can affect the operations it inherits as well. But class inheritance has its disadvantages
too. First, you can't change implementations inherited at run-time, second, and generally worse,
parent classes often define at least part of their subclasses' physical representation.
Because inheritance exposes a subclass to details of its parent's implementation, it's often said that
"_inheritance breakes encapsulation_", as implementation of a subclass becomes so bound up with
the implementation of its parent class that any change in the parent's implementation will force
the subclass to change.

Object composition is defined dynamically at run-time through objects acquiring references to another
objects, which requires objects to respect each others' interfaces, which in turn requires carefully
designed interfaces that don't stop you from using one object with many others. Because objects
are accessed solely through their interfaces, we don't break encapsulation, there are substantially
fewer implementation dependencies. Object composition helps you keep each class encapsulated and
focused on one task. Your classes and class hierarchies will remain small.

### Delegation

Make composition as powerful for reuse as inheritance. In delegation, _two_ objects are involved in
handling a request: __a receiving object relegates operations to its delegate__. This is analogous
to subclasses deferring requests to parent classes, but with inheritance, an inherited operation can
always refer to the receiving object through the `this` member in C++ for example. To achieve the
same effect with delegation, the receiver passes itself to the delegate to let the delegated operation
refer to the receiver.

For example, instead of making class Window a subclass of Rectangle (because windows happen to be
rectangular), the Window class might reuse the behavior of Rectangle by keeping a Rectangle instance
variable and _delegating_ Rectangle-specific behavior to it. Window must now forward requests to its
Rectangle instance explicitly, whereas before it would have inherited those operations.

The main advantage of delegation is that it makes it easy to compose behaviors at runtime and to
change the way they're composed. Our window can become circular at run-time simply by replacing
its Rectangle instance with a Circle instance, assuming they have the same type.

Delegation has a disadvantage it shartes with other techniques that make software more flxible
through object composition: __dynamic, highly parameterized software is harder to understand
than more static software__. There are also run-time inefficiencies, but the human  inefficiencies
are more important in the long run. Delegation is only a good design choice when it simplifies more
than it complicates.

### Inheritance versus Parameterized Types

Parameterized types, also known as _generics_ (Ada, Eiffel) and _templates_ (C++) is a technique that
lets you define a type without specifying all the other types it uses. The unspecified types are
supplied as parameters at the point of use. The language implementation will create a customized version
of the class template for each type of element.

Parameterized types give us a third way (in addition to class inheritance and object composition)
to compose behavior in object-oriented designs, letting you change the types that a class can use (compile-time).

Parameterized types aren't needed at all in a language that doesn't have complile-time type checking.

