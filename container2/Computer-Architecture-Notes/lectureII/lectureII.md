# Lecture II: Bitwise Operations

<br> a. [Additional Resources](#Additional-Resources)  
<br> b. [Convert Binary to Decimal](#Convert-Binary-to-Decimal)  
<br> c. [Logical Expressions](#Logical-Expressions)  
<br> d. [Bit Shifting](#Bit-Shifting)  
<br> e. [Bit Masking](#Bit-Masking)  
<br> f. [Binary Conversion](#Binary-Conversion)  
<br> g. [Q&A](#Q&A)  
<br>  


## Additional Resources

[Bitwise Operations](https://www.youtube.com/watch?v=0PNyhnIEsXE)  

[CS19 Lecture II Recording: Brady Fukumoto](https://youtu.be/dgrUvv7bDgI)  

<br>


[Conversion Methods Between Bases](https://www.robotroom.com/NumberSystems.html)  

[Endianness](https://en.wikipedia.org/wiki/Endianness)  

[Using Dispatch Tables](https://medium.com/better-programming/dispatch-tables-in-python-d37bcc443b0b)  

<br>

## Convert Binary to Decimal

Let's practice converting a binary string to a decimal string with code, to fully understand how both base systems work. We'll add the code into [lectureII.py](lectureII.py).

> str = "1010"  

In decimal, this number is 10. How do we know this?

There are four places shown in this binary string. We'll code a representation.

<br>

```
str = "1010"

def to_decimal(num_string, base):
    # Turn the string into a list of individual characters
    digit_list = list(num_string)

    # Reverse the string to look at each character in the correct order
    digit_list.reverse()

    value = 0

    for i in range(len(digit_list)):
        print(f"{int(digit_list[i])} in the {base ** i}'s place' ")
        value += int(digit_list[i]) * (base ** i)

    print(f"The final number is {value}")
```

<br>

This prints out in the terminal:

<br>

```
0 in the 1's place' 
1 in the 2's place' 
0 in the 4's place' 
1 in the 8's place'
The final number is 10 
```

<br>

This shows us how many to count by each place holder in binary (the 2's, 4's, 8's, etc). Any time the binary conversion feels confusing about how to count, this can help clarify it.

Generally when we write numbers down, regardless of base, the number with the least value goes on the right and higher value digits go left of that. We call that number on the right the least significant digit. In binary, we call it the least significant bit. And on the left is the most significant bit.

In binary, we tend to refer to the rightmost bit (least significant) as "bit 0", because it's in the 2^0 place (1s place). Left of that is "bit 1" in the 2^1 place (2s place). Then "bit 2" in the 2^2 place (4s place) and so on.

Internally, numbers are represented in all kinds of weird and different ways. But as software people, we typically don't have to think about that.

<br>
<br>

## Logical Expressions

We represent logic using different code such as the `and` in Python or `&&` in JavaScript.

A logic table can represent the logic of a statement, like this `and` table:

<br>

```

A and B

A   B   A and B 
---------------
0   0      0
0   1      0
1   0      0
1   1      1

```

<br>

A and B are only true when A _and_ B are true.

We could code this like so:

<br>

```
for A in [False, True]:
    for B in [False, True]:
        print(f"{A} - {B} --> {A and B}")
```

<br>

Which prints to show:
  
> False - False --> False  
> False - True --> False  
> True - False --> False  
> True - True --> True  

<br>

This shows the cases in which A and B is true.

<br>

There is also `or` which checks if either A or B is True. How does that differ from `xor`?

`xor` stands for `exclusive or` -- exclusively, A _or_ B must be True.

What would the truth table for `or` and `xor` look like?

<br>

```

A   B   A or B 
---------------
0   0      0
0   1      1
1   0      1
1   1      1


A   B   A xor B 
---------------
0   0      0
0   1      1
1   0      1
1   1      0
```

<br>

This means `xor` looks for exclusive _or_ true statements, not _and_. A OR B, but never A and B.

This differs from the traditional `or` statement because `or` would consider A and B as True because it only requires _at least_ one to be True (A can be true or B can be true or both can be).

`xor` accepts when _only_ one (A OR B) is true, not both.

<br>


Using binary, we can represent all kinds of data and data structures with 1's and 0's. 

What if we look at two binary numbers like an `and` truth table?

<br>

```

    0b0111  - 7
&   0b0011  - 3
-----------------
    0b0011  - 3

```

<br>

If we compare the top binary number to the bottom binary number at each digit, we can return a result of it based on `and` logic.

`0` and `0` results in `0`. `0` and `1` results in `0`. `1` and `1` results in `1`.

In this way, the result of `0b0111` _and_ `0b0011` is `0b0011` (or 3, in decimal).

In python, this is represented as `7 & 3`. We can also do a bitwise `or` operation like so: `7 | 3`:

<br>

```
    0b0111  - 7
&   0b0011  - 3
-----------------
    0b0111  - 7
```

<br>

Again, we compare digit by digit, returning the `or` result of that comparison.

7 or 3 results in 7 with a bitwise `or` operation.

<br>
<br>

## Bit Shifting

We can also do `bit shifting`, which shifts the bits.

If we wanted to shift this number to the right by 2, the process would look like this:

> 0b10100111 >> 2  
> 0b01010011 >> 1  
> 0b00101001  

 We can also bit shift to the left:

> 0b10100111 << 2  
> 0b01001110 << 1  
> 0b10011100  

This looks clear and obvious in binary, but if we did this in decimal, how would it look?

`7 << 2` becomes `28` because every time we shift _to the left_, we're multiplying it by 2 (since each place is a power of 2).

> (7 * 2) * 2 = (14) * 2 = 28  

Looking at it in binary:

> 0111 = 7 (4 + 2 + 1)  
> 1110 = 14 (8 + 4 + 2)  
> 11100 = 28 (16 + + 8 + 4)  

If we shift to the right, it's reducing the value by half (dividing by 2):

> 0111 = 7  
> 0011 = 3  
> 0000 = 0  

In base 10, it's the same, If we shift to the left in decimal, we're multiplying by 10; if we shift to the right, we divide by 10.

Remember: 

> LEFT = MULTIPLY * BASE  
> RIGHT = DIVIDE / BASE   

<br>
<br>

## Bit Masking

Bit masking uses bitwise `and` to "mask" 

<br>

```
    0b0111  - Number
&   0b1010  - Mask
-----------------
    0b0010  - Result
```

<br>

If the mask's digit is a `1`, we look up to that place on the Number and use its digit. If the mask place is a `0`, we ignore what place correlates on the Number and only use `0`.

Think of a mask as a stencil -- it covers some things up and lets us see some other things beyond it.

A mask covers a part of the original binary number, to return a new number.

What would be the result of `x = 4 & 3`? If we convert those decimal numbers into binary and compare with a bit masking:

<br>

```

    0b100  - 4
&   0b011  - 3
-----------------
    0b000  - 0

```

The result is 0.

<br>
<br>

## Binary Conversion

Looking at the project repo, let's explore the commands in the program of [cpu.py](cpu.py).

<br>

```
program = [
    # From print8.ls8
    0b10000010, # LDI R0,8
    0b00000000,
    0b00001000,
    0b01000111, # PRN R0
    0b00000000,
    0b00000001, # HLT
]
```

<br>

This works well enough -- but it's hard coded which isn't ideal.

What if we want to take in a file's contents as an argument though? This would allow us to write programs and pass them into the LS8.

We could write code for that in [lectureII.py](lectureII.py), to open the `print8.ls8` file and use it as an argument:

<br>

```

import sys

# This provides some error handling if the wrong arguments are passed when calling this file in the terminal (it expects two file names)
if len(sys.argv) != 2:
    print("usage: file.py <filename>", file=sys.stderr)
    sys.exit(1)

filepath = sys.argv[1]

# Try and except helps us handle errors safely, especially in production
try:
    with open(filepath) as f:
        for line in f:
            print(line)
except FileNotFoundError:
    print(f"{sys.argv[0]}: {sys.argv[1]} not found")
    sys.exit(2)
```

We could give our try/except different errors to handle to be as specific as we'd like.

Any time we handle user input, it should be safe for them.

Now when we input into the terminal:

> `python3 lectureII.py print8.ls8`

it prints the contents of `print8.ls8`. We want to parse the values and pass them in to the LS8 computer.

First, how do we parse these numbers?

We need to remove the comments and convert the strings into integers.

<br>

```
try:
    with open(filepath) as f:
        for line in f:
            # Split everything before and after a # to remove comments
            # Comments will be indices 1+, so we only need index 0
            comment_split = line.split("#")

            # Convert pre-comment from binary to decimal
            # Strip removes any leading or trailing white spaces
            num = comment_split[0].strip()

            # Ignore blank values
            if num == "":
                continue
            
            # Set x to the number, of base 2
            x = int(num, 2)

            print(f"{x: 08b}: {x}")
```

<br>


Now it prints out the binary value and the decimal value:

<br>

```
 10000010: 130
 0000000: 0
 0001000: 8
 1000111: 71
 0000000: 0
 0000001: 1
```

<br>

So we know that this is properly parsing and converting valid binary numbers into decimal integers.

<br>
<br>

Now let's connect the simple Beej machine made yesterday in [beejMachine.py](beejMachine.py) to read the instructions in [instructions.py](instructions.py).

<br>

```
register = [0] * 8

memory = [0] * 128 # 128 bytes of RAM

def load_memory(filename):
    try:
        address = 0

        with open(filename) as f:
            for line in f:
                # Split before and after any comment symbols
                comment_split = line.split("#")

                num = comment_split[0].strip()

                # Ignore blanks
                if num == "":
                    continue

                value = int(num)

                memory[address] = value

                address += 1

    except FileNotFoundError:
        print(f"{sys.argv[0]}: {sys.argv[1]} not found")
        sys.exit(2)


if len(sys.argv) != 2:
    print("usage: simple.py <filename>", file=sys.stderr)
    sys.exit(1)


filepath = sys.argv[1]
load_memory(filepath)
```

<br>

We've replaced the previously hard coded memory with the ability to open a file, read it and parse out the instructions.

When we put into the terminal `python3 beejMachine.py instructions.py`, now it prints out:

<br>

```
Beej!
Beej!
Beej!
48
Beej!
```

Tonight we will apply this type of code to our LS8 machine to un-hard code it.

<br>
<br>

## Q&A

Why was the RAM limit 256?

The LS8 can only read up to 8 bits -- so a binary number that is 8 digits long, making the max number we can store: 11111111

> 11111111 = 255 in decimal

Our physical constraints on this computer limits the RAM.

For building the LS8, you'll need two lists:

1. a list of 256 elements to hold values in RAM (you have 256 bytes of RAM)
2. a list of 8 elements to hold values in registers (you have 8 registers)

Registers are like scratch spaces that read and write very quickly.

<br>

Beej offers this insight into what the IR is:

```
Re the IR, the IR (instruction register) is an internal register that temporarily holds a copy of the currently-executing instruction. It's a copy of the thing at the address in RAM held in the PC. It's what you look at to decide what to actually do. ("Is this a PRN? Then do this. Is this an LDI? Then do that.")

When I coded it,  ir was just a local variable in my main loop
```

In today's example, the IR is the same as the `command`: command = memory[pc]



<br>
<br>
