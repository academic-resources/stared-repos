#include <stdio.h>
#include <stdlib.h>

int compareFunc(const void *voidA, const void *voidB) {
  int a = (*(int *)voidA);
  int b = (*(int *)voidB);

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
double arrayMedian(int intArray[], int ARRAY_SIZE) {
  // Call qsort here to ensure the array is sorted before computing median
  qsort(intArray, ARRAY_SIZE, sizeof(int), compareFunc);
  if (ARRAY_SIZE % 2 == 1) {
    printf("Is it divisible by 2?  %d\n", ARRAY_SIZE % 2 == 1);
    printf("{Median is: %d\n", intArray[ARRAY_SIZE / 2]);
    return intArray[ARRAY_SIZE / 2];
  } else {
    int midpoint = ARRAY_SIZE / 2;
    printf("Midpoint is %d\n", midpoint);
    printf("Average of %d and %d is %d\n", intArray[midpoint - 1],
           intArray[midpoint],
           (intArray[midpoint - 1] + intArray[midpoint]) / 2);
    return (intArray[midpoint - 1] + intArray[midpoint]) / 2;
  }
}

int main() {

  int NUM_AGENTS = 3;
  int NUM_MONTHS = 12;
  int sales[3][12] = {
      {1856, 498, 30924, 87478, 328, 2653, 387, 3754, 387587, 2873, 276, 32},
      {5865, 5456, 3983, 6464, 9957, 4785, 3875, 3838, 4959, 1122, 7766, 2534},
      {23, 55, 67, 99, 265, 376, 232, 223, 4546, 564, 4544, 3434},
  };

  int w = sizeof(sales) / sizeof(sales[0]);

  double highestMedian = arrayMedian(sales[0], 12);
  double agentAverage;
  int agentWithHighestMedian = 0;
  for (int agent = 1; agent < 3; agent++) {
    agentAverage = arrayMedian(sales[agent], 12);
    if (agentAverage > highestMedian) {
      highestMedian = agentAverage;
      agentWithHighestMedian = agent;
    } else {
      printf("Highest monthly median: %g\n", highestMedian);
      printf("Highest monthly median comes from: %d\n", agentWithHighestMedian);
    }
  }

  return 0;
}