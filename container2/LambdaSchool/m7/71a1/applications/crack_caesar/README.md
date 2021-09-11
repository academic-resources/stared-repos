# Cracking a Caesar Cipher

You're going to use _frequency analysis_ to crack a Caesar cipher to
recover the key and the plaintext.

## Caesar Ciphers

These are methods of encryption where you take the _plaintext_ (the
unencrypted text) and encrypt it by substituting one letter for another
to produce the _ciphertext_ (the encrypted text).

For example, we might have the following mapping (which is the _key_ for
unlocking this cipher, not to be confused with a hash table key):

```
A -> H   B -> Z   C -> Y   D -> W   E -> O
F -> R   G -> J   H -> D   I -> P   J -> T
K -> I   L -> G   M -> L   N -> C   O -> E
P -> X   Q -> K   R -> U   S -> N   T -> F
U -> A   V -> M   W -> B   X -> Q   Y -> V
Z -> S
```

So if you have plaintext like `HELLO, WORLD!`, use the above table and
`H` becomes `D`, `E` becomes `O`, and so on to produce ciphertext
`DOGGE, BEUGW!`

To decode, just do the reverse, `D` becomes `H`, etc.

But what if you evesdrop on some ciphertext, but don't know the key (the
mapping). How can you decode it?

## Frequency Analysis

Turns out, letters occur in the English language with a known frequency.
The letter `A` is 8.46% of all letters, for example.

(Disclaimer: these are not the actual frequencies in general english
prose. They're contrived for this specific challenge so that you get a
decent result, but they're quite close to the real percentages.)

| Letter | Percentage |
|:------:|-----------:|
|   E    |    11.53   |
|   T    |     9.75   |
|   A    |     8.46   |
|   O    |     8.08   |
|   H    |     7.71   |
|   N    |     6.73   |
|   R    |     6.29   |
|   I    |     5.84   |
|   S    |     5.56   |
|   D    |     4.74   |
|   L    |     3.92   |
|   W    |     3.08   |
|   U    |     2.59   |
|   G    |     2.48   |
|   F    |     2.42   |
|   B    |     2.19   |
|   M    |     2.18   |
|   Y    |     2.02   |
|   C    |     1.58   |
|   P    |     1.08   |
|   K    |     0.84   |
|   V    |     0.59   |
|   Q    |     0.17   |
|   J    |     0.07   |
|   X    |     0.07   |
|   Z    |     0.03   |

In other words, ordered from most frequently used to least, the letters
are:

```
'E', 'T', 'A', 'O', 'H', 'N', 'R', 'I', 'S', 'D', 'L', 'W', 'U',
'G', 'F', 'B', 'M', 'Y', 'C', 'P', 'K', 'V', 'Q', 'J', 'X', 'Z'
```

`E` is the most frequent letter. `Z` is the least frequent. And `M` is
somewhere in the middle.

So if you have a large enough block of ciphertext, you can analyze the
frequency of letters in there. And if `X` is the most frequent, then
it's a safe bet that the key includes this mapping:

```
E -> X
```

## Challenge

Write a program that automatically finds the key for the ciphertext in
the file [`ciphertext.txt`](ciphertext.txt), then decodes it and shows
the plaintext.

(All non-letters should pass through the decoding as-is, i.e. spaces and
punctuation should be preserved. The input will not contain any
lowercase letters.)

No tests are provided for this one, but the result should be readable,
with at most a handful of incorrect letters.