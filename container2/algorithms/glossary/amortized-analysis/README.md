# Amortized Analysis

* Overview
* Techniques
  * Aggregate Analysis
  * Accounting Method
  * Potential Method

## Overview

In an *amortized analysis*, we average the time required to perform a sequence of data-structure operations over all the operations performed. With amortized analysis, we can show that the average cost of an operation is small, if we average over a sequence of operations, even though a single operation within the sequence might be expensive.

Amortized analysis differs from average-case analysis in that **probability is not involved**; an amortized analysis **guarantees the average performance of each operation in the worst case**.

## Techniques

### Aggregate Analysis

In *aggregate analysis*, we show that for all *n*, a sequence of *n* operations takes *worst-case* time $T(n)$ in total.

In the worst case, the average cost, or *amortized cost*, per operation is therefore $T(n)/n$.

### Accounting Method

In *accounting method*, we assign differing charges to different operations, with some operations charged more or less than they actually cost. We call the ammount we charge an operation its *amortized cost*.

When an operation's amortized cost exceeds its actual cost, we assign the difference to specific objects in the data structure as *credit*. Credit can help pay for later operations whose amortized cost is less than their actual cost.

We must choose the amortized costs of operations carefully. If we want to show that in the worst case the average cost per operation is small by analyzing with amortized costs, we must ensure that the total amortized cost of a sequence of operations provides an upper bound on the total actual cost of the sequence.

### Potential Method

Instead of representing prepaid work as credit stored with specific objects in the data structure, the *potential method* or *amortized analysis* represents the prepaid work as "potential energy", or just "potential", which can be released to pay for future operations. We associate the potential with the data structure as a whole rather than with specific objects within the data structure.
