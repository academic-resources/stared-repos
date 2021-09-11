# Radix Sort

Radix sort is the algorithm used by the card-sorting machines you now find only in computer museums.

Cards have 80 columns, and in each column a machine can punch a hole in one of 12 places. The sorter can be mechanically "programmed" to examine a given column of each card in a deck and distribute the card into one of 12 bins depending on which place has been punched. An operator can then gather the cards bin y bin, so that cards with the first place punched are on top of cards with the second place punched, and so on.

For decimal digits, each column uses only 10 places. A __d-digit number would then occupy a field of d columns__. Since the card sorter can look at only one column at a time, the problem of sorting n cards on a d-digit number requires a sorting algortihm.

## Algorithm

Radix sort solves the problem of card sorting, counterintuitively, by sorting on the __least significant digit first__. The algorithm then combines the cards into a single deck, with the cards in the 0 bin preceding the cards in the 1 bin preceding the cards in the 2 bin, and so on. Then it sorts the entire deck again on the second-least significant digit and recombines the deck in a like manner.

The process continues until the cards have been sorted on all d digits. Remarkably, at that point the cards are fully sorted on the d-digit number. Thus, only d passes through the deck are required to sort.

In order for radix sort to work correctly, the digit sorts must be stable and the operator has to be wary about not changing the order of the cards as they come out of a bin.

## Analysis

Given __n d-digit numbers__ in which each digit can take on up to __k possible values__, RADIX-SORT correctly sorts these numbers in __Theta(d(n+k))__ time if the3 stable sort it uses takes __Theta(n+k)__ time.

## Usage

We sometimes use radix sort so sort records of information that are keyed by multiple fields. For example, we might wish to sort dates by year, month and day.

## Implementation

```
RADIX-SORT(A, d)
  for i = 1 to d
    use a stable sort to sort array A on digit i
```