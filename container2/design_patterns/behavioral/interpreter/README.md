# Interpreter

## Intent

Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

## Applicability

Use the _Interpreter_ pattern when there is a language to interpret, and you can represent statements in the language as abstract syntax trees. The Interpreter pattern works best when:

* __Grammar is simple__. For complex grammars, class hierarchies becomes large and unmanageable. Tools such as parser generators are a better alternative in such cases. They can interpret expressions without building abstract syntax trees, which can save space and possibly time.

* __Efficiency is not a critical concern__. The most efficient interpreters are usually not implemented by interpreting parse trees directly but by first translating them into another form. For example, regular expressions are often transformed into state machines. But even then, the _translator_ can be implemented by the _Interpreter_ pattern, so the pattern is still applicable.

## Collaborations

![interpreter structure](./interpreter-structure.png)

* The client builds (or is given) the sentence as an abstract syntax tree of `NonterminalExpression` and `TerminalExpression` instances. Then the client initializes the context and invokes the `Interpret` operation.

* Each `NonterminalExpression` node defines `Interpret` in terms of `Interpret` on each subexpression. The `Interpret` operation of each `TerminalExpression` edefines the base case in the recursion.

* The `Interpret` operations at each node use the context to store and access the sate of the interpreter.

## Consequences

1. __It's easy to change and extend the grammar.__ Because the pattern uses classes to represent grammar rules, you can use inheritance to change or extend the grammar.

2. __Implemting the grammar is easy.__ Classes defining nodes in the abstract syntax tree have similar implementations. These classes are easy to write, and often their generation can be automated with a compiler or parsed generator.

3. __Complex grammars are hard to maintain.__ The _Interpreter_ pattern defines at least one class for every rule in the grammar. Hence grammars containing many rules can be hard to manage and maintain.

4. __Adding new ways to interpret expressons is easy.__ The _Interpreter_ patter makes it easier to evaluate an expression in a new way. For example, you can support pretty printing or type-checking an expression by defining a new operation on the expression classes. If you keep creating new ways of interpreting an expression, then consider using the _Visitor_ pattern to avoid changing the grammar classes.

## Related Patterns

* _Composite_: The abstract syntax tree is an instance of the _Composite_ pattern.

* _Flyweight_: Shows how to share terminal symbols within the abstract syntax tree.

* _Iterator_: The interpreter can use an _Iterator_ to traverse the structure.

* _Visitor_: can be used to maintain the behavior in each node in the abstract syntax tree.

## Implementation

1. __Creating the abstract syntax tree__. The pattern doesn't explain how to _create_ an abstract syntax tree. In other words, it doesn't address parsing. It can be created by a table-driven parser, by a hand-crafted (usually recursive descent) parser, or directly by the client.

2. __Defining the `Interpret` operation__. You don't have to define the `Interpret` operation in the expression classes. If it's common to create a new interpreter then it's better to use the _Visitor_ pattern to put `Interpret` in a separate "visitor" object.

3. __Sharing terminal symbols__. Grammars whose sentences contain many occurrences of a terminal symbol might benefit from sharing a single copy of that symboo. Grammars for computer programs are good examples (each program variable will appear in many places throughout the code). Terminal nodes generally don't store information about their position in the abstract syntax tree. Parent nodes pass them whatever context they need during interpretation. Hence there is a distinction between shared (intrinsic) state and passed-in (extrinsic) state, and the _Flyweight_ pattern can be used.

## Motivation

If a particular kind of problem occurs often enough, then it might be worthwhile to express instances of the problem as sentences in a simple language. Then you can build an interpreter that solves the problem by interpreting these sentences.

For example, searching for strings that match a pattern is a common problem. Regular expressions are a standard language for specifying patterns of strings. Rather than building custom algorithms to match each pattern against strings, search algorithms could interpret a regular epxression that specifies a set of strings to match.

The _Interpreter_ pattern describes how to define a grammar for simple languages, represent sentences in the language, and interpret these sentences.

In the following example, the pattern describes how to define a grammar for regular expressions:

![interpreter example](./interpreter-example.png)

The example abstract syntax represents the regular expression `raining & (dogs | cats) *`.

We can create an interpreter for these regular expressions by defining the `INterpret` operation on each subclass of `RegularExpression`. `Interpret` takes as an argument the context in which to interpret the expression. The context contains the input string and information on how much of it has been matched so far. Each subclass of `RegularExpression` implements `Interpret` to match the nexty part of the input string based on the current context. For example,

* `LiteralExpression` will check if the input matches the literal it defines.

* `AlternationExpression` will check if the input matches any of its alternatives.

* `RepetitionExpression` will check if the input has multiple copies of expression it repeats.
