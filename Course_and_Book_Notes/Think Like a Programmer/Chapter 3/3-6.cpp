#include <iostream>
#include <stdlib.h>
#include <string>
using std::cin;
using std::cout;

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

char *randomCipher() {
  char *cipherText = new char[26];
  int indexForCipher[26];

  for (int i = 0; i < 26; i++) {
    indexForCipher[i] = i;
  }
  for (int i = 0; i < 26; i++) {
    int temp = indexForCipher[i];
    int randomIndex = rand() % 26;

    indexForCipher[i] = indexForCipher[randomIndex];
    indexForCipher[randomIndex] = temp;
  }
  int i = 0;
  while (i < 26) {
    cipherText[i] = (indexForCipher[i] + 'A');
    i++;
  }
  cipherText[i] = '\0';
  return cipherText;
}

char *getEncoded(char *original, char *cipherArray) {
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

char *getDecoded(char *cipher, char *cipherArray) {

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
  char *cipherText = randomCipher();
  char *original = getText();
  char *cipher = getEncoded(original, cipherText);
  char *plaintext = getDecoded(cipher, cipherText);
  cout << cipher << "\n";
  cout << "Was your original message: " << plaintext << "?\n";
  return 0;
}