#include <iostream>
#include <stdlib.h>
#include <string>
using std::cin;
using std::cout;

typedef struct student {
  int grade;
  int studentID;
  const char *name;
  // C++ deprecated char* for string literals,
  // so you need to remember to use const char* instead
} student;

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

int highToLow(const void *voidA, const void *voidB) {
  int a = (*(student *)voidA).grade;
  int b = (*(student *)voidB).grade;

  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
}

int compareIDs(const void *voidA, const void *voidB) {
  int a = (*(student *)voidA).studentID;
  int b = (*(student *)voidB).studentID;
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  } else {
    return 0;
  }
}

int main() {
  struct student studentArray[] = {
      {87, 10001, "Fred"},     {28, 10002, "Tom"},   {100, 10003, "Alistair"},
      {75, 10004, "Sasha"},    {84, 10005, "Erin"},  {98, 10006, "Belinda"},
      {75, 10007, "Leslie"},   {70, 10008, "Candy"}, {81, 10009, "Aretha"},
      {68, 10010, "Veronica"},
  };

  int w = sizeof(struct student);

  int size = sizeof(studentArray) / sizeof(studentArray[0]);
  qsort(studentArray, 10, w, lowToHigh);
  cout << "Student Grades, Low to High: \n";
  for (int i = 0; i < size; i++) {
    cout << "Student " << studentArray[i].studentID
         << " Grade: " << studentArray[i].grade << "\n";
  }
  cout << "\n";

  qsort(studentArray, 10, w, highToLow);
  cout << "Student Grades, High to Low: \n";
  for (int i = 0; i < size; i++) {
    cout << "Student " << studentArray[i].studentID
         << " Grade: " << studentArray[i].grade << "\n";
  }
  cout << "\n";

  qsort(studentArray, 10, w, compareIDs);
  cout << "Students ordered largest ID to smallest: \n";
  for (int i = 0; i < size; i++) {
    cout << "Student: " << studentArray[i].studentID
         << " Grade: " << studentArray[i].grade << "\n";
  }
  cout << "\n";

  return 0;
}