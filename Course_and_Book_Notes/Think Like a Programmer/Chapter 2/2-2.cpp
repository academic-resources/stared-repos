#include <iostream>
#include <stdlib.h>
using std::cin;
using std::cout;

int main() {
  for (int row = 1; row <= 7; row++) {
    for (int spaceNum = 1; spaceNum <= abs(4 - row); spaceNum++) {
      cout << " ";
    }
    for (int hashNum = 1; hashNum <= (4 - abs(4 - row)) * 2; hashNum++) {
      cout << "#";
    }
    cout << "\n";
  }
}