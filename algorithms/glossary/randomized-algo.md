# Randomized Algorithm

We often can use tprobability and randomness as a tool for algorithm design and analysis, by making the behavior of part of the algorithm random.

KMore generally, we call an algorithm _randomizedQ_, if its behavior is determined not only by its input but also by values produced by a __random-number generator__.

## Random Number Generator

A call to `RANDOM(a,b)` returns an integer between a and b, inclusive, with each such integer being euqally likely.

In practice, most programming environments offer a __pseudorandom-number generator__, a deterministic algorithm returning numbers that "look" statistically random.

## Analysis

We distinguish algorithms from those in which the input is random, by referring to the running time of a randomized algorithm as an __expected running time__.

In general, we discuss the average-case running time when the probability distribution is over the inputs to the algorithm, and we discuss the expected running time when the algorithm itself makes random choices.