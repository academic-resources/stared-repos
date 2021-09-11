#include <stdio.h>

void swap(int *x, int *y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}

void BubbleSort(int A[], int n) {
  int i, j;

  for (i = 0; i < n-1; i++) {
    for (j = 0; j < n - 1 - i; j++) {
      if (A[j] > A[j+1]) {
        swap(&A[j], &A[j+1]);
      }
    }
  }
}

int main() {
  int A[] = {3, 7, 10, 12, 4, 2, 11, 44, 3}, n = 9, i;

  BubbleSort(A, n)

  for (i = 0; i < n; i++) {
    printf("%d\n", A[i]);
  }

  return 0;
}
