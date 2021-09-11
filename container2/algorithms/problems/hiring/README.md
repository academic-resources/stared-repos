# Hiring Problem

Suposse yhat you need to hire a new office assistant. You decide to use an employment agency which sends you one candidate each day. You interview that person and then decide either to hire that person or not.

You must pay the employment agency a small fee to interview an applicant. To actually hire an applicant is more costly, however, since you must fire your current office assistant and pay a substantial fee to the employment agency.

You are commited to having, at all times, the best possible person for the job. Therefore, you decide that, after interviewing each applicant, if that applicant is better qualified than the current office assistant, you will fire the current office assistant and hire the new applicant.

You are willing to pay the resulting price of this strategy, but you wish to estimate what that price will be.

## Pseudocode

* Assume the candidates are numbered 1 through n.
* Assume that you are able to, after interviewing candidate i, determine whether candidate i is best candidate you have seen so far.
* We initialize with a dummy candidate, numbered 0, who is less qualified that any other.

```
HIRE-ASSISTANT(n):
best = 0
for i = 1 to n:
  interview candidate i
  if candidate i is better than candidate best
    best = i
    hire candidate i
```

## Analysis

Interviewing has a low cost, say c[i], whereas hiring is expensive, costing c[h]. Letting m be the number of people hired, the total cost associated with this algorithm is O(c[i]*n + c[h]*m).

No matter how many people we hire, we always interview n candidates and thus always incur the cost c[i]*n associated with interviewing. We therefore concencentrate on analyzing c[h]*m, the hiring cost, which varies with each run of the algorithm.

### Probabilistic Analysis

We can asssume that applicants come in a random order. We assume that we can compare any two candidates and decide which one is better qualified. Thus, we can rank each candidate with a unique number from 1 through n, using `rank(i)` to denote the rank of applicant `i`, and adopt the convention that a higher rank corresponds to a better qualified applicant.

The ordered list [rank(1), ..., rank(n)] is a permutation of the list (1, ..., n). Saying that the applicants come in a random order is equivalent to saying that this list of rank is equally likely to be any of the n! permutations of the numbers 1 through n.

Alternatively, we say that the ranks form a __uniform random permutation__, that is, each of the possible n! permutations appears with equal probability.

## Randomized Algorithm

We must have greater control over the order in which we interview the candidates.

We say that the employment agency has `n` candidates, and they send us a list of the candidates in advance. On each day, we choose, randomly, which candidate to interview.

Instead of relying on a guess that the candidates come to us in a random order, we have instead gained control of the process and enforced a random order.

```
RANDOMIZED-HIRE-ASSISTANT(n):
  randomly permute list of candidates
  best = 0
  for i = 1 to n:
    interview candidate i
    if candidate i is better than candidate best
      best = i
      hire candidate i
```

### Analysis

Candidate i is hired, exactly when candidate i is better than each of candidates 1 through i-1.

Because we have assumed that the candidates arriven in a random order, the first i candidates have appeared in a random order.

Any one of these first i cnadidates is equally likely to be the best-qualified so far.

Candidate i has a probability of 1/i of being better qualified than candidates 1 through i-1 and thus a probability of 1/i of being hired.

So we can compute that E[X] = E(sum from 1 through n, of 1/i), which is less or equal than ln(n). Therefore expected running time os ln(n) + O(1).

Even though we interview n people, we actually hire only approximately ln(n) of them, on average.

## Online Hiring Problem Variant

Suppose now that we do not wish to interview all candidates, instead we are willing to settle for a candidate who is close to the best, in exchange for hiring exactly once.

We must obey one company requirement, after each interview, we must either immediately offer the position to the applicant or immediately reject the applicant.

What is the trade-off between minimizing the amount of interviewing and maximizing the quality of the candidate hired.

### Model

After meeting an applicant, we are able to give each one a score (`score(i)`) and assume that no two applicants receive the same score. After we have seen j applicants, we know which of the j has the highest score, but we do not know whether any of the remaining n-j applicants will receive a higher score.

We decide to adopt the startegy of selecting a positive integer k < n, interviewing and then rejecting the first k applicants, and hiring the first applicant thereafter who has a higher score than all preceding applicants.

```
ON-LINE_MAXIMUM(k, n):
  best_score = -infinity
  for i = 1 to k:
    if score(i) > best_score:
      best_score = score(i)
  for i = k + 1 to n
    if score(i) > best_score
      return i // we hire this one
  return n;
```

By probabilistic analysis, we see that we maximize the lower bound on the probability when `ln k = ln n-1 = ln(n/e)`, or equivalently, when `k=n/e`. Thus, if we implement our startegy with __k = n/e__ we succeed in hiring our best-qualified applicant with probability at least `1/e`.