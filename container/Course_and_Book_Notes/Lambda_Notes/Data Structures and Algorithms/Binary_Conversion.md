### Convert between and understand decimal, binary, and hexadecimal.

- We've all heard that computers use binary 1s and 0s deep down, but what does that actually mean?
- The objective is to learn how to write down numbers in different bases (binary, decimal, hexadecimal) and how to convert between numbers in these bases both by hand and in C.

### Numbers and Values

Values exist regardless of how we write them down.
There are 12 apples here:

- 12 apples (decimal)
- 1100 apples (binary)
- C apples (hexadecimal)
- The number of apples is the same -- we're just writing it in different bases (like different languages).

### Number Bases

The number base refers to how many individual digits that number system has.

#### Decimal

Has 10 digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) so it is base 10

#### Binary

Has 2 digits (0, 1) so it is base 2. A binary digit is called a bit for short.

#### Hexadecimal

Has 16 digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F) so it is base 16.
Hexadecimal is often called "hex" for short.

#### Octal

Has 8 digits (0, 1, 2, 3, 4, 5, 6, 7) so it is base 8. (Not frequently used).

### Terminology:

#### Byte:

8 bits. Max value: 255 decimal, FF hex. Min value 0

#### Nibble:

4 bits. Max value: 15 decimal, F hex. Min value 0.

#### Octet:

Synonym for byte.

#### Decimal:

A base-10 numbering system, the one you already know.

#### Hexadecimal:

A base-16 numbering system.

#### Binary:

A base-2 numbering system.

#### Octal:

A rarely-used base-8 numbering system.

### The Octal Trap:

Even though octal (base 8) is rarely used, you can specify octal numbers in many languages with a leading zero:

int x = 12 // decimal
int y = 012 // Octal, decimal value 10
Dont' pad decimal numbers with leading zeros!

---

### Conversions:

```
+--------128s place
|+-------64s place
||+------32s place
|||+-----16s place
||||+----8s place
|||||+---4s place
||||||+--2s place
|||||||+-1s place
||||||||
01010110

64 + 16 + 4 + 2 = 86 decimal == 1010110 binary
```

```
1111
8 + 4 + 2 + 1 = 15 decimal == 1111 binary
```

#### Decimal to binary:

```
67 decimal
1000011 binary == 67 decimal
```

```
33 decimal
100001 binary == 33 decimal
```

---

Base 2 binary

```
0 - zero decimal
1 - one decimal
10 - two decimal
11 - three decimal
100 - four decimal
```

#### Hexadecimal conversion:

Any number under 10 is same in decimal and hexadecimal

Split up into nibbles:

```
10100011
1010 0011
10 3
A 3
A3 == 10100011
```

C7 hex is what binary?

```
C
12 decimal
1100 binary

7 decimal
0111 binary

C7 hex == 11000111 binary
```

Hex to decimal and decimal to hex, more mental gymnastics - might want to convert to binary as intermediate form and use that instead. Or more practically speaking, use the computer to do the calculation.

Conversions in C!

```
  int main(void)
  {
      int x = 100; // value is 100 decimal
      int h = 0x100; // value is 256 decimal
      int b = 0b100; // value is 4 decimal

      int y = 0x47F; //

      if (b == 4) {
          // TRUE !
      }

      return 0;
  }
```

Number only really matters when you write it down - value is going to be how math is done.

```
  #include <stdio.h>
  #include <stdlib.h>

  int main(void)
  {
      int x = 0b11000101; // binary

      printf("%d decimal\n", x);
      printf("%x hex \n", x); // lowercase letter
      // c5
      printf("%X hex\n", x); // uppercase letter
      // C5
      return 0;
  }
```

```
  #include <stdio.h>
  #include <stdlib.h>

  int main(void)
  {
      int y = 255;

      printf("%X\n", y); // FF
      return 0;
  }
```

```
  #include <stdio.h>
  #include <stdlib.h>

  int main(void)
  {
      int y = 255;
      char s[20];

      sprintf(s, "%X", y); // prints 255 as a hex as a string
      printf("%s\n", s);

      return 0;
  }
```

No way to convert binary to string and print it out

```
  #include <stdio.h>
  #include <stdlib.h>

  int main(void)
  {
      char *s = "110011"; // binary
      long v = strtol(s, NULL, 2);
      // string you want to convert, error handling,  base

      printf("%ld\n", v);

      char *s2 = "F8"; // hex
      long v2 = strtol(s2, NULL, 16); // hex is base 16

      printf("%ld\n", v2);
  }
```

Challenge:

- Count to 0x20 in hexadecimal
- What is 0x2F in binary?
- What is 0b11011 in decimal?
- What is 0b11100111 in hex?
- What is 27 in binary?
- Write a program that outputs a value in binary (hint: >> and &);
