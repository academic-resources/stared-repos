# What is a Design Pattern?

> _"Eact pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice."_ - Cristopher Alexander, Architect.

* Definition
* Elements
* Programming language choice
* How design patterns solve design problems

## Definition

> Descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context.

A design pattern __names, abstracts, and identifies__ the key aspects of a common design structure that make it useful for creating a reusable object-oriented design. The design pattern identifies the __participating classes and instances__, their __roles and collaborations__, and the __distribution of responsibilities__.

## Elements

In general, a pattern has four essential elements:

1. __Pattern name__: handle we can use to describe a deisgn problem, its solutions, and consequences.

2. __Problem__: describes when to a apply the pattern, the problem and its context.

3. __Solution__: elements that make up the design, their relationships, responsibilities and collaborations.

4. __Consequences__: results and trade-offs of applying the pattern.

## Programming language choice

The choice of programming language is important because it influences one's point of view. Level language fatures determine what can and cannot be implemented easily.

## How design patterns solve design problems

1. Finding appropriate objects.

2. Determining object granularity.

3. Specifying object interfaces.

4. Specifying object implementations.

### 1. Finding Appropriate Objects

The hard part about object-oriented design is decomposing a system into objects. Design methodologies favor many different approaches such as:

* Write problem statement, single out nouns and verbs, and create corresponding classes and operations.

* Focus on collaborations and responsibilities in your system.

* Model real world and translate objects found during analysis into design.

Some of the problems that may arise using these approaches:

* Object-oriented designs often end up with classes that have no counterparts in the real world, some of them are low-level classes like arrays.

* Strict modeling of the real world leads to a system that reflect's today's realities but not necessarily tomorrow's. Abstractions during design are key to making a design flexible.

Design patterns help you __identify less-obvious abstractions and the objects that can capture them__.

### 2. Determining Object Granularity

Objects can vary tremendously in size and number. How do we decide what should be an object? Design patterns address this issue as well.

### 3. Specifying Object Interfaces

Interfaces are fundamental in object-oriented systems. Objects are known only through their interfaces. There is no way to know anyhing about an object or to ask it to do anything without going through its interface. 

Design patterns help you define interfaces by identifying their key elements and the kinds of data that get sent across an interface. A design pattern might also tell you what _not_ to put in the interface.

Design patterns also specify relationships between interfaces. In particular, they often require some classes to have similar interfaces, or they place constraints on the interfaces of some classes.

### 4. Specifying Object Implementations

Design patterns favor reusability and flexibility by applying design principles:

* Favor composition over inheritance.
* Program to an interface, not an implementation.

Thus, design patterns commonly use aggregation/association, delegation and polymorphism.

