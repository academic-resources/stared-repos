#include <iostream>
#include <stdlib.h>
using std::cin;
using std::cout;

int main() {
  for (int row = 0; row < 4; row++) {
    for (int spacetopleft = 0; spacetopleft <= row; spacetopleft++) {
      cout << " ";
    }
    for (int hashtopleft = 1; hashtopleft <= row + 1; hashtopleft++) {
      cout << "#";
    }
    for (int spacemiddletop = 11; spacemiddletop >= row * 4; spacemiddletop--) {
      cout << " ";
    }
    for (int hashtopright = 1; hashtopright <= row + 1; hashtopright++) {
      cout << "#";
    }
    cout << "\n";
  }
  for (int row = 0; row < 4; row++) {
    for (int spacebottomleft = 4; spacebottomleft > row; spacebottomleft--) {
      cout << " ";
    }
    for (int hashbottomleft = 4; hashbottomleft > row; hashbottomleft--) {
      cout << "#";
    }
    for (int spacemiddlebottom = 1; spacemiddlebottom <= row * 4;
         spacemiddlebottom++) {
      cout << " ";
    }
    for (int hashbottomright = 4; hashbottomright > row; hashbottomright--) {
      cout << "#";
    }
    cout << "\n";
  }
}