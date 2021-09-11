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

struct student studentArray[] = {
    {87, 10001, "Fred"},   {28, 10002, "Tom"},   {100, 10003, "Alistair"},
    {75, 10004, "Sasha"},  {84, 10005, "Erin"},  {98, 10006, "Belinda"},
    {75, 10007, "Leslie"}, {70, 10008, "Candy"}, {81, 10009, "Aretha"},
};

int w = sizeof(struct student);
int size = sizeof(studentArray) / sizeof(studentArray[0]);

int midpoint() {
  if ((size % 2) == 0) {
    return (size / 2) - 1;
  }
  return size / 2;
}

int quarterPoint() {
  int mid = midpoint();
  if ((mid % 2) == 0) {
    return (mid / 2) - 1;
  }
  return mid / 2;
}

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

int midPoint() {
  qsort(studentArray, size, w, lowToHigh);
  int mid = midpoint();
  if ((mid % 2) > 0) {
    return ((studentArray[mid].grade + studentArray[mid + 1].grade) / 2);
  }
  return studentArray[mid].grade;
}

int firstQuartile() {
  qsort(studentArray, size, w, lowToHigh);
  int first = quarterPoint();
  if ((first % 2) > 0) {
    cout << "Size was even\nFirst is  " << first
         << " student[first - 1]: " << studentArray[first].grade
         << " and first grade: " << studentArray[first + 1].grade << "\n";
    return (studentArray[first].grade + studentArray[first + 1].grade) / 2;
  }
  cout << "First: " << first << " is " << studentArray[first].grade << "\n";
  return studentArray[first].grade;
}

int thirdQuartile(int mid) {
  qsort(studentArray, size, w, lowToHigh);
  int quart = quarterPoint();
  int third = (quart * 2) + mid;
  cout << "What is quarterpoint * 3? " << third << "\n";
  if ((third % 2) > 0) {
    return (studentArray[third].grade + studentArray[third + 1].grade) / 2;
  }
  return studentArray[third].grade;
}

int main() {
  int midIndex = midpoint();

  cout << "Middle index is: " << midIndex << "\n";

  int q2 = midPoint();
  int q3 = thirdQuartile(midIndex);
  int q1 = firstQuartile();
  qsort(studentArray, size, w, lowToHigh);
  cout << "Student Grades, Low to High: \n";
  for (int i = 0; i < size; i++) {
    cout << "Student " << studentArray[i].studentID
         << " Grade: " << studentArray[i].grade << "\n";
  }
  cout << "\n";
  cout << "You would need a score of " << q1
       << " or higher to score as well or better than 25% of your peers.\n";
  cout << "You would need a score of " << q2
       << " or higher to score as well or better than 50% of your peers.\n";
  cout << "You would need a score of " << q3
       << " or higher to score as well or better than 75% of your peers.\n";

  return 0;
}