#include <iostream>
using std::cin;
using std::cout;

int main() {
  int offset = 9;

  for (int top = 1; top <= 8; top += 2) {
    for (int spaceTopLeft = 3; spaceTopLeft > top / 2; spaceTopLeft--) {
      cout << " ";
    }
    for (int hashTopLeft = 9 - offset; hashTopLeft < top; hashTopLeft++) {
      cout << "#";
    }
    for (int spaceMiddleTop = 0; spaceMiddleTop < 7 - top; spaceMiddleTop++) {
      cout << " ";
    }
    for (int hashTopRight = 9 - offset; hashTopRight < top; hashTopRight++) {
      cout << "#";
    }
    cout << "\n";
  }
  for (int middle = 0; middle <= 2; middle++) {
    for (int hashMiddle = 1; hashMiddle <= 14; hashMiddle++) {
      cout << "#";
    }
    cout << "\n";
  }
  for (int bottom = 0; bottom < 4; bottom++) {
    for (int spaceBottomLeft = 1; spaceBottomLeft <= bottom + 1;
         spaceBottomLeft++) {
      cout << " ";
    }
    for (int hashBottomLeft = 0; hashBottomLeft < 6 - bottom;
         hashBottomLeft++) {
      cout << "#";
    }
    for (int hashBottomRight = 0; hashBottomRight < 6 - bottom;
         hashBottomRight++) {
      cout << "#";
    }
    cout << "\n";
  }
  for (int bottom = 0; bottom < 6; bottom++) {
    cout << " ";
  }
  for (int i = 0; i < 2; i++) {
    cout << "#";
  }
}