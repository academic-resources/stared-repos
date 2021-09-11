# Design Patterns

## :pushpin: Description

Theory and practical examples of design patterns in multiple programming languages (C++, Javascript and Python).

I want to address the following points in this project:
* What are design patterns and why are they important?
* Real-life working examples

## :books: Bibliography

* :closed_book: [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
* :closed_book: [Software Design Patterns: Wikipedia](https://en.wikipedia.org/wiki/Software_design_pattern)
* :closed_book: [Gang of Four - Cheatsheet](./GangOfFour-Cheatsheet.pdf)

## :clipboard: Design Pattern Catalog

* [What is a Design Pattern?](./introduction/design-pattern.md)

| [Creational](./creational) | [Structural](./structural) | [Behavioral](./structural/behavioral-patterns) |
|------------------	|------------	|------------	|
| [Abstract Factory](./creational/abstract-factory) | [Adapter](./structural/adapter) | [Chain of Responsibility](./behavioral/chain-of-responsibility) |
| [Builder](./creational/builder) | [Bridge](./structural/bridge) | [Command](./behavioral/command) |
| [Factory Method](./creational/factory-method) | [Composite](./structural/composite) | [Interpreter](./behavioral/interpreter) |
| [Prototype](./creational/prototype) | [Decorator](./structural/decorator) | [Iterator](./behavioral/iterator) |
| [Singleton](./creational/singleton) | [Facade](./structural/facade) | [Mediator](./behavioral/mediator) |
| | [Flyweight](./structural/flyweight) | [Memento](./behavioral/memento) |
| | [Proxy](./structural/proxy) | [Observer](./behavioral/observer) |
| | | [State](./behavioral/state) |
| | | [Strategy](./behavioral/strategy) |
| | | [Template Method](./behavioral/template-method) |
| | | [Visitor](./behavioral/visitor) |

* [Creational Patterns](./creational)
    * [Abstract Factory](./creational/abstract-factory): Provide an interface for creating families of related or dependent objects without specifying their concrete classes.
	* [Builder](./creational/builder): Separate the construction of a complex object from its representation so that the same construction process can create different representations.
	* [Factory Method](./creational/factory-method): Define an interface for creating an object, but let subclasses decide which class to instantiate.
	* [Prototype](./creational/prototype): Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.
	* [Singleton](./creational/singleton): Ensure a class only has one instance, and provide a global point of access to it.
	
* [Structural Patterns](./structural)
    * [Adapter (or Wrapper)](./structural/adapter): Convert the interface of a class into another interface clients expect.
    * [Bridge (or Handle/Body)](./structural/bridge): Decouple an abstraction from its implementation so that the two can vary independently.
	* [Composite](./structural/composite): Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
    * [Decorator (or Wrapper)](./structural/decorator): Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.
    * [Facade](./structural/facade): Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.
    * [Flyweight](./structural/flyweight): Use sharing to support large numbers of fine-grained objects efficiently.
    * [Proxy (or Surrogate)](./structural/proxy): Provide a surrogate or placeholder for another object to control access to it.

* [Behavioral Patterns](./behavioral)
    * [Chain of Responsibility](./behavioral/chain-of-responsibility): Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.
    * [Command](./behavioral/command): Encapsulate the request as an object, thereby letitng you parameterize clients with different requests, queue or log requests, and support undoable operations.
    * [Interpreter](./behavioral/interpreter): Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
    * [Iterator](./behavioral/iterator): Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
    * [Mediator](./behavioral/mediator): Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.
    * [Memento](./behavioral/memento): Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.
    * [Observer](./behavioral/observer): Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
    * [State](./behavioral/state): Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
    * [Strategy](./behavioral/strategy): Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
    * [Template Method](./behavioral/template-method): Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
    * [Visitor](./behvioral/visitor): Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.

## Selecting a design pattern

1. Study patterns' intents and how they interrelate.

2. Examine causes of redesign.

3. Consider what should be variable in your design.

### Causes of redesign

* __Creating an object by specifying a class explicitly__. This commits you to a particular implementation instead of a particular interface. To avoid it, create objects indirectly.
    * Design patterns: _Abstract Factory, Factory Method, Prototype._

* __Dependence on specific operations__.  When you specify a particular operation, you commit to one way of satisfying a request. By avoiding hard-coded requests, you can make it easier to change the way a request gets satisfied both at compile-time and at run-time.
    * Design patterns: _Chain of Responsibility, Command_.

* __Dependence on hardware and software platform__. Software that depends on a particular platform will be harder to port to other platforms. It may even be difficult to keep it up to date on its native platform. It's important therefore to design your system to limit its platform dependencies.
    * Design patterns: _Abstract Factory, Bridge_.

* __Dependence on object representations or implementations__. Clients that know how an object is represented, stored, located, or implemented might need to be changed when the object changes. Hiding this information from clients keeps changes from cascading.
    * Design patterns: _Abstract Factory, Bridge, Memento, Proxy_.

* __Algorithmic dependencies__. Algorithms are often extended, optimized, and replaced during development and reuse. Objects that depend on an algorithm will have to change when the algorithm changes. Therefore algorithms that are likely to change should be isolated.
    * Design patterns: _Builder, Iterator, Strategy, Template Method, Visitor_.

* __Tight coupling__. Classes that are tightly coupled are hard to reuse in isolation, since they depend on each other. Tight coupling leads to monolithic systems, where you can't change or remove a class without understanding and changing many other classes. The system becomes a dense mass that's hard to learn, port, and maintain. Loose coupling increases portabiliy and makes that a system can be learned, ported, modified, and extended more easily.
    * Design patterns: _Abstract Factory, Bridge, Chain of Responsibility, Command, Facade, Mediator, Observer_.

* __Extending functionality by subclassing__. Every new class has a fixed implementation overhead (initialization, finalization, etc.). Defining a subclass also requires an in-depth understanding of the parent class. Subclassing can lead to an explosion of classes, because you might have to introduce many new subclasses for even a simple extension. Object composition in general and delegation in particular provide flexible alternatives to inheritance for combining behavior. On the other hand, heavy use of object composition can make designs harder to understand. Many design patterns produce designs in which you can introduce customized functionality just by defining one subclass and composing its instances with existing ones.
    * Design patterns: _Bridge, Chain of Responsibility, Composite, Decorator, Observer, Strategy_.

* __Inability to alter classes conveniently__. Sometimes you have to modify a class that can't be modified conveniently.
    * Design patterns: _Adapter, Decorator, Visitor_.


### Aspects that can vary

| Purpose    	| Design Pattern          	| Aspect(s) That Can Vary                                                                     	|
|------------	|-------------------------	|---------------------------------------------------------------------------------------------	|
| Creational 	| Abstract Factory        	| Families of product objects.                                                                	|
|            	| Builder                 	| How a composite object gets created.                                                        	|
|            	| Factory Method          	| Subclass of object that is instantiated.                                                    	|
|            	| Prototype               	| Class of object that is instantiated.                                                       	|
|            	| Singleton               	| The sole instance of a class.                                                               	|
| Structural 	| Adapter                 	| Interface to an object.                                                                     	|
|            	| Bridge                  	| Implementation of an object.                                                                	|
|            	| Composite               	| Structure and composition of an object.                                                     	|
|            	| Decorator               	| Responsibilities of an object without subclassing.                                          	|
|            	| Facade                  	| Interface to a subsystem.                                                                   	|
|            	| Flyweight               	| Storage costs of objects.                                                                   	|
|            	| Proxy                   	| How an object is accessed; its location.                                                    	|
| Behavioral 	| Chain of responsibility 	| Object that can fulfill a request.                                                          	|
|            	| Command                 	| When and how a request is fulfilled.                                                        	|
|            	| Interpreter             	| Grammar and interpretation of a language.                                                   	|
|            	| Iterator                	| How an aggregate's elements are accessed, traversed.                                        	|
|            	| Mediator                	| How and which object interact with each other.                                              	|
|            	| Memento                 	| What private information is stored outside an object, and when.                             	|
|            	| Observer                	| Number of objects that depend on another object, how the dependent objects stay up to date. 	|
|            	| State                   	| States of an object.                                                                        	|
|            	| Strategy                	| An algorithm.                                                                               	|
|            	| Template Method         	| Steps of an algorithm.                                                                      	|
|            	| Visitor                 	| Operations that can be applied to object(s) without changing their class(es).               	|

| -     	| -      	| -                                            	| Purpose                                                            	| -                                                                                         	|
|-------	|--------	|----------------------------------------------	|--------------------------------------------------------------------	|-------------------------------------------------------------------------------------------	|
| -     	| -      	| Creational                                   	| Structural                                                         	| Behavioral                                                                                	|
| Scope 	| Class  	| Factory Method                               	| Adapter (class)                                                    	| Interpreter, Template Method                                                               	|
| -     	| Object 	| Abstract Factory, Builder, Prototype, Singleton 	| Adapter (object), Bridge, Composite, Decorator, Facade, Flyweight, Proxy 	| Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Visitor 	|

## :fire: Status

:heavy_check_mark: Completed all Object-Oriented Design Patterns from GoF

:heavy_check_mark: Javascript examples

:point_right: Refactor Javascript examples using Typescript

:point_right: C++ examples
