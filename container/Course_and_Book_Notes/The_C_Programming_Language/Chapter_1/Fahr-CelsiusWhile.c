#include <stdio.h>

int main() {
  int lower, upper, step;
  float fahr, celsius;

  lower = 0;   /* lower limit of temperature table */
  upper = 300; /* upper limit */
  step = 20;   /* step size */

  fahr = lower;
  printf("Fahr\tCelsius\n");
  while (fahr <= upper) {
    celsius = (5.0 / 9.0) * (fahr - 32.0);
    printf("%4.0f\t%6.1f\n", fahr, celsius);
    fahr = fahr + step;
  }
  return 0;
}