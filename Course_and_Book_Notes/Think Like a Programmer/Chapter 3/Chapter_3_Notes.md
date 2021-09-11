# Chapter 3: Solving Problems with Arrays

We'll primarily deal with actual arrays, that is, those declared with the built-in C++ syntax such as: `int tenIntegerArray[10]`

Techniques discussed apply to data structures with similar attributes. Moxst common of these structures is a _vector_.

The term _vector_ is often used as a synonym for any array of a single dimension, but we'll use it here in the more specific sense of a structure that has the attributes of an array without a specified maximum number of elements (An array is of a fixed size, a vector can grow or shrink automatically as needed).

This chapter will have restrictions that allow us to use structures with a fixed number of elements but problems without such restrictions can use vectors.

**Array**: Collection of variables of the same type organized under one name, where individual variables are denoted by a number (subscript).

**Random access**: Any element can be accessed at any time.

## List of Basic Operations of Arrays:

**1) Store: Assigning values**
To assign integer 5 to first element of previously declared array: `tenIntegerArray[0] = 5`

_Note_: Values of the elements are "garbage" until particular values are assigned, so arrays should be initialized before use.

**Assigning a value to every element**:

```
int tenIntegerArray[10] = {4, 5, 9, 12, -4, 0, -57, 27, 3, 1}
```

**Setting every element in 10-element array to -1**:

```
int integerArray[10];
for (int i = 0; i < 10; i++) tenIntegerArray[i] = -1;
```

**2) Copy: Either because need original array after manipulation or because we want to copy parts to a new array**:

```
int tenIntegerArray[10] = {4, 5, 9, 12, -4, 0, -57, 27, 3, 1}
int secondArray[10];
for (int i = 0; i < 10; i++) secondArray[i] = tenIntegerArray[i];
```

**3) Retrieval and Search**

```
int num = tenIntegerArray[0];
```

**4) Searching for a Specific Value**:

```
const int ARRAY_SIZE = 10;
int intArray[ARRAY_SIZE] = {4, 5, 9, 12, -4, 0, -27, 30987, -287, 1};
int targetValue = 12;
int targetPos = 0;
while ((intArray[targetPos] != targetValue) && (targetPos < ARRAY_SIZE)) targetPos++;
```

_Note_: If targetValue is not found, targetPos will be equal to ARRAY_SIZE after the loop. This is enough to signify the event because ARRAY_SIZE is not a valid element number, but it is up to the code following it to check that. Also, this does not handle the possibility of the value appearing more than once as it will return after the first match.

**5) Criterion-based Search**:

When the value you're looking for isn't a fixed value and is instead a value based on the relationship with other values in the array - for example, largest.

```
const int ARRAY_SIZE = 10;
int intArray[ARRAY_SIZE] = {4, 5, 9, 12, -4, 0, -57, 30987, -287, 1};
int highestValue = intArray[0];
for (int i = 1; i < ARRAY_SIZE; i++) {
    if (intArray[i] > highestValue) highestValue = intArray[i];
}
```

This basic structure can be applied to all sorts of situations in which you want to look at every element and find the value that most exemplifies a given quality.

**6) Sort: Putting data in a specified order**:

For most situations, you can make do with two sorts in your toolbox - a fast, easy-to-use sort and a decent easy-to-understand sort you can modify with confidence when the need arises. For fast and easy, we'll use the standard library function qsort, and when we need something to tweak, we'll use an insertion sort.

**7) Fast-and-Easy Sorting with qsort**:

To use _qsort_, you have to write a comparator function. That function will be called by qsort whenever it needs to compare two elements in the array to see which should appear earlier in sorted order. The function is passed two void pointers which should be cast to the element type in your array. The function should return an int, either positive, negative, or zero depending on whether the first element is larger, smaller, or equal to the second element.

**Comparator function example**:

```
int compareFunc(const void* voidA, const void* voidB) {
    int* intA = (int *)(voidA);
    int* intB = (int *)(voidB);
    return *intA - *intB;
}
const int ARRAY_SIZE = 10;
int intArray[ARRAY_SIZE] = {87, 28, 100, 78, 84, 98, 75, 70, 81, 68};
qsort(intArray, ARRAY_SIZE, sizeof(int), comapreFunc);
```

**8) Easy-to-Modify Sorting with Insertion Sort**:

Basic implementation for our integer array:

```
int start = 0;
int end = SIZE_ARRAY - 1;
for (int i = start + 1; i <= end; i++) {
    for (int j = i; j > start && intArray[j-1] > intArray[j]; j--) {
        int temp = intArray[j-1];
        intArray[j-1] = intArray[j];
        intArray[j] = temp;
    }
}
```

Explanation:
Outer loop selects next 'card'. Loop initializes i to start + 1 because a list of only one element is by definition a sorted list. Inner loop puts the current value in the correct position by swapping current value with its predecessor until it's in its place.

**9) Compute Statistics**:

Similar to retrieval operation in that you need to look at every element in the array before returning a value, but instead of returning a value of one of the array elements, you return a statistic computed from all the values in the array. Examples include average, median, or mode.

**Example: Average**:

```
const int ARRAY_SIZE = 10;
int gradeArray[ARRAY_SIZE] = {87, 76, 100, 97, 64, 83, 88, 92, 74, 95};
double sum = 0;
for (int i = 0; i < ARRAY_SIZE; i++) {
    sum += gradeArray[i];
}
double average = sum / ARRAY_SIZE;
```

**Example: Data Validation**:

Array of double values represents payments to vendors. Only positive values are valid, so negative values indicate data integrity problems. As part of validation report, you might write a loop to count the number of negative values in the array.

```
const int ARRAY_SIZE = 10;
int countNegative = 0;
for (int i = 0; i < ARRAY_SIZE; i++) {
    if (vendorPayments[i] < 0) countNegative__;
}
```

## Problem: Finding the Mode

In statistics, the mode of a set of values is the value that appears most often. Write code that processes an array of survey data, where survey takers have responded to a question with a number in the range 1-10 to determine the mode of the data set. For our purpose, if multiple modes exist, any may be chosen.

#### Pseudo Code

```
int mostFrequent = ?;
int highestFrequency = ?;
int currentFrequency = 0;
for (int i = 0; i < ARRAY_SIZE; i++) {
    currentFrequency++;
    if (surveyData[i] IS LAST OCCURRENCE OF A VALUE) {
        if (currentFrequency > highestFrequency) {
            highestFrequency = currentFrequency;
            mostFrequent = surveyData[i];
        }
        currentFrequency = 0;
    }
}
```

#### Completed:

```
int mostFrequent;
int highestFrequency = 0;
int currentFrequency = 0;
for (int i = 0; i < ARRAY_SIZE; int) {
    currentFrequency++;
    // if (surveyData[i] IS LAST OCCURRENCE OF A VALUE)
    if (i == ARRAY_SIZE - 1 || surveyData[i] != surveyData[i+1]) {
        if (currentFrequency > highestFrequency) {
            highestFrequency = currentFrequency;
            mostFrequent = surveyData[i];
        }
        currentFrequency = 0;
    }
}
// using qsort with earlier compareFunc to group in order
qsort(surveyData, ARRAY_SIZE, sizeof(int), compareFunc);
```

**Refactoring**: Improving working code - not changing what it does, but how it does it

**Histogram**: A graph showing how often different values appear in an underlying dataset.

```
const int MAX_RESPONSE = 10;
int histogram[MAX_RESPONSE];
for (int i = 0; i < MAX_RESPONSE; i++) {
    histogram[i] = 0;
}
for (int i = 0; i < ARRAY_SIZE; i++) {
    histogram[surveyData[i] - 1]++;
}
```

With histogram data in place, we can write the rest. Note the histogram code was written separately, so that it could be tested separately.

**No time is saved by writing all of the code at once in a situation where the problem is easily separated into parts that can be individually written and tested**

```
int mostFrequent = 0;
for(int i = 1; i < MAX_RESPONSE; i++) {
    if (histogram[i] > histogram[mostFrequent]) mostFrequent++;
}
mostFrequent++;
```

Writing an original (to the programmer) program is a learning process and can't be expected to always progress in a straight line. A long journey is not a waste of time if you learned something from it that you wouldn't have learned by going the short way.

## Arrays of Fixed Data

It's often useful to create an array where values never change after initialization to allow a simple loop or direct array lookup to replace a whole block of control statements.

#### Example: Replacing the punctuation switch for Decode a Message

```
const char punctuation[8] = {'!', '?', ',', '.', ' ', ';', '"', '\''};
outputCharacter = punctuation[number - 1];
```

#### Example: If we then had to encode using same algorithm

```
const int ARRAY_SIZE = 8;
int targetPos = 0;
while (punctuation[targetPos] != targetValue && targetPos < ARRAY_SIZE) targetPos++;
int punctuationCode = targetPos + 1;
```

Suppose writing program to compute cost of a business license in a state where the license cost varies as the gross sales figures of the business varies.

```
const int NUM_CATEGORIES = 4;
const double categoryThresholds[NUM_CATEGORIES] = {0.0, 5000.0, 150000.0, 5000000.0};
const double licenseCost[NUM_CATEGORIES] = {80.0, 200.0, 1000.0, 5000.0};
category = 0;
while (category < NUM_CATEGORIES && categoryThresholds[category] <= grossSales) {
    category++;
}
cost = licenseCost[category - 1];
```

1. First array stores gross sales threshold for each business category
2. Second array stores business license cost per category
3. Initialize category to 0
4. Search through categoryThresholds array, stopping when threshold exceeds the gross sales or when out of categories
5. Use category to reference the license cost from licenseCost array.

## Non-Scalar Arrays

Usually the use of compound data types doesn't have to complicate our thinking about array processing because it just involves one data member of the struct or class and you can ignore the other parts of the data structure.

Sometimes, the use of compound data types does require us to make some changes to our approach.

For example, consider the problem of finding the highest of a set of student grades. Suppose that instead of an array of int, we have an array of data structures, each representing a student record:

```
struct student {
    int grade;
    int studentID;
    string name;
};
```

Always easy to initialize an array, even when a struct!

```
const int ARRAY_SIZE = 10;
student sutdentArray[ARRAY_SIZE] = {
    {87, 10001, "Fred"},
    {28, 10002, "Tom"},
    {100, 10003, "Alistair"},
    {75, 10004, "Sasha"},
    {84, 10005, "Erin"},
    {98, 10006, "Belinda"},
    {75, 10007, "Leslie"},
    {70, 10008, "Candy"},
    {81, 10009, "Aretha"},
    {68, 10010, "Veronica"},
};
```

To get the highest grades:

```
int highest = studentArray[0].grade;
for (int i = 1, i < ARRAY_SIZE; i++) {
    if (studentArray[i].grade > highest) highest = studentArray[i].grade;
}
```

In order to retrieve any data for the highest scoring student (name, id, grade), it would be better to track the array position rather than the highest grade:

```
int highPosition = 0;
for (int i = 0; i < ARRAY_SIZE; i++) {
    if (studentArray[i].grade > studentArray[highPosition].grade) highPosition = i;
}
```

## Multidimensional Arrays

Business license example from earlier:

```
const double licenseData[2][numberCategories] = {
    {0.0, 5000.0, 150000.0, 5000000.0},
    {50.0, 200.0, 1000.0, 50000.0}
};
```

Using a multidimensional array usually lowers readability, and isn't really worth it. However, if you have multiple things you need to compare in order to compute a statistic, it may be better to have a multidimensional array in order to process the entire array at once.

Example:

```
const int NUM_AGENTS = 3;
const int NUM_MONTHS = 12;
int sales[NUM_AGENTS][NUM_MONTHS] = {
    {1856, 498, 30924, 87478, 328, 2653, 387, 3754, 387587, 2873, 276, 32}
    {5685, 5456, 3758, 6453, 98357, 2334, 1233, 2333, 3222, 1123, 13443, 3443},
    {34433, 343566, 24567, 35453, 1343, 1435, 1334, 1254, 454, 3453, 7853, 4343}
}

int highestSales = sales[0][0];
for (int agent = 0; agent < NUM_AGENTS; agent++) {
    for (int month = 0; month < NUM_MONTHS; month++) {
        if (sales[agent][month] > highestSales)
            highestSales = sales[agent][month];
    }
}
```

It may occur to you that the first time through the nested loops, both of our loop counters will be 0, so we will be comparing this initial value of highestSales to itself. This doesn't affect the outcome, but sometimes novice programmers will attempt to avoid this tiny inefficiency by putting in a second if statement in the inner loop body:

```
if (agent != 0 || month != 0)
    if (sales[agent][month] > highestSales)
        highestSales = sales[agent][month];
```

This, however, is considerably _less_ efficient than the previous version because we would be performing 50 extra comparisons while avoiding only one.

```
double arrayAverage(int intArray[], int ARRAY_SIZE) {
    double sum = 0;
    for (int i = 0; i < ARRAY_SIZE; i++) {
        sum += intArray[i];
    }
    double average = sum / ARRAY_SIZE;
    return average;
}

double highestAverage = arrayAverage(sales[10], 12);
for (int agent = 1; agent < NUM_AGENTS; agent++) {
    double agentAverage = arrayAverage(sales[agent], 12);
    if (agentAverage > highestAverage) highestAverage = agentAverage;
}

cout << "Highest monthly average: " << highestAverage << "\n";
```

Because the direct relationship between arrays and addresses in C++, sales[agent] indicates the address of the first element of the specified row, which can then be used by our function as the base address of a one-dimensional array consisting of just that row.

If the data you want to individually process isn't contiguous in the array initalizer, you've organized the data the wrong way.

Because average monthly sales for the current agent is potentially referenced twice (once in the assignment statement and once in the conditional), temp variable eliminates the possibility of calling arrayAverage twice for the same agent data.

```
int ARRAY_SIZE;
cout << "Number of survey responses: ";
cin >> ARRAY_SIZE;
int *surveyData = new int[ARRAY_SIZE];
for (int i = 0; i < ARRAY_SIZE; i++) {
    cout << "Survey response " << i + 1 << ": ";
    cin >> surveyData[i];
}
```

Using an array works in this situation because we know the size of the array at the start.

Because it's dynamically allocated, we need to deallocate the surveyData using delete[].

delete[] is used for arrays. It doesn't really matter with ints, but with objects, this ensures that objects are deleted before the array (so it's good practice to always use it when dealing with arrays).

If you don't know the size of the array, you can use a vector, which works like an array but when a vector has filled its original size, you can use push_back to add further elements to the array:

```
vector<int> surveyData;
surveyData.reserve(30);
int surveyResponse;
cout << "Enter next survey response or -1 to end: ";
cin >> surveyResponse;
while (surveyResponse != -1) {
    surveyData.push_back(surveyResponse);
    cout << "Enter next survey response or -1 to end: ";
    cin >> surveyResponse;
}

int vectorSize = surveyData.size();
const int MAX_RESPONSE = 10;
int histogram[MAX_RESPONSE];
for (int i = 0; i < MAX_RESPONSE; i++) {
    histogram[i] = 0;
}

for (int i = 0; i < vectorSize; i++) {
    histogram[surveyData[i] - 1]++;
}
int mostFrequent = 0;
for (int i = 1; i < MAX_RESPONSE; i++) {
    if (histogram[i] > histogram[mostFrequent])mostFrequent = i;
}
mostFrequent++;
```

_Note_: Reserve step isn't necessary but helps prevent vector from needing to resize as frequently.

We may not need an array for survey data, only for histogram.

We need a data structure only when we need to read in all the values before processing or need to process the values more than once. In this particular situation, neither condition is true.

```
const int MAX_RESPONSE = 10;
int histogram[MAX_RESPONSE];
for (int i = 0; i < MAX_RESPONSE; i++) {
    histogram[i] = 0;
}

int surveyResponse;
cout << "Enter new survey response or -1 to end: ";
cin >> surveyResponse;
while (surveyResponse != -1) {
    histogram[surveyResponse - 1]++;
    cout << "Enter next survey response or -1 to end: ";
    cin >> surveyResponse;
}
int mostFrequent = 0;
for (int i = 1; i < MAX_RESPONSE; i++) {
    if (histogram[i] > histogram[mostFrequent])
        mostFrequent = i;
}
mostFrequent++;
```

The vector version is inefficient in space because it stores values you don't need to store and inefficient in time because it adds an additional loop. In effect, it does more work without any corresponding benefit.

**Performance tuning**: Systematic analysis and improvement of a program's efficiency in time and space.

#### When to Choose an Array

If you are sure you need to process data multiple times and have a good idea about the maximum size, the last criterion for deciding whether or not to use an array is random access.

**Random access**: When it is possible to access any element at any time and it takes the same amount of time as accessing any other element.

If you only need sequential access, you might think about using a different data structure.

"Use arrays wisely, but don't let the perfect be the enemy of the good."
