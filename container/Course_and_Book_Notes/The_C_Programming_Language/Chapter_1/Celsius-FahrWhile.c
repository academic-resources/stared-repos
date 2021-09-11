#include <stdio.h>

int main() {
  int lower, upper, step;
  float fahr, celsius;

  lower = 0;   /* lower limit of temperature table */
  upper = 300; /* upper limit */
  step = 20;   /* step size */

  celsius = lower;
  printf("Celsius\t  Fahr\n");
  while (celsius <= upper) {
    fahr = celsius * (9.0 / 5.0) + 32;
    printf("%4.0f\t%6.1f\n", celsius, fahr);
    celsius = celsius + step;
  }
  return 0;
}