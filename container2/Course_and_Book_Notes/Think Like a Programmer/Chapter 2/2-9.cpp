#include <iostream>
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

int isLetter(char letter) {
  if ((letter >= 'A' && letter <= 'Z') || (letter >= 'a' && letter <= 'z')) {
    return 1;
  } else {
    return 0;
  }
}

int wordCount(char *text) {
  int count = 1;
  int i = 0;
  while (text[i] != '\0') {
    if (i != 0 && text[i] == ' ' && isLetter(text[i + 1])) {
      count++;
    }
    i++;
  }
  return count;
}

int longestWord(char *text) {
  int longest = 0;
  int i = 0;
  int counter = 0;
  while (text[i] != '\0') {
    if (isLetter(text[i])) {
      counter++;
    } else {
      counter = 0;
    }
    if (counter > longest) {
      longest = counter;
    }
    i++;
  }
  return longest;
}

char undercase(char letter) {
  if (letter >= 'A' && letter <= 'Z') {
    letter = (letter - 'A') + 'a';
  }
  return letter;
}

int isVowel(char letter) {
  letter = undercase(letter);
  switch (letter) {
  case 'a':
  case 'e':
  case 'i':
  case 'o':
  case 'u':
  case 'y':
    return 1;
  default:
    return 0;
  }
}

int vowelCount(char *text) {
  int i = 0;
  int vowelCount = 0;
  int currentCount = 0;
  while (text[i] != '\0') {
    while (isLetter(text[i])) {
      if (isVowel(text[i])) {
        currentCount++;
      }
      i++;
    }
    if (vowelCount < currentCount) {
      vowelCount = currentCount;
    }
    currentCount = 0;
    i++;
  }
  return vowelCount;
}

int consonantCount(char *text) {
  int i = 0;
  int consonantCount = 0;
  int currentCount = 0;
  while (text[i] != '\0') {
    while (isLetter(text[i])) {
      if (isVowel(text[i]) == 0) {
        currentCount++;
      }
      i++;
    }
    if (consonantCount < currentCount) {
      consonantCount = currentCount;
    }
    currentCount = 0;
    i++;
  }
  return consonantCount;
}

int main() {
  cout << "What do you say?: ";
  char *text = getText();
  int words = wordCount(text);
  int longest = longestWord(text);
  int vowels = vowelCount(text);
  int consonants = consonantCount(text);

  cout << "\nDid you say: " << text << "?\n";
  cout << "\nWord count is: " << words << "\n";

  cout << "\nThe longest word is: " << longest << "\n";

  cout << "\nHighest vowel count is: " << vowels << "\n";
  cout << "\nHighest consonant count is: " << consonants << "\n";
  return 0;
}