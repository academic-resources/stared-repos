#include <iostream>
#include <stdlib.h>
#include <string>
using std::cin;
using std::cout;

int compareFunc(const void *voidA, const void *voidB) {
  int a = (*(int *)voidA);
  int b = (*(int *)voidB);

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

int getMode(int *numbers, int size) {
  qsort(numbers, size, sizeof(int), compareFunc);

  int mostFrequent;
  int highestFrequency = 0;
  int currentFrequency = 0;
  for (int i = 0; i < size; i++) {
    currentFrequency++;
    if (i == size - 1 || numbers[i] != numbers[i + 1]) {
      if (currentFrequency > highestFrequency) {
        highestFrequency = currentFrequency;
        mostFrequent = numbers[i];
      }
      currentFrequency = 0;
    }
  }
  return mostFrequent;
}

int main() {
  int numbers[10];

  int mode;
  cout << "Enter 10 numbers separated by spaces: ";

  for (int i = 0; i < 10; ++i) {
    cin >> numbers[i];
  }

  mode = getMode(numbers, 10);

  cout << "Most frequent number is: " << mode << "\n";

  return 0;
}