# Adapter

Also known as __Wrapper__.

## Intent

Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.

## Applicability

Use the _Adapter_ pattern when:

* You want to use an existing class, and its interface does not match the one you need.

* You want to create a reusable class that cooperates with unrelated or unforeseen classes, that is, classes that don't necessarily have compatible interfaces.

* _(object adapter only)_ You need to use several existing subclasses, but it's impractical to adapt their interface by subclassing every one.

## Collaborations

* Clients call operations on an `Adapter` instance. In turn, the adapter calls `Adaptee` operations that carry out the request.

![class adapter](./class-adapter.png)

![object adapter](./object-adapter.png)

## Consequences

* __How much adapting does Adapter do?__ There is a spectrum of possible work, from simple interface conversion to supporting an entirely different set of operations. The amount of work `Adapter` does depends on how similar the `Target` interface is to `Adaptee`'s.

* __Pluggable adapters__. A class is more reusable when you minimize the assumptions other classes must make to use it. By building interface adaptation into a class, you eliminate the assumption that other classes see the same interface. Put another way, interface adaptation lets us incorporate our class into existing systems that might expect different interfaces to the class. Smalltalk\[Par90\] uses the term __pluggable adapter__ to describe classes with built-in interface adaptation.

* __Two-way adapters to provide transparency__. A potential problem with adapters is that they aren't transparent to all clients. An adapted object no longer conforms to the `Adaptee` interface, so it can't be used as is wherever an `Adaptee` object can. Two-way adapters can provide such transparency by conforming to both of the adapted classes. Specifically, they're useful when two different clients need to view an object differently.

* Class and object adpaters have different trade-offs.

### Class Adapter

* Adapts `Adaptee` to `Target` by committing to a concrete `Adaptee` class. As a consequence, a class adapter won't work when we want to adapt a class and all its subclasses.

* Lets `Adapter` override some of `Adaptee`'s behavior, since `Adapter` is a subclass of `Adaptee`.

* Introduces only one object, and no additional pointer indirection is needed to get to the adaptee.

### Object Adapter

* Lets a single `Adapter` work with many `Adaptee`s, that is, the `Adaptee` itself and all of its subclasses (if any). The `Adapter` can also add functionality to all `Adaptee`s at once.

* Makes it harder to override `Adaptee` behavior. It will require subclassing `Adaptee` and making `Adapter` refer to the subclass rather than the `Adaptee` itself.

## Related Patterns

* _Bridge_ has a structure similar to an object adapter, but _Bridge_ has different intent: it is meant to separate an interface from its implementation so that they can be varied easily and independently. An adapter is meant to change the interface of an _existing_ object.

* _Decorator_ enhances another object without changing its interface. A decorator is thus more transparent to the application than an adapter is. As consequence, _Decorator_ supports recursive composition, which isn't possible with pure adapters.

* _Proxy_ defines a representative or surrogate for another object and does not change its interface.

## Implementation

1. __Implementing class adapters in C++__. `Adapter` would inherit publicly from `Target` and privately from `Adaptee`. Thus `Adapter` would be a subtype of `Target` but not of `Adaptee`.

2. __Pluggable adapters__. The first step, is to find a "narrow" interface for `Adaptee`, that is, the smallest subset of operations that lets us do the adaptation. This leads to three implementation approaches:

  * __Using abstract operations__. Define corresponding abstract operations for the narrow `Adaptee` interface. Subclasses must implement those.

  * __Using delegate objects__. In this approach, Target forwards requests to a __delegate__ object. Target can use a different adaptation strategy by substituting a different delegate.

  * __Parameterized adapters__. Usual way to support pluggable adapters in Smalltalk is to parameterize an adapter with one or more blocks. The block construct supports adaptation without subclassing. A block can adapt a request, and the adapter can store a block for each individual request.

## Motivation

Sometimes a toolkit class that's designed for reuse isn't reusable only because its interface doesn't match the domain-specific interface an application requires.

Consider for example a drawing editor that lets users drraw and arrange graphical elements (lines, polygons, text, etc.) into pictures and diagrams. The drawing editor's key abstraction is the graphical object, which has an editable shape and can draw itself. The interface for graphical objects is defined by an abstract class called `Shape`. The editor defines a subclass of `Shape` for each kind of graphical object: a `LineShape` class for lines, a `PolygonShape` class for polygons, and so forth.

Classes for elementary geometric shapes like `LineShape` and `PolygonShape` are rather easy to implement, because their drawing and editing capabilities are inherently limited. But a `TextShape` subclass that can display and edit text is considerably more difficult to implement, since even basic text editing involves complicated screen update and buffer management. Meanwhile, an off-the-shelf user interface toolkit might already provide a sophisticated `TextView` class for displaying and editing text. Ideally, we'd like to reuse `TextView` to implement `TextShape`, but the toolkit wasn't designed with `Shape` classes in mind. So we can't use `TextView` and `Shape` objects interchangeably.

We could change `TextView` class so that it conforms to the `Shape` interface, but that isn't an option unless we have the toolkit's source code. Even if we did, it wouldn't make sense to change `TextView`, the toolkit shouldn't have to adopt domain-specific interfaces just to make one application work.

Instead, we could define `TextShape` so that it _adapts_ the `TextView` interface to `Shape`'s. We can do this in one of two ways:

1. __Class version__: Inheriting `Shape`'s interface and `TextView`'s implementation.

2. __Object version__: Composing `TextView` instance within a `TextShape`  and implementing `TextShape` in terms of `TextView`'s interface.

We call `TextShape` an __adapter__.

> The diagram illustrates the object adapter case. It shows how `BoundingBox` requests, declared in class `Shape`, are converted to `GetExtent` requests defined in `TextView`. Since `TextShape` adapts `TextView` to the `Shape` interface, the drawing editor can reuse the otherwise incompatible `TextView` class.

![adapter](./adapter.png)

Often the adapter is responsible for functionality the adapted class doesn't provide.

> The diagram shows how an adapter can fulfill such responsibilities. The user should be able to "drag" every `Shape` object to a new location interactively, but `TextView` isn't designed to do that. `TextShape` can add this missing functionality by implementing `Shape`'s `CreateManipulator` operation, which returns an instance of the appropriate `Manipulator` subclass.
