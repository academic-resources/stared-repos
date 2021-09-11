#include <iostream>
#include <string>
using std::cin;
using std::cout;

bool isSorted(int arr[], int array_size) {
  int i = 1;
  while (i < array_size) {
    if (arr[i - 1] < arr[i]) {
      i++;
    } else {
      return false;
    }
  }
  return true;
}

int main() {

  int intArray[12] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 22, 12};

  int size = sizeof(intArray) / sizeof(intArray[0]);

  if (isSorted(intArray, size)) {
    cout << "This is a super sorted list, y'all.\n";
  } else {
    cout << "Y'all might want to invest in one of them qsorts\n";
  }
  return 0;
}