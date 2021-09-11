## Problem: Decode a Message

A message has been encoded as a text stream that is to be read character by character. The stream contains a series of comma-delimited integers, each a positive number capable of being represented by a C++ int. However, the character represented by a particular integer depends on the current decoding mode. There are three modes: uppercase, lowercase, and punctuation.

In uppercase mode, each integer represents an uppercase letter: The integer modulo 27 indicates the letter of the alphabet (where 1 = A and so on). So an input value of 143 in uppercase mode would yield the letter H because 143 module 27 is 8 and H is the eighth letter in the alphabet.

The lowercase mode works the same but with lowercase letters; the remainder of dividing the integer by 27 represents the lowercase letter (1 = a and so on). So an input value of 56 in lowercase mode would yield b because 56 modulo 27 is 2 and b is the second letter of the alphabet.

In punctuation mode, the integer is instead considered modulo 9, with the interpretation given by Table 2-3 below. So 19 would yield an exclamation point because 19 modulo 9 is 1.

At the beginning of each message, the decoding mode is uppercase ltters. Each time the modulo operation (by 27 or 9 depending on mode) results in 0, the decoding mode switches. If the current mode is uppercase, the mode switches to lowercase letters. If the current mode is lowercase, the mode switches to punctuation, and if the current mode is punctuation, it switches back to uppercase.

#### Table 2-3: Punctuation Decoding Mode

| Number | Symbol  |
| ------ | ------- |
| 1      | !       |
| 2      | ?       |
| 3      | ,       |
| 4      | .       |
| 5      | (space) |
| 6      | ;       |
| 7      | "       |
| 8      | '       |

#### My Notes on Problem - Restate Problem with Constraints

1. Read a text stream character by character
2. Characters are separated by commas
3. Program starts in Uppercase decode mode
4. Start decoding characters by performing modulo 27 and using corresponding letter - 1 = A, etc.
5. If integer modulo 27 == 0, switch to Lowercase decode mode
6. Continue processing characters using modulo 27, though now letters are in lowercase
7. If modulo 27 == 0, switch to Punctuation decode mode
8. Continue decoding, but now perform modulo 9 and consult Table 2-3 to find the punctuation mark the character represents
9. If int modulo 9 == 0, switch decode mode to Uppercase
10. Repeat until out of characters to decode (end of line)

#### Notes from Book:

1. Read character by character until you reach the end of the line
2. Convert a series of characters representing a number to an integer
3. Convert an integer 1-26 to an uppercase character
4. Convert an integer 1-26 to a lowercase character
5. Convert an integer 1-8 into a punctuation symbol based on Table 2-3.
6. Tracking a decoding mode

#### Example of the process

Original input: 18, 12312, 171, 763, 98423, 1208, 216, 11, 500, 18, 241, 0, 32, 20620, 27, 10

| (a)   | (b) | (c) | (d) | (e) | (f) |
| ----- | --- | --- | --- | --- | --- |
| 18    | (U) | 27  | 18  | R   |     |
| 12312 | (U) | 27  | 0   | →   | (L) |
| 171   | (L) | 27  | 6   | i   |     |
| 763   | (L) | 27  | 7   | g   |     |
| 98423 | (L) | 27  | 8   | h   |     |
| 1208  | (L) | 27  | 20  | t   |     |
| 216   | (L) | 27  | 0   | →   | (P) |
| 11    | (P) | 9   | 2   | ?   |     |
| 500   | (P) | 9   | 5   |     |     |
| 18    | (P) | 9   | 0   | →   | (U) |
| 241   | (U) | 27  | 25  | Y   |     |
| 0     | (U) | 27  | 0   | →   | (L) |
| 32    | (L) | 27  | 5   | e   |     |
| 20620 | (L) | 27  | 19  | s   |     |
| 27    | (L) | 27  | 0   |     |     |
| 10    | (P) | 9   | 1   | !   |     |

a) Current number in the input

b) Current mode

c) Divisor for the current mode

d) Remainder

e) Decoded character or arrow pointing to new mode

f) Mode switching to

We already know how to read character by character until we reach the end of the line because we did that with the Luhn Checksum problem - reading character by character until we come across the ASCII value for end-of-line (10).

### Convert a series of characters representing a number to an integer

We know how to convert 0-9, but how do we extend that to apply to multidigit numbers?

Consider a two-diigit numbr. In a two-digit number, the first digit is the tens digit so you can multiply by 10 and then add that to the second digit (ones place).

Example: 35 would be integers 3 and 5 and overall integer would be computed by 3 \* 10 + 5

```
cout << "Enter a two-digit number: ";
char digitChar1 = cin.get();
char digitChar2 = cin.get();
int digit1 = digitChar1 - '0';
int digit2 = digitChar2 - '0';
int overallNumber = digit1 * 10 + digit2;
cout << "That number as an integer: " << overallNumber << "\n";
```

While the above code works, it won't be very useful in extending past two-digit numbers because we would exponentially increase the number of variables necessary to accomplish the task. We need to reduce:

```
cout << "Enter a two-digit number: ";
char digitChar = cin.get();
int overallNumber = (digitChar - '0') * 10;
digitChar = cin.get();
overallNumber += (digitChar - '0');
cout << "That number as an integer: " << overallNumber << "\n";
```

How do we know which multiplier to use for each digit before adding to the running total?

### Problem: Reading a Number with 3 or 4 Digits:

Write a program to read a number character by character and convert it to an integer, using just one char variable and one int variable. The number will have either 3 or 4 digits.

### Problem: Reading a Number with 3 or 4 Digits, Further Simplified:

Write a program to read a number character by character and convert it to an integer, using just one char variable and two int variables. The number will have either 3 or 4 digits.

```
cout << "Enter a three-digit or four-digit number: ";
char digitChar = cin.get();
int threeDigitNum = (digitChar - '0') * 100;
int fourDigitNum = (digitChar - '0') * 1000;
digitChar = cin.get();
threeDigitNum += (digitChar - '0') * 10;
fourDigitNum += (digitChar - '0') * 100;
digitChar = cin.get();
threeDigitNum += (digitChar - '0');
fourDigitNum += (digitChar - '0') * 10;
digitChar = cin.get();
if (digitChar == 10) {
    cout << "Number entered: " << threeDigitNum << "\n";
} else {
    fourDigitNum += (digitChar - '0');
    cout << "Number entered: " << fourDigitNum << "\n";
}
```

In general, since the multiplers for fourDigitNum are 10 times those of threeDigitNum, the former would always be 10 times the latter.

```
cout << "Enter a three-digit or four-digit number: ";
char digitChar = cin.get();
int number = (digitChar - '0') * 100;
digitChar = cin.get();
number += (digitChar - '0') * 10;
digitChar = cin.get();
number += (digitChar - '0');
digitChar = cin.get();
if (digitChar == 10) {
    cout << "Number entered: " << number << "\n";
} else {
    number = number * 10 + (digitChar - '0');
    cout << "Number entered: " << number << "\n";
}
```

Now we have an exploitable pattern.

To extend to use 5-digit values, you would repeat the process for reading the fourth character instead of displaying the result immediately -> Read the 5th character, check to see if it's an end-of-line. If so, display previous computed number. If not, multiply the computed number by 10 and add the current character to it.

```
cout << "Enter a number with three, four, or five digits: ";
char digitChar = cin.get();
int number = (digitChar - '0') * 100;
digitChar = cin.get();
number += (digitChar - '0') * 10;
digitChar = cin.get();
number += (digitChar - '0');
digitChar = cin.get();
if (digitChar == 10) {
    cout << "Number entered: " << number << "\n";
} else {
    number = number * 10 + (digitChar - '0');
    digitChar = cin.get();
    if (digitChar == 10) {
        cout << "Number enetered: " << number << "\n";
    } else {
        number = number * 10 + (digitChar - '0');
        cout << "Number entered: " << number << "\n";
    }
}
```

Pattern: if the next value is a digit, multiply the running total by 10 before adding the integer digit value of the character.

```
cout << "Enter a number with as many digits as you please: ";
char digitChar = cin.get();
int number = (digitChar - '0');
digitChar = cin.get();
while (digitChar != 10) {
    number = number * 10 + (digitChar - '0');
    digitChar = cin.get();
}
cout << "Number entered: " << number << "\n";
```

##### Explanation (Given input: 12356)

```
Outside while loop:
First pass:         number = (digitChar - '0')
                    digitChar - '0' = 1
                    number = 1

Inside while loop:
Second pass:        number = number * 10 + (digit - '0')
                    digitChar - '0' = 2
                    number = 12 (1 * 10 + 2)

Third pass:         number = number * 10 + (digit - '0')
                    digitChar - '0' = 3
                    number = 123 (12 * 10 + 3)

Fourth pass:        number = number * 10 + (digit - '0')
                    digitChar - '0' = 5
                    number = 1235 (123 * 10 + 5)

Fifth pass:         number = number * 10 + (digit - '0')
                    digitChar - '0' = 6
                    number = 12356 (1235 * 10 + 6)
```

This handles the conversion of one series of characters, but the main problem is going to be working with a list of comma-separated characters.

For 101, 22[EOL] (end of line), we would need to check for either a comma or the end of the line, then place code that processes one number inside a larger loop that continues until all values are read. The inner loop should stop for EOL and commas. The outer loop should only stop for EOL.

```
cout << "Enter a number: ";
char digitChar;
do {
    digitChar = cin.get();
    int number = (digitChar - '0');
    digitChar = cin.get();
    while ((digitChar != 10) && (digitChar != ',')) {
        number = number * 10 + (digitChar - '0');
        digitChar = cin.get();
    }
    cout << "Number entered: " << number << "\n";
} while (digitChar != 10);
```

Note: Remember not to include spaces when entering values.

#### Now we can focus on processing individual numbers!

Converting a number 1-26 to a letter A-Z. This is like the opposite of what we did to get the individual digit characters to their integer equivalents. If we subtract the character code '0' to translate from 0-9 character range to 0-9 integer range, we should be able to add a character code to translate from 1-26 to A-Z. What if we add 'A'?

```
cout << "Enter a number 1-26: ";
int number;
cin >> number;
char outputCharacter;
outputCharacter = number + 'A';
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

This results in an off-by-one error - namely, 1 gives you B, 2 gives you C, etc. So what you really need is number + 'A' - 1;

#### Convert 1-26 to A-Z:

```
cout << "Enter a number 1-26: ";
int number;
cin >> number;
char outputCharacter;
outputCharacter = number + 'A' - 1;
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

#### Convert 1-26 to a-z:

```
cout << "Enter a number 1-26: ";
int number;
cin >> number;
char outputCharacter;
outputCharacter = number + 'a' - 1;
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

#### Punctuation

Punctuation is harder because it's not in ASCII order and so can't be translated dynamically. Instead, a brute force method is required:

```
cout << "Enter a number 1-8: ";
int number;
cin >> number;
char outputCharacter;
switch (number) {
    case 1: outputCharacter = '!'; break;
    case 2: outputCharacter = '?'; break;
    case 3: outputCharacter = ','; break;
    case 4: outputCharacter = '.'; break;
    case 5: outputCharacter = ' '; break;
    case 6: outputCharacter = ';'; break;
    case 7: outputCharacter = '"'; break;
    case 8: outputCharacter = '\''; break;
}
cout << "Equivalent symbol: " << outputCharacter << "\n";
```

#### Switching Modes

We need a variable to store the current mode. It could be an integer, but it's more readable as an enumeration. Rule of thumb: If a variable is only tracking state and there is no inherent meaning to any particular value, an enumeration is a good idea. Enum allows us to know what the mode is without having to decode it (as we would have to if it were an arbitrary value to represent each mode).

```
enum modeType {UPPERCASE, LOWERCASE, PUNCTUATION};
int number;
modeType mode = UPPERCASE;
cout << "Enter some numbers ending with -1. ";
do {
    cin >> number;
    cout << "Number read: " << number;
    switch (mode) {
        case UPPERCASE:
            number = number % 27;
            cout << ". Modulo 27." << number << ". ";
            if (number == 0) {
                cout << "Switch to Lowercase";
                mode = LOWERCASE;
            }
            break;
        case LOWERCASE:
            number = number % 27;
            cout << ". Modulo 27 " << number << ". ";
            if (number == 0) {
                cout << "Switch to Punctuation";
                mode = PUNCTUATION;
            }
            break;
        case PUNCTUATION:
            number = number % 9;
            cout << ". Modulo 9: " << number << ". ";
            if (number == 0) {
                cout << "Switch to Uppercase.";
                mode = UPPERCASE;
            }
            break;
    }
    cout << "\n";
} while (number != -1);
```

### Putting it all Together

```
char outputCharacter;
enum modeType {UPPERCASE, LOWERCASE, PUNCTUATION};
modeType mode = UPPERCASE;
char digitChar;
cout << "Enter numbers to decode: ";
do {
    digitChar = cin.get();
    int number = (digitChar - '0');
    digitChar = cin.get();
    while ((digitChar != 10) && (digitChar != ',')) {
        number = number * 10 + (digitChar - '0');
        digitChar = cin.get();
    }
    switch(mode) {
        case UPPERCASE:
            number = number % 27;
            outputCharacter = number + 'A' - 1;
            if (number == 0) {
                mode = LOWERCASE;
                continue;
            }
            break;
        case LOWERCASE:
            number = number % 27;
            outputCharacter = number + 'a' - 1;
            if (number == 0) {
                mode = PUNCTUATION;
                continue;
            }
            break;
        case PUNCTUATION:
            number = number % 9;
            switch (number) {
                case 1: outputCharacter = '!'; break;
                case 2: outputCharacter = '?'; break;
                case 3: outputCharacter = ','; break;
                case 4: outputCharacter = '.'; break;
                case 5: outputCharacter = ' '; break;
                case 6: outputCharacter = ';'; break;
                case 7: outputCharacter = '"'; break;
                case 8: outputCharacter = '\''; break;
            }
            if (number == 0) {
                mode = UPPERCASE;
                continue;
            }
            break;
    }
    cout << outputCharacter;
} while (digitChar != 10);
cout << "\n";
```
