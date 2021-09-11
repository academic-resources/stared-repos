/*
* JavaScript automatically allocates memory when objects
* are created and frees it when they are not used anymore
* through GARBAGE COLLECTION. This can give developers the
* false impression that they don't need to worry
* about memory management...
*
* MEMORY LIFE CYCLE
* 1. Allocate memory you need
* 2. Use allocated memory (read, write)
* 3. Release allocated memory when it is not needed anymore
*
* Second part is explicit in all languages.
* First and third are explicit in low-level languages
* but are mostly implicit in high-level languages like JS.
*
 */

/*
* ALLOCATION IN JS
* 1. Value initialization
* 2. Function calls (new, methods that return a copy, etc...)
*
 */

/*
* GARBAGE COLLECTION
*
* Low-level languages require developer to manually determine
* at which point in the program the allocated memory is no
* longer needed and to release it.
*
* Some high-level languages, such as JavaScript, utilize a form
* of automatic memory management known as Garbage Collection.
* The purpose of a GC is to monitor memory allocation and
* determine when a block of allocated memory is no longer
* needed and reclaim it. The automatic process is an
* approximation since the general problem of deciding whether
* or not a specific piece of memory is still needed is undecidable.
*
* As a consequence, garbage collectors implement a restriction of
* a solution to the general problem. This section will explain the
* concepts that are necessary to understanding the main GC algorithms
* and their respective limitations.
*
* REFERENCES
*
* Main concept that GC algorithms rely on. An object is said to
* reference another if the former as access to the latter (either
* implicitly or explicitly). In this context, the notion of an
* "object" is extended to something broader than regular JS objects
* and also contain function scopes (or global lexical scope).
*
* REFERENCE-COUNTING GC
*
* Most naive algorithm. An object is said to be "garbage", or
* collectible if there are zero references pointing to it.
* Limitation: circular references.
*
* MARK-AND-SWEEP GC
*
* Algorithm reduces definition of "an object is no longer needed"
* to "an object is unreachable".
* This algorithm assumes the knowledge of a set of objects called roots.
* In JS, te root is the global object. Periodically, GC will start from
* these roots, find all objects that are referenced from these roots,
* then all objects referenced from these, etc... GC will thus find
* all reachable objects and collect all non-reachable objects.
* Over last few years, all improvements in the field of JS GC,
* are implementation improvements of this algorithms.
* Limitation: Releasing memory manually, right now it is not possible
* to explicitly or programmatically trigger garbage collection in JS.
*
 */

