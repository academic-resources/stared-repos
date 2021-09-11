# Principles of object-oriented design

* Programming to an Interface, not an Implementation
* Favor object composition over class inheritance

### Programming to an Interface, not an Implementation

Implementation reuse is only half the story. Inheritance's ability to define families of
objects with _identical_ interfaces (usually by inheriting from an abstract class) is also
important. Why? Because __polymorphism depends on it__.

When inheritance is used _properly_, all classes derived from an
abstract class will share its interface. This implies that a subclass merely
adds or overrides operations, and does not hide operations of the parent class.

All subclasses can then respond to the requests in the interface of the abstract parent class,
making them __subtypes of the abstract class__.

There are two benefits to manipulating objects solely in terms of the interface defined by
abstract classes:

1. Clients remain unaware of the specific types of objects they use, as long as the
objects adhere to the interface that client expect.
2. Clients remain unaware of the classes that implement these objects, they only know
about the abstract class(es) defining the interface.

This so __greatly reduces implementation dependencies__ between subsystems that it leads
to the principle: _Program to an interface, not an implementation_.

### Favor object composition over class inheritance

Ideally, you shouldn't have to create new components to achieve reuse. You should be able to
get all functionality you need just by assembling existing components through object composition.
This is rarely the case, because the set of available components is never quite rich enough in
practice. Reuse by inheritance makes it easier to make new components that can be composed with
old ones. Inheritance and object composition thus work together.

Nevertheless, designs are often made more reusable (and simpler) by depending more on object
composition.
