#include <stdio.h>
#include <stdlib.h>

int stepsTaken(int n) {
  if (n == 1) {
    return n;
  }
  if ((n % 2) == 1) {
    return 3 * n + 1;
  } else {
    return n / 2;
  }
}

int recursion(int n) {
  int count = 1;
  n = stepsTaken(n);

  while (n > 1) {
    count++;
    n = stepsTaken(n);
  }
  count++;
  return count;
}

int findGreatest(int count1, int count2) {
  if (count1 > count2) {
    return count1;
  }
  if (count2 > count1) {
    return count2;
  }
  return count1;
}

int main(int argc, char **argv) {

  int num1;
  int num2;
  int nextnum;
  int count1;
  int count2;

  printf("Please enter two numbers: ");
  scanf("%d%d", &num1, &num2);

  int i = num1;
  int j = num2;

  count1 = recursion(num1);
  num1++;
  count2 = recursion(num2);
  num2--;

  int max = 0;

  while (num1 < num2) {
    int current;
    count1 = recursion(num1);
    count2 = recursion(num2);
    current = findGreatest(count1, count2);

    if (current > max) {
      max = current;
    }

    num1++;
    num2--;
  }

  printf("%d %d %d\n", i, j, max);

  return 0;
}
