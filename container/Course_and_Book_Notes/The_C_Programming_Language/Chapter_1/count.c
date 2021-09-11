#include <stdio.h>

int main() {
  long blanks = 0;
  long tabs = 0;
  long newlines = 0;
  char character = getchar();
  while (character != EOF) {
    if (character == '\n') {
        newlines++;
    }
    if (character == '\t') {
        tabs++;
    }
    if (character == ' ') {
        blanks++;
    }
    character = getchar();
  }
    printf("There were %ld blanks, %ld tabs, and %ld newlines.\n", blanks, tabs, newlines);
  return 0;
}