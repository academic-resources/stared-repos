## Problem: Half of a Square

Write a program that uses only two output statements, cout << "#" and cout << "\n" to produce a pattern of hash symbols shaped like half of a perfect 5x5 square (or a right triangle)

```
#####
####
###
##
#
```

```
#include <iostream>
using std::cin;
using std::cout;

int main() {
  for (int j = 6; j > 0; j--) {
    for (int i = j-1; i > 0; i--) {
    std::cout << "#";
    }
    std::cout << "\n";
  }
}
```

## Reducing the Problem

### Problem: A Square (Half of a Square Reduction):

Write a problem theat uses only two output statements, cout << "#" and cout << "\n", to produce a pattern of hash symbols like a perfect 5x5 square:

```
#####
#####
#####
#####
#####
```

```
#include <iostream>
using std::cin;
using std::cout;

int main() {
  for (int col = 1 ; col <= 5; col++) {
    for (int row = 1; row <= 5; row++) {
    std::cout << "#";
    }
    std::cout << "\n";
  }
}
```

### Problem: A Line (Half of a Square - Further Reduction)

Write a program that ueses only two output statements, cout << "@" and cout "\n" to produce a line of five symbols.

```
#include <iostream>
using std::cin;
using std::cout;

int main() {
    for (int row = 1; row <= 5; row++) {
    std::cout << "#";
    }
    std::cout << "\n";
}
```

### Problem: Count Down By Counting Up

Write a line of code that goes in the desginated position in the loop in the listing below. The program redisplays the numbers 5 through 1, in that order, with each number on a separate line.

```
#include <iostream>
using std::cin;
using std::cout;

int main() {
    for (int row = 1; row <= 5; row++) {
    std::cout << 6 - row << "\n";
    }
}
```

```
for (int row = 1; row <= 5; row++) {
    for (int hashNum = 1; hashNum <= 6 - row; hashNum++) {
        cout << "#";
    }
    cout << "\n";
}
```

### Problem: A Sideways Triangle

Write a program that uses only two output statements, cout << "#" and cout << "\n" to produce a pattern of hash symbols shaped like a sideways triangle:

```
#

##

###

####

#####

####

###

##

#
```

### Steps:

```
#include <iostream>
using std::cin;
using std::cout;

int main() {
    for (int j = 6; j > 0; j--) {
        for (int i = j-1; i < 5; i++) {
            std::cout << "#";
        }
        std::cout << "\n";
    }
    for (int j = 6; j > 0; j--) {
        for (int i = j-1; i > 0; i--) {
            std::cout << "#";
        }
        std::cout << "\n";
    }
}
```

## List of skills and techniques from Half a Square that can be applied to the problem:

- Display a row of symbols of a particular length using a loop
- Display a series of rows using nested loops
- Create a varying number of symbols on each row using an algebraic expression instead of a fixed value
- Discover the correct algebraic expression through experimentation and analysis

| 8 - row | 4 - row | abs(4 - row) | 4 - abs(4 - row) |
| ------- | ------- | ------------ | ---------------- |
| 7       | 3       | 3            | 1                |
| 6       | 2       | 2            | 2                |
| 5       | 1       | 1            | 3                |
| 4       | 0       | 0            | 4                |
| 3       | -1      | 1            | 3                |
| 2       | -2      | 2            | 2                |
| 1       | -3      | 3            | 1                |

```
#include <iostream>
#include <stdlib.h>
using std::cin;
using std::cout;


int main() {
  for (int row = 1; row <= 7; row++) {
    for (int hashNum = 1; hashNum <= 4 - abs(4 - row); hashNum++) {
        cout << "#";
    }
    cout << "\n";
    }
}
```
