# Decorator

Also known as __Wrapper__.

## Intent

Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

## Applicability

Use the __Decorator__ pattern when:

* Add responsibilities to individual objects dynamically and transparently, that is, without affecting other objects.

* For responsibilities that can be withdrawn.

* When extension by subclassing is impractical. Sometimes a large number of independent extensions are possible and would produce an explosion of subclasses to support every combination.

## Collaborations

* `Decorator` forwards requests to its `Component` object. It may optionally perform additional operations before and after forwarding the requests.

![decorator structure](./decorator-structure.png)

## Consequences

The _Decorator_ pattern hgas at least two key benefits and two liabilities:

1. __More flexibility than static inheritance__. With decorators, responsibilities can be added and removed at run-time. They also make it easy to add a property twice. For example, to give a `TextView` a double border, simply attach two `BorderDecorators`.

2. __Avoids feature-laden classes high up in the hierarchy__. Decorator offers a pay-as-you-go approach to adding responsibilities. Instead of trying to support all foreseeable features in a complex, customizable class, you can define a simple class and add functionality incrementally with `Decorator` objects. As a result, an application needn't pay for features it doesn't use. It's also easy to define new kinds of `Decorators` independently from the classes of objects they extend.

3. __A decorator and its component aren't identical__. A decorator acts as a transparent enclosure. But from an object identity point of view, a decorated component is not identical to the component itself. Hene you shouldn't rely on object identity when you use decorators.

4. __Lots of little objects__. A design that uses `Decorator` often results in systems composed of lots of little objects that all look alike. The objects differ only in the way they are interconnected, not in their class or in the value of their variables. Although these systems are easy to customize by those who understand them, they can be hard to learn and debug.

## Related Patterns

* _Strategies_ are a better choice in situations where the `Component` class is intrinsically heavyweight, thereby making the `Decorator` pattern too costly to apply. In the _Strategy_ pattern, the component forwards some of its behavior to a separate strategy object. The _Strategy_ pattern lets us alter or extend the component's functionality by replacing the strategy object. For example, we can support different border styles by having the component defer border-drawing to a separate `Border` object. The `Border` object is a _Strategy_ object that encapsulates a border-drawing strategy.

  * With strategies, the component itself knows about possible extensions. So it has to reference and maintain the corresponding strategies. On the other hand, decorators change a component from the outside, the component doesn't have to know anything about its decorators, that is, the decorators are transparent to the component.

  * Decorator's interface must conform to the component's. On the other hand, a strategy can have its own specialized interface.

* _Adapter_: A decorator is different from an adapter in that a decorator only changes an object's responsibilities, not its interface, an adapter will give an object a completely new interface.

* _Composite_: A decorator can be viewed as a degenerate composite with only one component. However, a decorator adds additional responsibilities, which isn't intended for object aggregation.

## Implementation

Several issues should be considered when applying the _Decorator_ pattern:

1. __Interface conformance__. A decorator object's interface must conform to the interface of the component it decorates.

2. __Omitting the abstract Decorator class__. There's no need to define an abstract `Decorator` class when you only need to add one responsibility.

3. __Keeping Component classes lightweight__. To ensure a conforming interface, components and decorators must descend from a common `Component` class. It's important to keep this common class lightweight, that is, it should focus on defining an interface, not on storing data.

4. __Changing the skin of an object versus changing its guts__. We can think of a decorator as a skin over an object that changes its behavior. An alternative is to change the object's guts. The _Strategy_ pattern is a good example of a pattern for changing the guts.

## Motivation

Sometimes we want to add responsibilities to individual objects, not to an entire class.

A graphical user interface toolkit, for example, should let you add properties like borders or behaviors like scrolling to any user interface component.

One way to add responsibilities is with inheritance. Inheriting a border from another class puts a border around every subclass instance. This is inflexible, however, because the choice of border is made statically. A client can't control how and when to decorate the component with a border.

A more flexible approach is to enclose the component in another object that adds the border. The enclosing object is called a __decorator__. The decorator conforms to the interface of the component it decores so that its presence is transparent to the component's clients. The decorator forwards requests to the component and may perform additional actions (such as drawing a border) before or after forwarding. Transparency lets you nest decorators recursively, thereby allowing an unlimited number of added responsibilities.

![decorator example](./decorator-example.png)

For example, suppose we have a `TextView` object that displays text in a window. `TextView` has no scroll bars by default, because we might not always need them. When we do, we can use a `ScrollDecorator` to add them. We can also use `BorderDecorator` to add a thick black border around `TextView`. We simply compose the decorators with the `TextView` to produce the desired results.

The `ScrollDecorator` and `BorderDecorator` classes are subclasses of `Decorator`, an abstract class for visual components that decorate other visual components.

![decorator example diagram](./decorator-example-2.png)

`VisualComponent` is the abstract class for visual objects. It defines their drawing and event handling interface. Notw how the `Decorator` class simply forwards draw requests to its component, and how `Decorator` subclasses can extend this operation.

`Decorator` subclasses are free to add operations for specific functionality. For example, `ScrollDecorator`'s `ScrollTo` operation lets other objects scroll the interface _if_ they know there happens to be a `ScrollDecorator` object in the interface.

The important aspect of this pattern is that it lets decorators appear anywhere a `VisualComponent` can. That way clients generally can't tell the difference between a decorated component and an undecorated one.
