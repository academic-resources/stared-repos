#include <iostream>
using std::cin;
using std::cout;

int main() {
  for (int row = 1; row <= 8; row += 2) {
    for (int spaceNum = 1; spaceNum <= row / 2; spaceNum++) {
      cout << ' ';
    }
    for (int hashNum = 1; hashNum <= 9 - row; hashNum++) {
      cout << "#";
    }
    cout << "\n";
  }
}