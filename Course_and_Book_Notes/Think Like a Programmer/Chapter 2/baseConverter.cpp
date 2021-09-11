#include <iomanip>
#include <iostream>
#include <stdlib.h>
using std::cin;
using std::cout;

// If entering a binary number, preface with 0b (e.g.: 0b100111111011001)
// If entering a hexadecimal number, preface with 0x (e.g.: 0xDEADBEEF)
// If entering an octal number, preface with 0 (e.g.: 077)

int inferBase(char digitChar) {
  if (digitChar == 'b') {
    return 2;
  } else if (digitChar == 'x') {
    return 16;
  } else {
    return 8;
  }
}

unsigned long long digitValue(char digitChar) {
  if (digitChar > '9') {
    // The capitalized alphabet is offset from '0' - '9' by 7 numbers.
    // If we subtract '0' from a letter, we're 7 digits off from where we should
    // be For example, 'B' in ASCII is 66, '0' is 48 66 - 48 = 18, but 'B'
    // represents 11.
    digitChar = (digitChar - '0') - 7;
  } else {
    digitChar = digitChar - '0';
  }
  return digitChar;
}

unsigned long long readNum() {
  int base;
  unsigned long long number = 0;
  char digitChar = cin.get();

  if (digitChar == '0') {
    // Have to read next digit here or we'll lose an octal's first digit
    digitChar = cin.get();
    base = inferBase(digitChar);
  } else {
    base = 10;
  }
  if (base == 16 || base == 2) {
    // Need to get next digit for base 16 and base 2
    // ... because current digit is still just information about base
    digitChar = cin.get();
  }
  number = digitValue(digitChar);
  digitChar = cin.get();
  while (digitChar != '\n') {
    number = number * base + digitValue(digitChar);
    digitChar = cin.get();
  }
  // If the number is greater than what can be stored in 64 bits, the program
  // cannot operate on it
  if (number > 18446744073709551615UL) {
    return 0;
  }
  return number;
}

char *reverseInPlace(char *str, int endIndex) {
  int startIndex = 0;

  while (startIndex < endIndex) {
    char temp = str[startIndex];
    str[startIndex] = str[endIndex];
    str[endIndex] = temp;
    startIndex++;
    endIndex--;
  }
  return str;
}

char *intToBaseString(unsigned long long number, int base) {
  unsigned long long remainder;
  char *str = new char[100];
  char *string;
  int i = 0;
  char output;
  while (number != 0) {
    remainder = number % base;
    number /= base;
    if (remainder > 9) {
      // if remainder is greater than int 9, subtract 10
      // this takes you back to 0 in the ASCII table,
      // allowing you to add 'A' to get in range of the alphabet
      output = remainder - 10 + 'A';
      str[i] = output;
    } else {
      str[i] = remainder + '0';
    }
    i++;
  }
  str[i] = '\0';
  string = reverseInPlace(str, i - 1);
  return string;
}

int main() {
  cout << "Enter a number in binary, octal, hexadecimal, or decimal.\nNotes: "
          "Can only handle numbers up to 18,446,744,073,709,551,615.\nIf "
          "entering a binary number, preface with '0b'.\nIf entering a "
          "hexadecimal number, preface with '0x'.\nIf entering an octal "
          "number, preface with '0'\n>> ";
  unsigned long long dec;
  char *binary;
  char *ternary;
  char *quaternary;
  char *quinary;
  char *senary;
  char *octal;
  char *decimal;
  char *duodecimal;
  char *hexadecimal;
  char *vigesimal;
  char *base36;

  // Need to keep this first test of whether or not the digitChar is '0' here
  // because if it's moved to the inferBase function,
  // we lose access to the first real index of an octal value
  // (as it will only exist in inferBase)

  dec = readNum();
  if (dec == 0) {
    cout << "\nThe number you entered is larger than 64 bits and cannot be "
            "converted.\n";
    exit(1);
  }
  binary = intToBaseString(dec, 2);
  ternary = intToBaseString(dec, 3);
  quaternary = intToBaseString(dec, 4);
  quinary = intToBaseString(dec, 5);
  senary = intToBaseString(dec, 6);
  octal = intToBaseString(dec, 8);
  decimal = intToBaseString(dec, 10);
  duodecimal = intToBaseString(dec, 12);
  hexadecimal = intToBaseString(dec, 16);
  vigesimal = intToBaseString(dec, 20);
  base36 = intToBaseString(dec, 36);

  cout << "\nThe number you entered in: \n\n";
  cout << "Binary (base 2):\t\t\t" << binary << "\n";
  cout << "Ternary (base 3):\t\t\t" << ternary << "\n";
  cout << "Quaternary (base 4):\t\t" << quaternary << "\n";
  cout << "Quinary (base 5):\t\t\t" << quinary << "\n";
  cout << "Senary (base 6):\t\t\t" << senary << "\n";
  cout << "Octal (base 8):\t\t\t\t" << octal << "\n";
  cout << "Decimal (base 10):\t\t\t" << decimal << "\n";
  cout << "Duodecimal (base 12):\t\t" << duodecimal << "\n";
  cout << "Hexadecimal (base 16):\t\t" << hexadecimal << "\n";
  cout << "Vigesimal (base 20):\t\t" << vigesimal << "\n";
  cout << "Base 36:\t\t\t\t\t" << base36 << "\n";
}