#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct student {
  int grade;
  int studentID;
  char *name;
} student;

struct student studentArray[] = {
    {87, 10001, "Fred"},
    {28, 10002, "Tom"},
    {100, 10003, "Alistair"},
    {75, 10004, "Sasha"},
    {84, 10005, "Erin"},
    {98, 10006, "Belinda"},
    {75, 10007, "Leslie"},
    {70, 10008, "Candy"},
    {81, 10009, "Aretha"},
    {72, 10010, "Carlile"},
    {250, 10011, "BreakingBellCurve"},
};

int w = sizeof(struct student);
int size = sizeof(studentArray) / sizeof(studentArray[0]);
int firstHalf[1024];
int secondHalf[1024];

int rawmedian = (sizeof(studentArray) / sizeof(studentArray[0])) / 2;

int lowToHigh(const void *voidA, const void *voidB) {
  int a = (*(student *)voidA).grade;
  int b = (*(student *)voidB).grade;
  if (a < b) {
    return -1;
  } else if (a > b) {
    return +1;
  } else {
    return 0;
  }
}

int isEven(int length) {
  if ((length % 2) == 0) {
    /* The length of the studentArray is even */
    return 1;
  }
  /* The length of the studentArray is odd */
  return 0;
}

int *getFirstHalf() {
  qsort(studentArray, size, w, lowToHigh);
  printf("The first half of grades studentArray is:\n");
  for (int i = 0; i < rawmedian; i++) {
    firstHalf[i] = studentArray[i].grade;
    printf("%d\n", firstHalf[i]);
  }
  return firstHalf;
}

int *getSecondHalf() {
  qsort(studentArray, size, w, lowToHigh);
  if (isEven(size)) {
    printf("\nIf the studentArray is even, the second half of the studentArray "
           "is:\n");
    for (int i = rawmedian, j = 0; i < size; i++, j++) {
      secondHalf[j] = studentArray[i].grade;
      printf("%d\n", secondHalf[j]);
    }
  } else {
    printf("\nIf the studentArray is odd, the second half of the studentArray "
           "is:\n");
    for (int i = rawmedian + 1, j = 0; i < size; i++, j++) {
      secondHalf[j] = studentArray[i].grade;
      printf("%d\n", secondHalf[j]);
    }
  }
  return secondHalf;
}

int getMedian() {
  if (isEven(size)) {
    /* If the length of the array is even: */
    if (((studentArray[rawmedian - 1].grade + studentArray[rawmedian].grade) %
         2) > 0) {
      /*
      If the average of two values is not evenly split in half, round up instead
      of down.
      */
      return ((studentArray[rawmedian - 1].grade +
               studentArray[rawmedian].grade) /
              2) +
             1;
    } else {
      return (studentArray[rawmedian - 1].grade +
              studentArray[rawmedian].grade) /
             2;
    }
  }
  /* If the length of the array is odd: */
  return studentArray[rawmedian].grade;
}

int getQuartiles(int *subarray) {
  /* Need a special case for arrays fewer than four elements if you want to be
   * able to handle quartile calculation for arrays smaller than four elements
   */
  if (size == 2) {
    int mid = getMedian();
    if (((subarray[0] + mid) % 2) > 0) {
      return ((subarray[0] + mid) / 2) + 1;
    }
    return (subarray[0] + mid) / 2;
  }
  if (size == 3) {
    return ((studentArray[rawmedian].grade + subarray[rawmedian / 2]) / 2);
  }
  if (isEven(rawmedian)) {
    /* If the length of the subarray is even: */
    if (((subarray[rawmedian / 2] + subarray[(rawmedian / 2) - 1]) % 2) > 0) {
      /*
      If the average of two values is not evenly split in half, round up instead
      of down.
      */
      return ((subarray[rawmedian / 2] + subarray[(rawmedian / 2) - 1]) / 2) +
             1;
    } else {
      return (subarray[rawmedian / 2] + subarray[(rawmedian / 2) - 1]) / 2;
    }
  } else {
    /* If the length of the array is odd: */
    return subarray[rawmedian / 2];
  }
}

int main() {
  printf("The studentArray contains %d values\n", size);
  printf("The floored median of the studentArray is %d\n\n", rawmedian);
  int *firstHalf = getFirstHalf();
  int *secondHalf = getSecondHalf();

  int q1 = getQuartiles(firstHalf);
  printf("\nStudent must receive a grade of %d or more in order to score the "
         "same or greater than 25 percent of their classmates\n",
         q1);
  int realMedian = getMedian();
  printf("Student must receive a grade of %d or more in order to score the "
         "same or greater than 50 percent of their classmates\n",
         realMedian);

  int q3 = getQuartiles(secondHalf);
  printf("Student must receive a grade of %d or more in order to score the "
         "same or greater than 75 percent of their classmates\n",
         q3);
  qsort(studentArray, size, w, lowToHigh);

  printf("\nThis is the sorted student array:\n");

  for (int i = 0; i < size; i++) {
    printf("StudentID: %d   Grade: %d\n", studentArray[i].studentID,
           studentArray[i].grade);
  }

  return 0;
}