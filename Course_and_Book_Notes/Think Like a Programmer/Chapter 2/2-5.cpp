#include <iostream>
using std::cin;
using std::cout;

int productOfDigit(int digit, int count) {
  int product = digit * (10 - count);
  return product;
}

int tripleDigitValue(int digit) {
  int tripleDigit = digit * 3;
  return tripleDigit;
}

int main() {
  char digit;
  int count = 0;
  int checksum10 = 0;
  int checksum13 = 0;
  int position = 1;
  cout << "Enter a number: ";
  digit = cin.get();
  while (digit != 10) {
    if (position % 2 == 0) {
      checksum13 += tripleDigitValue(digit - '0');
    } else {
      checksum13 += (digit - '0');
    }
    checksum10 += productOfDigit((digit - '0'), count);
    count++;
    digit = cin.get();
    position++;
  }
  if (count == 9) {
    int checkdigit = 11 - (checksum10 % 11);
    cout << "Check digit is: " << checkdigit << "\n";
    checksum10 += checkdigit;
  }
  if (count <= 10) {
    cout << "Checksum is " << checksum10 << ". \n";
    if (checksum10 % 11 == 0) {
      cout << "Checksum is divisible by 11.  Valid. \n";
    } else {
      cout << "Checksum is not divisible by 11.  Invalid. \n";
    }
  } else {
    if (count == 12) {
      int checkdigit = 10 - (checksum13 % 10);
      cout << "Check digit is: " << checkdigit << "\n";
      checksum13 += checkdigit;
    }
    cout << "Checksum is: " << checksum13 << "\n";
    if (checksum13 % 10 == 0) {
      cout << "Checksum is divisible by 10.  Valid.\n";
    } else {
      cout << "Checksum is not divisible by 10.  Invalid.\n";
    }
  }
  cout << "Count is: " << count << "\n";
}