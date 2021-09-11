## Input Processing

Constraints: Input will be read character by character and must process each character before reading the next character. Will not store characters in a data structure.

## Luhn Checksum Validation

Used for validating identification numbers.

Using the original number, double the value of every other digit. Then add the values of the individual digits together. If a doubled value now has two digits, add individually. The identification number is valid if the sum is divisible by 10.

Write a program that takes an identification number of arbitrary length and determines whether the number is valid under the Luhn formula. Must process each character before reading the next one.

### Break Down the Problem

List of issues:

1. Knowing which digits to double
2. Treating doubled numbers greater than 10 according to their individual digits
3. Knowing we've reached the end of the number
4. Readcing each digit separately.

### Tackling the Doubled Digits, 10+

What are the ranges of possible values? If you start from 0-9 and double, the max value is 18. That means if the doubled value is 10 or greater, it has to be in the range of 10 to 18, which means that the first digit is always 1.

```
int digit;
cout << "Enter a single digit number, 0-9: ";
cin >> digit;
int doubleDigit = digit * 2;
int sum;
if (doubleDigit >= 10) sum = 1 + doubleDigit % 10;
else sum = doubleDigit;
cout << "Sum of digits in doubled number: " << sum << "\n";
```

Transformed into a function:

```
int doubleDigitValue(int digit) {
    int doubleDigit = digit * 2;
    int sum;
    if (doubleDigit >= 10) sum = 1 + doubleDigit % 10;
    else sum = doubleDigit;
    return sum;
}
```

### Next up: How to read the number properly

If we read as a numeric type, we'd get one long number and have a lot of work on our hands. We need to ensure that we can read a character representing a digit and turn it into an integer type we can perform mathematical operations on.

### If we took character value and used it as an integer expression directly:

```
char digit;
cout << "Enter a one-digit number: ";
digit = cin.get();
int sum = digit;
cout << "Is the sum of the digits " << sum << "? \n";
```

Possible output:

```
Enter a one-digit number: 7
Is the sum of the digits 55?
```

This is because 7 has an ASCII value of 55.

### Convert Character Digit to Integer

Write a program that reads a character from the user representing a digit, 0 through 9. Convert the character to the equivalent integer in the range 0-9, then output the integer to demonstrate the result.

Like earlier when we checked the difference between original values and desired values, this is an analogous problem. There is a difference of 48 between original value and desired value. 48 is the character code in ASCII of 0, so we can use that to perform subtraction.

```
char digit;
cout << "Enter a one-digit number: ";
cin >> digit;
int sum = digit - '0';
cout << "Is the sum of digits " << sum << "? \n";
```

### ---

Now we can move on to see what digits to double. This may take several steps to figure out, so a good chance to practice reducing. WHat if we initially limited ourselves to fixed-length numbers? That would confirm our understanding of the gheneral formula while making progress toward the ultimate goal.

## Problem: Luhn Checksum Validation: Fixed-Length

Write a program that takes an identification number (including its check digit) of length six and determines whether the number is valid under the Luhn fomula. The program must process each character before reading the next one.

### ---

As before, we can reduce even farther to make getting started as easy as possible. What if we changed the formula so that none of the digits is doubled?

## Problem: Simple Checksum Validation, Fixed-Length

Write a program that takews an identification number (including its check digit) of length six and determines whether the number is valid under a simple formula where the values of each digit are summed and the result is checked to see whether it is divisible by 10. The program must process each character before reading the next one.

```
#include <iostream>
#include <stdlib.h>
using std::cin;
using std::cout;

int doubleDigitValue(int digit){
  int doubleDigit = digit * 2;
  int sum;
 if (doubleDigit >= 10) sum = 1 + doubleDigit % 10;
 else sum = doubleDigit;
 return sum;
}
int main() {
 char digit;
 int checksum = 0;
 cout << "Enter a six-digit number: ";
 for (int position = 1; position <= 6; position++) {
   cin >> digit;
   checksum += digit - '0';
 }
 cout << "Checksum is " << checksum << ". \n";
 if (checksum % 10 == 0) {
   cout << "Checksum is divisible by 10.  Valid \n";
 } else {
   cout << "Checksum is not divisible by 10.  Invalid \n";
 }
}
```

### ---

Now we need to add the logic for the Luhn validation formula (doubling every other digit from the right). Since we're currently only working with six-digit numbers, we need to double the digits in position one, position three, and position five counting from the left. In other words, double if position is odd. We can use the modulo operator because even numbers would be divisible by 2 with no remainder. So if position % 2 is 1, we know that the position is odd and the digit should be doubled. Note that means both doubling and summing the digits of the doubled number if it's 10 or greater. Now if we need to double, we can send the digit to the previously defined function and use the result.

```
int main() {
 char digit;
 int checksum = 0;
 cout << "Enter a six-digit number: ";
 for (int position = 1; position <= 6; position++) {
   cin >> digit;
   if (position % 2 == 0) checksum += digit - '0';
   else checksum += doubleDigitValue(digit - '0');
 }
 cout << "Checksum is " << checksum << ". \n";
 if (checksum % 10 == 0) {
   cout << "Checksum is divisible by 10.  Valid \n";
 } else {
   cout << "Checksum is not divisible by 10.  Invalid \n";
 }
}
```

### ---

To ultimately solve this problem, we need to divide and conquer. Suppose you were asked to modify the code to work with 10 or 16 digits -> you'd change the 6 to another upper bound. But validating a 7-digit number would require a modification because the number of digits is odd and we're doubling every digit starting from the second on the right, the first digit on the left is no longer doubled. In that case, even positions would need to be doubled.

First issue -> how do you tell when you've reached the end of the number? Character read after the last digit varies based on operating system.

Experiment:

```
cout << "Enter a number: ";
char digit;
while (true) {
    digit = cin.get();
    cout << int(digit) << " ";
}
```

Typing 17 into the prompt returned 49 55 10 - 49 is ASCII for 1, 55 is ASCII for 7, which means that 10 is the value we're looking for to indicate the end of a number.

```
char digit;
int checksum = 0;
int position = 1;
cout << "Enter a number with an even number of digits: ";
digit = cin.get();
while (digit != 10) {
    if (position % 2 == 0) checksum += digit - '0';
    else checksum += doubleDigitValue(digit - '0');
    digit = cin.get();
    position ++;
}
cout << "Checksum is " << checksum << ". \n";
if (checksum % 10 == 0) {
    cout << "Checksum is divisible by 10.  Valid. \n";
} else {
    cout << "Checksum is not divisible by 10.  Invalid. \n";
}
```

Position is no longer the control variable in a for loop, so needs to be initialized and incremented separately. Loop is controlled by a conditional that checks for the character code that signals the end of the line. Because we have to have a value to check the first time we go through the loop, we have to read the first value before the loop starts and then read every other value inside the loop.

## Problem: Positive or Negative

Write a program that reads 10 integers from the user. After all the numbers have been entered, the user may ask to display the count of positive numbers or the count of negative numbers.

```
int number;
int positiveCount = 0;
int negativeCount = 0;
cout << "Enter 10 integers: ";
for (int i = 1; i <= 10; i++) {
    cin >> number;
    if (number > 0) positiveCount++;
    if (number < 0) negativeCount++;
}
char response;
count << "Do you want the (p)ositive or (n)egative count? ";
cin >> response;
if (response == 'p')
    cout << "Positive count is " << positiveCount << "\n";
if (response == 'n')
    cout << "Negative count is " << negativeCount << "\n";
```

Keep track of running checksum both ways -- as if the ID is an odd length and as if the ID is an even length. When we get to the end of the number, we can return the appropriate checksum.

## Putting the Pieces Together

```
char digit;
int oddLengthChecksum = 0;
int evenLengthChecksum = 0;
int position = 1;
cout << "Enter a number: ";
digit = cin.get();
while (digit != 10) {
    if (position % 2 == 0) {
        oddLengthChecksum += doubleDigitValue(digit - '0');
        evenLengthChecksum += digit - '0';
    } else {
        oddLengthChecksum += digit - '0';
        evenLengthChecksum += doubleDigitValue(digit - '0');
    }
    digit = cin.get();
    position++;
}
int checksum;
if ((position - 1) % 2 == 0) checksum = evenLengthChecksum;
else checksum = oddLengthChecksum;
cout << "Checksum is " << checksum << ". \n";
if (checksum % 10 == 0) {
    cout << "Checksum is divisible by 10.  Valid. \n";
} else {
    cout << "Checksum is not divisible by 10.  Invalid. \n";
}
```

Could have used (position % 2 == 1) but it's more confusing to read - better to say "if position - 1 is even, use the even checksum" than it is to say "If position is odd, use the even checksum".

It is always better to take more steps than to try to do too much at once, even if some steps seem trivial.
