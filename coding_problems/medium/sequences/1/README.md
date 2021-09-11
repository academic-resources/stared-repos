
Given an `initial` sequence of characters, you are allowed to create new subsequences by deleting one or more characters from it (no deletions is also considered a subsequence). You must concat those subsequences to form the goal sequence.

Return the minimum number of subsequences needed to form goal, or -1 if there is no possible concatentaion to do so.

```
xyz
yzyxy
Output: 3
```

```
abc
abdca
Output: -1
```

```
ab
abcab
Output: 2
```
