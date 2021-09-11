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

int getHighestMode(int *numbers, int size) {
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
      } else if (currentFrequency == highestFrequency &&
                 mostFrequent < numbers[i]) {
        mostFrequent = numbers[i];
      }
      currentFrequency = 0;
    }
  }
  return mostFrequent;
}

int getLowestMode(int *numbers, int size) {
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
      } else if (currentFrequency == highestFrequency &&
                 mostFrequent > numbers[i]) {
        mostFrequent = numbers[i];
      }
      currentFrequency = 0;
    }
  }
  return mostFrequent;
}

int modeCount(int *numbers, int size) {
  qsort(numbers, size, sizeof(int), compareFunc);

  int mostFrequent;
  int highestFrequency = 0;
  int currentFrequency = 0;
  int count = 1;

  for (int i = 0; i < size; i++) {
    currentFrequency++;
    if (i == size - 1 || numbers[i] != numbers[i + 1]) {
      if (currentFrequency == highestFrequency) {
        count++;
      } else if (currentFrequency > highestFrequency) {
        highestFrequency = currentFrequency;
        mostFrequent = numbers[i];
      }
      currentFrequency = 0;
    }
  }
  return count;
}

int main() {
  int numbers[10];

  int lowestMode;
  int highestMode;
  int modes;

  cout << "Enter 10 numbers separated by spaces: ";

  for (int i = 0; i < 10; ++i) {
    cin >> numbers[i];
  }

  lowestMode = getLowestMode(numbers, 10);
  highestMode = getHighestMode(numbers, 10);
  modes = modeCount(numbers, 10);

  cout << "Of the most frequent numbers, the highest is: " << highestMode
       << "\n";
  cout << "Of the most frequent numbers, the lowest is: " << lowestMode << "\n";
  cout << "There were " << modes << " modes in the array.\n";

  return 0;
}