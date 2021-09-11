# Structural Patterns

* Definition
* Discussion on Structural Patterns
  * Adapter versus Bridge
  * Composite versus Decorator versus Proxy


## Definition

> Structural patterns are concerned with __how classes and objects are composed to form larger structurals__.

Structural _class_ patterns use inheritance to compose interfaces or implementations. The result is a class that combines the properties of its parent classes.

Structural _object_ patterns describe ways to compose objects to realize new functioanlity. The added flexibility of object composition comes from the ability to change the composition at run-time, which is impossible with static class composition.

## Discussion on Structural Patterns

Structural patterns rely on same small set of language mechanisms for structuring code and objects: single and multiple inheritance for class-based patterns, and object composition for object patterns. But the similatiries belie the different intents among these patters.

### Adapter versus Bridge

Both promote flexibility by providing a level of indrection to another object. Both involve forwarding requests to this object from an interface other than its own.

Then key difference between these patterns lies in their __intents__. _Adapter_ focuses on resolving incompatibilities between two existing interfaces. It doesn't focus on those interfaces are implemented, nor does it consider how they might evolve independently. It's a way of making two independently designed class work together without reimplementing one or the other. _Bridge_, on the other hand, brdiges an abstraction and its (potentially numerous) implementations. It also accommodates new implementations as the system evolves.

_Adapter_ and _Brdige_ are often used at different points in the software lifecycle. An _adapter_ often becomes necessary when you discover that two imcompatible classes should work together, generally to avoid replicating code. The coupling is unforeseen. In contrast, the user of a bridge understand up-front that an abstraction must have several implementations, and both may evolve independently. The _Adapter_ pattern makes things work _after_ they're designed, _Bridge_ makes them work _before_ they are.

You might think of a _Facade_ as an adapter to a set of other objects. But that interpretation overlooks the fact that a facade defines a _new_ interface, whereas an _adapter_ reuses an old interface. Remember that an adapter makes two _existing_ interfaces work together as opposed to defining an entirely new one.

### Composite versus Decorator versus Proxy

_Composite_ and _Decorator_ have similar structure diagrams, reflecting the fact that both rely on recursive composition to organize an open-ended number of objects. This commonality might tempt you to think of a decorator object as a degenerate composite, but that misses the point of the _Decorator_ pattern.

_Decorator_ is designed to let you add responsibilities to objects without subclassing. It avois the explosion of subclasses that can arise from trying to cover every combination of responsibilities statically. _Composite_ has a very diferent intent. It focuses on structuring classes so that many related objects can be treated uniformly, and multiple objects can be treated as one. Its focus is not on embellishment but on representation.

These intents are distinct but complementary. Consequently, the _Composite_ and _Decorator_ patterns are often used in concert. Both lead to the kind of design in which you can build applications just by plugging objects together without defining any new classes. There will be an abstract class with some subclasses that are composites, some that are decorators, and some that implement the fundamental building blocks of the system. In this case, both composites and decorators will have a common interface. From the point of view of the _Decorator_ pattern, a composite is a _ConcreteComponent_. From the point of view of the _Composite_ pattern, a decorator is a _Leaf_.

Another pattern with a structure similar to _Decorator_'s is _Proxy_. Both patterns describe how to provide a level of indirection to an object, and the implementations of both the _proxy_ and _decorator_ keep a reference to another object to which they forward requests. Once again, however, they are intended for different purposes.

Like _Decorator_, the _Proxy_ pattern composes an object and provides an identical interface to its clients. Unlike _Decorator_, the _Proxy_ pattern is not concerned with attaching or detaching properties dynamically, and it's not designed for recursive composition. Its intent is to provide a stand-in for a subject when it's inconvenient or undesirable to access the subject directly because, for example, it lives on a remote machine, has restricted access, or is persistent.

In the _Proxy_ pattern, the subject defines the key functionality, and the _proxy_ provides (or refuses) access to it. In _Decorator_, the component provides only part of the functionality, and one or more decorators furnish the rest. _Decorator_ addresses the situation where an object's total functionality can't be determined at compile time, at least not conveniently. That open-endedness makes recursive composition an essential part of _Decorator_. That isn't the case in _Proxy, because _Proxy_ focuses on one relationship and that relationship can be expressed statically.

These differences are significant because they capture solutions to specific recurring problems in object-oriented design. But that _doesn't mean that these patterns can't be combined_. You might envision a _proxy-decorator_ that adds functionality to a _proxy_, or a _decorator-proxy_ that embellishes a remote object. Although such hybrids _might_ be useful, they are divisible into patterns that _are_ useful.
