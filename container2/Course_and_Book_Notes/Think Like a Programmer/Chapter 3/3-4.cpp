#include <iostream>
#include <string>
using std::cin;
using std::cout;

char *getEncoded() {
  char cipherArray[26] = {'Q', 'F', 'L', 'X', 'J', 'T', 'A', 'I', 'P',
                          'G', 'W', 'R', 'C', 'O', 'V', 'M', 'Z', 'N',
                          'H', 'B', 'K', 'D', 'S', 'Y', 'U', 'E'};
  int i = 0;
  char *text = new char[1024];
  char character = cin.get();
  while (character != '\n') {
    if (character >= 'A' && character <= 'z') {
      if (character >= 'A' && character <= 'Z') {
        character = (character - 'A');
        cout << "Character: " << character + 'A' << "\n";
      } else if (character >= 'a' && character <= 'z') {
        character = (character - 'a');
        cout << "Character: " << character + 'a' << "\n";
      }
      text[i] = cipherArray[character];
    } else {
      text[i] = character;
      cout << "Character: " << character << "\n";
    }
    character = cin.get();
    i++;
  }
  text[i] = '\0';
  return text;
}

int main() {
  cout << "Enter a message to encode: ";
  char *cipher = getEncoded();

  cout << cipher << "\n";
  return 0;
}