#include <iostream>
#include <string>
using std::cin;
using std::cout;

char cipherArray[26] = {'Q', 'F', 'L', 'X', 'J', 'T', 'A', 'I', 'P',
                        'G', 'W', 'R', 'C', 'O', 'V', 'M', 'Z', 'N',
                        'H', 'B', 'K', 'D', 'S', 'Y', 'U', 'E'};

char *getText() {
  int i = 0;
  char *text = new char[1024];
  char character = cin.get();
  while (character != '\n') {
    text[i] = character;
    character = cin.get();
    i++;
  }
  text[i] = '\0';
  return text;
}

char *getEncoded(char *original) {
  int i = 0;
  char *text = new char[1024];
  char character = original[i];
  while (character != '\0') {
    if (character >= 'A' && character <= 'z') {
      if (character >= 'A' && character <= 'Z') {
        character = character - 'A';
      } else if (character >= 'a' && character <= 'z') {
        character = (character - 'a');
      }
      text[i] = cipherArray[character];
    } else {
      text[i] = character;
    }
    i++;
    character = original[i];
  }
  // text[i] = '\0';
  return text;
}

char *getDecoded(char *cipher) {

  char *text = new char[1024];
  int i = 0;
  int j = 0;
  while (cipher[i] != '\0') {
    for (int j = 0; j < 26; j++) {
      if (cipher[i] == cipherArray[j]) {
        if (i == 0) {
          text[i] = j + 'A';
        } else {
          text[i] = j + 'a';
        }
      } else if (cipher[i] < 'A') {
        text[i] = cipher[i];
      }
    }
    i++;
  }
  text[i] = '\0';
  return text;
}

int main() {
  cout << "Enter a message to encode: ";

  char *original = getText();
  char *cipher = getEncoded(original);
  char *plaintext = getDecoded(cipher);
  cout << cipher << "\n";
  cout << "Was your original message: " << plaintext << "?\n";
  return 0;
}