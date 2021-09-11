# Amortized Analysis

- Overview
- Techniques
  - Aggregate Analysis
  - Accounting Method
  - Potential Method

## Overview

In an _amortized analysis_, we average the time required to perform a sequence of data-structure operations over all the operations performed. With amortized analysis, we can show that the average cost of an operation is small, if we average over a sequence of operations, even though a single operation within the sequence might be expensive.

Amortized analysis differs from average-case analysis in that **probability is not involved**; an amortized analysis **guarantees the average performance of each operation in the worst case**.

## Techniques

### Aggregate Analysis

In _aggregate analysis_, we show that for all _n_, a sequence of _n_ operations takes _worst-case_ time $T(n)$ in total.

In the worst case, the average cost, or _amortized cost_, per operation is therefore $T(n)/n$.

### Accounting Method

In _accounting method_, we assign differing charges to different operations, with some operations charged more or less than they actually cost. We call the ammount we charge an operation its _amortized cost_.

When an operation's amortized cost exceeds its actual cost, we assign the difference to specific objects in the data structure as _credit_. Credit can help pay for later operations whose amortized cost is less than their actual cost.

We must choose the amortized costs of operations carefully. If we want to show that in the worst case the average cost per operation is small by analyzing with amortized costs, we must ensure that the total amortized cost of a sequence of operations provides an upper bound on the total actual cost of the sequence.

### Potential Method

Instead of representing prepaid work as credit stored with specific objects in the data structure, the _potential method_ or _amortized analysis_ represents the prepaid work as "potential energy", or just "potential", which can be released to pay for future operations. We associate the potential with the data structure as a whole rather than with specific objects within the data structure.
