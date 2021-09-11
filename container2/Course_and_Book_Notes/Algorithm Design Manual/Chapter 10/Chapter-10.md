## Chapter 10: How to Design Algorithms

The key to algorithm design and problem solving in general is to constantly ask questions to guide your thought process and to answer those questions with clear explanations.

You should first have a _strategy_ (a framework around which to build a path to a goal) before thinking about _tactics_ (particular implementation for a solution). For example, a _strategy_ would be the decision to model the problem as a graph algorithm problem whereas the decision to use an adjacency list rather than an adjacency matrix would be a _tactical_ one.

### List of Questions to Ask:

1. Do I really understand the problem?

- a) What is the input?
- b) What is the output?
- c) Can I create an input example small enough to calculate by hand? What happens when I try to solve the problem with that example?
- d) How important is it to find the optimal answer? Can I settle for something close?
- e) How large is a typical instance of my problem? How many items will I generally be working with?
- f) How important is speed? In what timeframe does this algorithm need to run in?
- g) How much time and effort can I put into this Do I have to create the algorithm in a day or can I take my time and experiment to find the best approach?
- h) What kind of problem is this? Graph? Numerical? String? Decision?

2. Can I find a simple algorithm or heuristic for my problem?

- a) Can I use a brute force approach?
  - i - If I use a brute force approach, does it give me the right answer?
  - ii - How do I measure the quality of the solution?
  - iii - What is the Big O time complexity of this solution? Is the problem small enough that that run-time will suffice?
- b) Can I solve this by repeatedly trying a simple rule (i.e., choosing the smallest number)?
  - i - If so, on what type of input does this work well? Does that fit the type of input?
  - ii - On what type of input does this work badly? If I can't find any examples, can I show that it will always work well?
  - iii - How fast does this heuristic come up with an answer? Does it have a simple implementation?

3. Is my problem in the catalog of algorithms in the back of this book?

- a) WHat is known about it? Is there an implementation I could use?
- b) Did I look in the right place for it? Did I look through the pictures and check the index for key words?
- c) Are there resources relevant to the problem on the internet? Did I search Google/Google Scholar/http://www.algorist.com/algorist.html ?

4. Are there special cases of the problem I know how to solve?

- a) Can I solve this efficiently if I ignore some input parameters?
- b) Is the problem easier if I set some input parameters to trivial values like 0 or 1?
- c) Can I simplify the problem? Will that allow me to solve it efficiently?
- d) Why can't this special case algorithm be generalized to a wider class of inputs?
- e) Is my problem already a special case of a more generalized problem in the catalog?

5.  Which of the standard algorithm design paradigms are most relevant to my problem?

- a) Is there a set of items that can sorted? Does sorted order make it easier to find a solution?
- b) Is there a way to split the problem into smaller problems, perhaps using binary search? What about partitioning left from right or big from small? Does this suggest a divide-and-conquer solution?
- c) Do the input objects or desired solution have a natural left to right order? Can I use dynamic programming to exploit this?
- d) Are there some operations being done repeatedly? Can I use a data structure to speed this up?
- e) Can I use random sampling to select which object to pick next? Can I construct random configurations and pick the best one? Can I use directed randomness like simulated annealing to hone in on the best solution?
- f) Can I structure the problem as linear? Can I turn it into an integer program?
- g) Does this seem like an NP-Complete problem? Is it possible that there isn't an efficient solution?

6.  Am I still stumped?

- a) Am I willing to hire an expert to tell me what to do?
- b) Why don't I go back through the questions and work through them again? Did my answers change?

Problem solving is part art and part skill.

Recommended reading _How to Solve It_ by Polya
