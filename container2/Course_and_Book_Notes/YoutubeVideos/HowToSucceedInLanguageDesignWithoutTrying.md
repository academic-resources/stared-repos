## How to Succeed in Language Design Without Trying - Brian Kernighan

Video can be found [here](https://www.youtube.com/watch?v=Sg4U4r_AgJU)

There are lots of programming languages and so many to choose from.

Cover of CAM in 1961, tower of programming langues

Over-simplified history:

- 1940s - machine language
- 1950s - assembly language
- 1960s - High level languages - FORTRAN for math, Cobol for business, BASIC for instruction, Algol
- 1970s - Systems programming: C
- 1980s - object-oriented: C++
- 1990s - Strongly typed: Java
- 2000s - lookalike languages: C#
- 2010s - retry? Scala, Go, Rust, Swift

Scripting languages:

- 1960s - Snobol
- 1970s - shell
- 1980s - Awk
- 1990s - Perl, Python, PHP,
- 2000s - Javascript
- 2010s - Dart?

### "What's a scripting language?"

- "Scripting is a lot like obscenity - I can't define it, but I'll know it when I see it" - Larry Wall, creator of Perl

- Text is a fundamental data type in the language
- regular expressions for text searching and maniuplation
- Associative arrays as basic aggregate type
- Play fast and loose with types
- Usually interpreted instead of compiled

### LISP, Scheme, functional languages

- don't know enough about it
- relatively little-used in the 'real-world'
- everyone profits from things learned from research in functional languages (recursion, garbage collection, functions as first class citizens, etc.)

### Domain specific languages

- application specific languages
- narrow domain
- may not be Turing complete

- Examples:
  - LATEX/Markdown, XML, Traff
  - SQL: database access
  - R: statics
  - AMPL: Mathematical optimization - regular expressions
  - shell/Awk
  - smaller and simpler than main-purpose languages

"I'm going to build the next version of C++" - not realistic

But you can build a language like a domain-specific language

What might make a language succeed? What might you do that would make people not wanting to use it?

#### Notation matters:

"Language shapes the way we think and determines what we think about" - Worf

"A programming language that doesn't change the way you think is not worth learning" - Alan Perlis

### Awk

Derives from experience with Unix shell
Meant to do one-line programs

Intended for data process and analysis, selection, validation

- "Print all lines longer than 80 characters":

```
  `length > 80`
```

Transforming, rearranging:

- "Replace the 2nd field by its logarithm":

```
{ $2 = log($2) ; print}
```

Report generation:

- "Add up numbers in first field, print sum and average":

```
    { sum += $1 }
END { print sum, sum/NR }
```

#### Structure of an Awk program:

- program is a sequence of pattern-action statements

```
  pattern {action}
  pattern {action}
```

- a pattern is a regular expression, numeric expression, string expression or combination
- an action is executable code, similar to C
  usage:
  awk 'program' [file1 file2]
  awk -f progfile [file1 file2]

Operation:

```

for each file
    for each input line
        for each pattern
            if pattern matches input
                do action

```

#### Awk Features for 1-liners:

- input is read automatically across multiple lines
  - lines are split into fields
- operators work on strings
- variables contain string or numbers
  - no declarations: type determined by context and use
  - initialized to - and empty string
  - builtin-in variables for frequently-used values
- operators work on strings or numbers
  - coercive type / value according to context
- associative arrays (arbitrary subscripts)
- control flow statements similar to C: if-else, while, for, do
- regular expressions (like egrep)
- useful built-in functions
  - arithmetic, string, regular expressions, text edit, etc.

Associate Arrays - single most important data structures
-array subscripts can have any value, not just integers
-canonical example:

Action with no pattern - when you have an acction with no pattern, do it on every input line

#### Lessons:

- if you make something useful, people will abuse it

- existence of a language encourages programs to generate it

  - machine generated inputs stresses programs more than people

- mistakes are inevitable and hard to change

- concatenation syntax, ambiguities with >, function syntax
  creeping featurism from user pressure and other implementers
  "One thing [the language designer] should not do is to include untried ideas of his own" - CAR Hoare
- But somebody's got to try them!

99-bottles-of-beer.net

### AMPL: A big DSL that got bigger

- a language and system for:
  - describing optimization problems in a uniform, natural way
  - compiling descriptions into form needed by solver programs
  - controlling execution of solvers
  - displaying results in problem terms
    linear programming - system of constraints, if input and constraints are linear?

Matrix generator - matrix of coefficients of constraints
GAMS - modeled on FORTRAN but awful

Lets you describe optimization problems algebraically
Data specification language
Command language

### AMPL - moderately successful

- a big frog in quite a large pond (taught in university courses, used by airlines)
- proprietary (not open-source)
- language started out purely declarative
- gradually added the mechanisms of programming languages: conditionals, loops, functionals/procedures
- but with odd, irregular, and unconventional syntax

Lanugages:
Start with conceptual integrity, then if you add to it, you lose it

Thoughts on proprietary:
Some things are around/still used because it would be too much effort to reinvent

### EQN - a language for typesetting mathematics

- idea - a language that matches the way mathematics is spoken
- translate that into troff commands
  since the language is so orthogonal, it wouldn't
  and there isn't room anyway, since program has to be less than 65KB troff is powerful enough

- use a pipeline eqn | troff
- like TEX, but simpler, easier (though not as systematic or powerful)
  - math mode in TEX inspired by EQN

### Pic - a language for pictures

- new typesetter has more capabilities (costs more too: \$500)
- can we use troff to do line drawings?
- answer: invent another language, again a preprocessor
  - add simple line-drawing primitives to troff: line, arc, spline
- advantages of text descriptions of pictures

  - systematic changes easy, always correct dimensions
  - Pic has loops, conditionals, etc. for repetitive structures - TURING COMPLETE

- implemented with YACC and LEX
  - makes it easy to experiment with syntax
  - human engineering
    - free form english-like syntax
    - implicit positioning: little need for arithmetic on coordinates

### Grap - a language for drawing graphs

- line drawings, not 'charts' in Excell sense
- a Pic preprocessor: grap | pic | troff

`troff` time has passed, which makes Grap and Pic obsolete

### Why langauges succeed:

- solve real problems in a clearly better way (notation matters!)
- culturally compatible
  familiar syntax
  easy to get started with
  portable to new environments
- environmentally compatible
  (don't have to buy into an entirely new environment to use it, can use standard link to existing libraries - open source, not proprietary
- weak competition
- good luck

BCPL - typeless, didn't match architecture of machines at the time

Objective-C (kind of a C++ thing) - picked to work on NEXT and then used for OSX.
What's going to happen when Swift comes along? Thinks will be death of Objective-C

Success of Objective-C was luck and it's death will be its niche.

### Why languages fail to thrive

- niche or domain disappears
- poor enbgineering (too big, complex, slow, late = incompatible with environments)
- poor philosophical choices (ideaology over functionality, single programming paradigm, too "mathematical", too incompatible)

"There will always be things we wish to say in our programs that in all known languages can only be said poorly."

- Perlis

Start with domain-specific languages if you want to start writing languages
