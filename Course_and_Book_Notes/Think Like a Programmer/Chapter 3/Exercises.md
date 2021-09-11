## 3-1

Are you disappointed we didn't do more sorting? I'm here to help. To make sure you are comfortable with qsort, write code that uses the function to sort an array of our _student_ struct. First have it sort by grade, and then try it again using the student ID.

## 3-2

Rewrite the code that finds the agent with the best monthly sales average so that it finds the agent with the highest median sales. As stated earlier, the median of a set of values is the "one in the middle" such that half of the other values are higher and half of the other values are lower. If there is an even number of values, the median is the simple average of the two values in the middle. For example, in the set 10, 6, 2, 14, 7, 9, the values in the middle are 7 and 9. The average of 7 and 9 is 8, so 8 is the median.

## 3-3

Write a bool function that is passed an array and the number of elements in that array and determine whether the data in the array is sorted. This should require only one pass!

## 3-4

Here's a variation on the array of const values. Write a program for creating a substitution cipher problem. In a substitution cipher problem, all messages are made of uppercae letters and punctuation. The original message is called the plaintext and you create the ciphertext by substituting each letter with another letter (for example, C would become an X). For this poroblem, hard-code a const array of 26 char elements for the cipher and have your program read a plaintext message and output the equivalent ciphertext.

## 3-5

Have the previous program convert the ciphertext back to the plaintext to verify the encoding and decoding

## 3-6

To make the ciphertext problem even more challenging, have your program randomly generate the cipher array instead of a hard-coded const array. Effectively, this means placing a random character in each element of the array, but remember that you can't substitute a letter for itself. So the first element can't be A. And you can't use the same letter for two substitutions - that is, if the first element is S, no other element can be S.

## 3-7

Write a program that is given an array of integers and determines the mode, which is the number that appears most frequently in the array

## 3-8

Write a program that processes an array of _student_ objects and determines the grade quartiles - that is, the grade one would need to score as well or better than 25% of the students, 50% of the students, and 75% of the students

## 3-9

Consider this modification of the sales array. Because salespeople come and go throughout the year, we are now marking months prior to a sales agent's hiring or after a sales agent's last month with a -1. Rewrite your highest sales average, or highest sales median, code to compensate.
