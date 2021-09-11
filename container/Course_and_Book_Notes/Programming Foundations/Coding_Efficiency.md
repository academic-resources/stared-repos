## Rules of Coding Efficency

1. First, do nothing
2. You don't know what the problem is until you measure it
3. Understand what's under your control
4. Always look for the easy win

## Notes about the course:

Will not get into specifics as it's a general course
Will talk about lanaguage and environment differences - compiled vs interpreted - garbage collected vs manual memory management

# Approaching Efficiency

Significant changes will generally come from general ideas and principles.

### Misconception:

1.  Improving efficiency will be like copywriting a poorly written novel where you have to go through the code line by line and examine and change everything.

- This is rarely, if ever, necessary. Usually, only a few places in your code can make a significant improvement.

2.  Working on efficiency requires guru-level knowledge of language and environment.

- Huge improvements are achievable with code you could have written first few days of using the language
- Being an expert is not necessary and may be detrimental for lack of humility

## First, do nothing

- Don't jump to conclusions
- Think about the problem
- NOTE: If the program is crashing on a regular basis, efficiency is not your first concern

If working on existing code, the precondition is that the code works

What about if you're writing new code?

- Choose the right data structures
- First, do nothing (as far as efficiency)
  - Focus should be clear, accurate, precise, readable, understandable, modular code. Writing clear code is never a waste of time.

"Premature optimization is the root of all evil in programming" - Knuth

Begin by valuing clarity and focus of code
Prove there's an issue before fixing it

## Assume you don't know what the issue is until you measure it

Trusting your gut feeling of what the issue is is a bad habit to get into

UI that freezes could be a network issue, memory issue, threading issue, etc.

### Efficiency Areas

Memory

- Active memory usage of application while running
- Efficiency is not always to use as little memory as possible

Algorithmic

- Statements act as fast as possible
- Sequence of operations chosen to accomplish task
- How things interact with each other
- Multi-threading
- If you are leveraging language efficiency

File/Disk I/O

- Requires external resources
- Minimize the number of times accessing
- Reduce space

Network

- If calling from one machine to another
- Using cloud storage, peer resources, etc.

All independently verifiable.
Efficiency is a sliding scale.

### Web Applications

Client side -> low control, low predictability
Web server -> high control, high predictability

If there's a memory issue on the browser side, the only option is optimizing the Javascript code and how it works on low-specification machines

If there's a memory issue on the server side, you can just add another stick of memory or another server.

## Understand what's under your control

For a programmer, laziness is a virtue.

## Always look for the easy win

Helps avoid pitfall of getting caught up in an area without realizing whether or not it's worth it.

You're looking for something to leap out at you.
If you don't find an obvious bottleneck, look for things that you can remove or move.

Efficiency improvements are not identical in impact.
Don't get caught up in the technical advances, etc.

- The answer may actually seem like cheating

### Not covered: Application Design

- We can measure effect, but not design itself
  Design for clarity, not efficiency

### Not covered: Energy Efficiency

- Rarely application design requirement
- More important: Device settings

### Not covered: UI Efficiency

- Measureable, but more about how users use the application and less about the code itself

# Measurement

Profiling

- Not just one instance in time, but changes over time

Stay focused: Utilities not just used for efficiency - used to monitor health of system -> aimed more at sys admin - need to filter and ignore most things

## Code Analysis Options:

General builtin task monitoring applications
Specialized monitoring and profiling tools

- Specific focus, not always development-oriented
  Developer-focused profiling tools
  Web-focused profiling tools

### General monitoring tools

Activity Monitor / Task Manager

- Good for quick scan
  - If a program is pinging the CPU with 100% or if the app memory goes up and never down
  - If higher memory or CPU -> might worth looking into

`top` -> all processes
`ps {PID}` -> process status
`lsof -p {PID}` -> list open files
`sudo fs_usage {PID}` -> file system usage
`heap {PID or name of application}`

- lists objects that have been allocated by the application and the amount of objects - look for if there are significantly higher numbers of objects in categories than you think necessary
  `leaks {PID}`
- attempts to find leaks in memory -> unaccessable
- allocated memory without valid pointers
  `sudo sysdiagnose {PID}` -> could be run without PID for system diagnostic
- creates a temporary folder
  `dtrace` -> dynamic tracing
- comprehensive performance analysis

### Developer Tools

#### Java Environment

- UVM Monitor (profiler for Eclipse)
- Visual VM
  For Android Development
- ADT includes Traceview and Systrace tools

#### Mac/iOS

- Instruments is a graphical frontend for dtrace

#### Visual Studio - Profiling Tools

- included in VS 2012 Professional, Premium, etc.

#### Other options (non-IDE)

Profiling more related to language than editor
Python -> cProfile
Ruby -> rProfile, ruby-prof

### Web Applications

- What's going on in the server?
- What language?
- Prewritten software? CMS? (Drupal, Joomla, WordPress, SharePoint)
- Database?
- Hardware -> shared? dedicated? VPS? Cloud?

Use Developer Tools to check web application

# Memory

## Memory Efficiency - Core Concepts

Physical memory: RAM/primary memory

- A chunk is used by operating system. What's left is accessible to the rest of the applications

If you run out of physical memory iand application requests more:

- Application A requests more memory.
- Operating system is out of physical memory
  - Takes memory from another application, copies chunk of data to hardware (swap file/paging file)
  - Releases physical memory from Application C so Application A can use it
- If Application C then needs mmemory back:
  - Operating system needs to take from another application
  - After memory freed from another application, need to get data from where it was stored in the harddrive from when Application A took memory and save it to the newly freed memory

When you need to take physical memory and write to disk -> paging out
When bringing back in from disk -> paging in

Working with RAM is significantly faster
Swapping adds up and can contribute to latency

#### iOS - Swapping doesn't happen

If running low on physical memory, iOS will ask application to free up memory

- If it doesn't, application will be ended

## Memory Footprint

Memory elements:

- Application code
- Images/media (loaded assets)
- Our allocated objects <- part you can change the most
- Runtime engine

### Improving Memory Efficiency (after profiling)

Reasons for memory growth:

- Memory leaks (adding new objects, never removing effectively)
- Genuine need for objects
- Fake growth (temporary objects stay alive)
  - Not a leak, bad programming

If using garbage-collected language, could get false positive because it takes a while for garbage-collection to take place

#### Look for:

Instantiation inside loops

- Any object made inside a loop
- Do we pass them to another function?
- When does this get considered unreachable and deleteable?

Objects with large object graphs

- Objects instantiate other objects
- Hidden depths
  User interface objects (new Window()), etc.

Recommended: Lazy instantiation
Any time you can put it off, do so.
Example:

```
// Normal instantiation:
class Employee {
    String name;
    Image photo;

    public Employee (String n) {
        name = n;
        photo = new Image("~/path/to/employee/names" + "name"
    }

    public Image getPhoto() {
        return photo;
    }
// Lazy Instantiation:

class Employee {
    String name;
    Image photo;

    public Employee (String n) {
        name = n;
    }

    public Image getPhoto() {
        if (photo == null) {
            photo = new Image("~/path/to/employee" + "name");
        }
        return photo;
    }
```

### Memory Management Pro / Con

```
Manual                      Automatic (GC)
--------------------------------------------
Con: Harder to write        Pro: Easier to write
Con: Risk of memory bugs    Pro: Less memory bugs
Pro: Usually faster         Con: Slower
Pro: Deterministic          Con: Non-deterministic
```

Garbage collector needs to be part of the process
Misconception: "It takes care of everything!"

- It scans for reachable objects
- If you write objects that never go out of scope, don't get garbage collected

### Objective-C

Reference counter -> incremented based on number of objects needed
ARC (automatic reference counting)
"As if the compiler writes the manual memory management code you would write if you were really good at writing it"

- Unlike GC, done at compile time, not runtime
- Don't need garbage collector
- Unlike GC, deterministic
- Like GC, based on detecting "reachability"

### Overhead and Warmup Costs

- Expect some
- The more the environment does, the more overhead you should expect
- Objects don't just take up their own space, take additional space

### When profiling, check build type

Performance profiling? Use a release build
Memory profiling? Use debug build
Some have default build settings

### Testing Memory

Test large data sets
Test with constrained devices
If you have a "first-run" or install process, test it

Exceptions: Not always using the least amount of memory

# Algorithmic Efficiency

"Could these statements have been written to accomplish the same result, but do it faster?"

Instruments -> Time Profiler

- Look at spikes for efficiency improvements

Be aware of multi-core differences

- If in debug, don't profile CPU -> will add more because of debug functionality

A lot of times, you'll do print debugging for debugging -> can add getTime() in prints to see time between statements

- Better way to tell the time it's taking is to call getTime(), make a loop where you call the function a number of times, and call getTime() again

### Tracing and Profiling in JavaScript

Basic logging:
console.log console.warn
console.debug console.error
console.info

Simple time measurement:

```
window.onload = function () {
    console.time("myTimer");
    complexFunction();
    console.timeEnd("myTimer");
}
```

JS Profiling:

```
window.onload = function () {
    console.profile();
    complexFunction();
    console.profileEnd();
}
```

### Tracking and Performance Counters in .NET

Writing console messages

```
Console.writeLine("..."); // can keep in code and will get taken out of production
```

Using debug class:

```
Debug.WriteLine("..."); // can keep in code and will get taken out of production
```

Using Trace class:

```
Trace.WriteLine("..."); // stays in production code -> can be saved to log files
```

Performance Monitor
Performance Counter

# Big O Notation

Testing a function - Two Approaches

1. Multiple small tests
2. One large test

### Example 1 - Constant Time - O(1)

```
bool isLastNumberEven (array unsortedArray) {
    int length = unsortedArray.length;
    if (unsortedArray[length] % 2 == 0) {
        return true;
    }
    return false;
}
```

### Example 2 - Linear Time - O(n)

```
int CountAllEvenNumbers(array unsorted Array) {
    int evenNumberCount = 0;
    for (int i = 0; i < unsortedArray.length; i++) {
        if (unsortedArray[i] % 2 == 0) evenNumberCount++;
    }
    return evenNumberCount;
}
```

### Example 3 - Quadratic Time - O(n^2)

```
bool findDuplicates (array unsortedArray) {
    for each integer A in unsortedArray {
        for each integer B in unsortedArray {
            if (A.index == B.index) continue;
            if (A == B) return true;
        }
    }
    return false;
}
```

Usually want to avoid quadratic time

- Okay for small amounts of data
- Bad for large input

### O(n log n)

Used by better sorting algorithms

### O(n!) - n factorial

Traveling Salesman (brute force)

### What to look for in code

- Iterations -> potential for improvement is high
  - nested declarations
  - instantiation inside iterations
- Collections ->
  - arrays:
    Indexing is O(1)
    Search is O(1)
    Sort (we hope) is O(n log n)
    Immutable arrays are generally faster - less overhead
    Consider creating immutable array from mutable once loaded
  - in some languages, for ... in is faster than a regular for loop

### Collections Questions

- Do you need to search? How often?
- Do you need to sort? Should it always be sorted?
- Do you need to enumerate the entire collection?
- Does it change size?
- Do you need to pull/push items in or out?

### Strings

- Generally immutable in languages, so any change is creating a new string
- Loop-based string concatenations -> try to use stringBuffer, stringBuilder, etc.
- Be careful about wildcard use, etc.
- More you can minimize the amount of data a function works with, do so.

## Summary:

Always profile
Research collection types
Think about what the statements need to do
Concentrate effort on iterated code
Beware large strings
Realize some things just take time

# Using Disk-Based Resources

(HD, SSD, External Storage)

### Minimize disk reads and writes

- Disks are slow -> if we can keep in RAM, we should

### Speed Comparisons

Main memory reference: 100ns
Read: 1 MB 20,000ns - 100,000ns
Drive seek: 4,000,000ns - 10,000,000ns
Drive read: 1 MB 2,000,000ns - 20,000,000ns
There are warm up costs for using the disk

### Pragmatic Approach to Disk I/O

`fs_usage` -> Instruments - try to find bottlenecks

- Only read in a file if you need it
  - could add latency but will improve startup
- Reads are easier than writes -> don't expect symmetrical performance on both
- Group small reads/writes
  - Read and write larger, sequenctial blocks where possible
- Don't mistake I/O for parsing issues

## Netowrk Efficiency

Minimize network latency
1 - Client request to server
2 - Server processing
3 - Server response to client

1 + 2 + 3 = latency (delay)

In Network tab of Developer Tools:
Time to first byte (latency)
Time to get whole resource (timeline)

Distance affects latency

- Less to do with phnysical distance, more to do with number of hops

### Network Efficiency Techniques

- It's not always a network issue
  - Server could have a long processing time
- Chunky, not chatty
  - Fetch data in chunks
- Move assets closer
  - Use a CDN (CDNs duplicate your assets across multiple locations and serve closest)
- Compress your information
  - substantially reduces the amount of network traffic
  - benefit to most websites
    HTTP compression built-in option on most web servers
    Most browsers include HTML, CSS, and JS decompression

### What about DB Efficiency?

Specialized area

- Begins with normalization
  - Design first for clarity
  - Optimize (denormalize) for performance
- Measure with query and index analysis tools
- A database _is_ a disk-based resource
- Consider each statement
  - What it requires from database

## Next Steps

Web application => server side

- Caching
- Find platform best practices

Client-side

- [ySlow](http://yslow.org/) and [PageSpeed](https://developers.google.com/speed/pagespeed/module/)

Mobile Applications

- Learn your language collection types
- Learn the profiler

Desktop Applications:

- Work on improving startup time
  - Perceptual boost from getting to main task quickly
- Better use of multithreading for UI
  - Even minor blocking of the main UI make the app feal "slow"

## Rules of Code Efficiency:

First, do nothing
You don't know what the problem is until you measure it
Understand what's under your control
Always look for the easy win
