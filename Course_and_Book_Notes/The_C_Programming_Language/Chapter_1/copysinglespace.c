#include <stdio.h>

int main() {
  int c;
  int a = getchar();
  while (a != EOF) {
    putchar(a);
    if (a == ' ') {
        while ((c = getchar()) == ' ') {
            continue;
        }
        a = c;
    } else {
        a = getchar();
  }
  }
  return 0;
}