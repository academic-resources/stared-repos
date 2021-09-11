# Hash Tables

Dynamic set that supports only dictionary operations INSERT, SEARCH, and DELETE.

Hash table is an effective data structure for __implementing dictionaries__. Altough searching for an element in a hash table can take as long as searching for an element in a linked list (Theta(n) time in worst case), in practice, hashing performs extremely well. Under reasonable assumptions, the average time to search for an element in a hash table is O(1).

When the set `K` of keys stored in a dictionary is much smaller than the universe `U` of all possible keys, a hash table __requires much less storage__ than a direct-address table. Specifically, we can reduce the storage requirements to __Theta(|K|)__ while we maintain the benefit that searching for an element in the hash table still requires only O(1) time. The __catch__ is that this bound is for the __average-case time__, whereas for direct addressing it holds for the _worst-case time_.

With direct addressing, an element with key k is stored in slot k. With hashing, this element is stored in slot `h(k)`, that is, we use a __hash function__ `h` to compute the slot from the key `k`. Here `h` maps the universe `U` of keys into the slots of a __hash table__ `T[0..m-1]` where the size `m` of the hash table is typically much less than `|U|`.

```
h: U -> {0, 1, ..., m-1}
```

We say that an element with key `k` __hashes__ to slot `h(k)`, we also say that `h(k)` is the __hash value__ of key `k`. The hash function reduces the range of array indices and hence the size of the array.

There is one hitch, __two keys may hash to the same slot (collision)__.

## Usage examples

For example, a compilar that translates a programming language maintains a symbol table, in which the keys of elements are arbitrary character strings corresponding to identifiers in the language.

## Alternatives

### Array indexing

When the number of keys actually stored is small relative to the total number of possible keys, hash tables become an effective alternative to directly addressing an array, since a hash table typically uses an array of size proportional to the number of keys actually stored.

Instead of using the key as an array index directly, the array index is computed from the key.

### Direct-address Tables

Direct addressing is a simple technique that works well when the universe `U` of keys is reasonably small. We shall assume that no two elements have the same key.

To represent the dynamic set, we use an array, or __direct-address table__, denoted by `T[0..,m-1]`, in which each position, or __slot__, corresponds to a key in the universe `U`. If the set contains no element with the key `k`, then `T[k] = NIL`.

Each operation takes only __O(1) time__.

```
DIRECT-ADDRESS-SEARCH(T,k)
  return T[k]

DIRECT-ADDRESS-INSERT(T,x)
  T[x.key] = x

DIRECT-ADDRESS-DELETE(T,x)
  T[x.key] = NIL
```

The __downside__ is that if the universe `U` is large, storing a table of size `|U|` may be impractical, or ecen impossible. Furthermore, the set `K` of keys actually stored may be so mall relative to `U` that most of the space allocated for `T` would be wasted.

## Hash Function

A good hash function satisfies (approximately) the assumption of simple uniform hashing: __each key is equally likely to hash to any of the `m` slots, independently of where any other key has hashed to__. Unfortunately, we typically have no way to check this condition.

In practice, we can often employ __heuristic techniques__ to create a hash function that performs well.

### Heuristics example

__Qualitative information__ about the distribution of keys may be useful in the design process. For example, consider a compiler's symbol table, in which the keys are character strings representing identifiers in a program. Closely related symbols, such as `pt` and `pts`, often occur in the same program. A good hash function would minimize the chance hat such variants hash to the same slot.

Some applications of hash functions might require stronger properties than are provided by simple uniform hashing. For example, we might want keys that are "close" imn some sense to yield hash values that are far apart.

### Division Method

The __division method__ for creating hash functions, we map a key `k` into one of `m` slots by taking the remainder of `k` divided by `m`.

```
h(k) = k mod m
```

A prime not too close to an exact power of 2 is often a good choice for `m`.

For example, if we want to allocate a hash table, with collisions resolved by chaining, to hold roughly 2000 character strings, and we wouldn't mind examining an average of 3 elements in an unsuccessful search, we can allocate a hash table of size `m = 701`, because 701 is a prime near 2000/3 but not near any power of 2, so we have `h(k) = k mod 701`.

### Multiplication Method

The __multiplication method__ for creating hash functions operates in two steps. First, we multiply the key `k` by a constant `A` in the range `0 < A < 1` and extract the fractional part of `k.A`. Then, we multiply this value by `m` and take the floor of the result.

```
h(k) = |m (k A mod 1)|
```

The value of the constant A, depends on characteristics of the data being hashed. Knuth suggests that `(sqrt(5) - 1)/2 =~ 0.6180339887...` is likely to work reasonably well.

### Universal Hashing

The only effective way to improve the situation where a fixed hash function retrieves n keys that all hash to the same slot, is to choose the hash function __randomly__ in a away that is __independent of the keys__ tha are actually going to be stored.

At the beginning of execution, we select the hash function at random from a carefully designed class of functions.

#### Designing a universal class of hash fuctions

We begin by choosing a prime number `p` large enough so that every possible key k is in the range `0` to `p-1` inclusive. Because we assume that the size of the universe of keys is greater than the number of slots in the hash table, we have `p > m`. We know define the hash function `h_ab` for any `a` integer and `b` integer, using a linear transformation followed by reductions modulo `p` and then modulo `m`.

`h_ab(k) = ((ak + b) mod p) mod m`

## Types & Collision Resolution

### Chaining

In __chaining__, we place all the elements that hash to the same slot into the same __linked list__.

Slot `j` contains a pointer to the head of the list of all stored elements that hash to `j` or `NIL`.

```
CHAINED-HASH-INSERT(T,x) // O(1) worst-case time
  insert x at the head of list T[h(x.key)]

CHAINED-HASH-SEARCH(T,k) // Theta(n) + time to hash worst-case time
  search for an element with key k in list T[h(k)]

CHAINED-HASH-DELETE(T,x)
  delete x from the list T[h(x.key)]
  // should use double linked list so that we can delete an item quickly in O(1).
```

### Open Addressing

In __open addressing__, all elements occupy the hash table itself. That is, each table entry contains either an element of the dynamic set or NIL. Thus, in open addressing, the hash tablew can _fill up_ so that no further insertions can be made. The advantage is that it avoids pointers altogether.

When __searching__ for an element, we systematically examine table slots until either we find the desired element or we have ascertained that the element is not in the table. Instead of following pointers, we _compute_ the sequence of slots to be examined. The extra memory freed by not storing pointers provides the hash table with a larger number of slots for the same amount of memory, potentially yielding fewer collisions and faster retrieval.

To perform __insertion__ using open addressing, we successively examine, or __probe__, the hash table until we find an empt slot in which to put the key. The sequence of positions probed __depends upon the key being inserted__. To determine which slots to probe, we extend the hash function to include the probe number as a second input.

```
h: U x {0, 1, ..., m-1} -> {0, 1, ..., m-1}
// Probe sequence
<h(k, 0), h(k, 1), ..., h(k, m-1)>
```

We require that for every key `k`, the __probe sequence__ be a permutation of `{0, 1, ..., m-1}`, so that every hash-table position is eventually considered as a slot for a new key as the table fills up.

```
HASH-INSERT(T,k):
  i = 0
  repeat
    j = h(k, i)
    if T[j] == NIL
      T[j] = k
      return j
    else i = i + 1
  until i == m
  error "hash table overflow"

HASH-SEARCH(T,k):
  i = 0
  repeat
    j = h(k, i)
    if T[j] == k
      return j
    i = i + 1
  until T[j] == NIL or i == m
  return NIL
```

Deletion from an open-address hash table is difficult, because when we delete a key from slot i, we cannot simply mark that slot as empty by storing NIL in it. If we did, we might be unable to retrieve any key k during whose insertion we had probed slot i and found it occupied. We can solve this problem by marking the slot, storing in it the special value DELETED instead of NIL.

#### Linear Probing

We use a hash function of the form:

```
h(k,i) = (h'(h) + i) mod m
```

#### Quadratic Probing

We use a hash function of the form:

```
h(k, i) = (h'(k) + c_1*i + c_2*i^2) mod m
```

#### Double hashing

It offers one of the best methods available for open addressing because the permutations produced have many of the characteristics of randomly chosen permutations. It uses a hash function of the form:

```
h(k,i) = (h_1(k) + i*h_2(k)) mod m
```

### Perfect Hashing

Hashing can provide excellent _worst-case_ performance when the set of keys is __static__ (once stored in the table, they never change). Some applications naturally have static sets of keys, like words in a programming language, or set of file names on a CD-ROM.

We call a hashing technique __perfect hashing__ if O(1) memory accesses are required to perform a search in the worst case.

To create a perfect hashing scheme, we use two levels of hashing, with universal hashing at each level.

The __first level__ is essentially the same as for __hashing with chaining__, we hash the `n` keys into `m` slots using a hash function `h` carefully selected from a family of universal hash functions.

Instead of making a linked list of the keys hashing to slot j, however, we use a small __secondary hash table__ `S_j` with an associated hash function `h_j`. By choosing the hash functions `h_j` carefully, we can guarantee that there are no collisions at the secondary level.

In order to guarantee so, we will need to let the size `m_j` of hash table `S_j` be the square of the number `n_j` of keys hashing to slot `j`. We can limit this, by choosing the first-level hash gfunction well, to O(n) expected total amount of space used.