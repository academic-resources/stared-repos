Notes for Chapter 3 can be found in [Chapter 3 Notes](./Chapter_3_Notes.md)

Chapter 3 introduces a student struct and a salesperson array that are utilized in the different exercises.

The student struct is:

```
struct student {
    int grade;
    int studentID;
    string name;
};
```

The salesperson array is:

```
int sales[NUM_AGENTS][NUM_MONTHS] = {
    {1856, 498, 30924, 87478, 328, 2653, 387, 3754, 387587, 2873, 276, 32}
    {5685, 5456, 3758, 6453, 98357, 2334, 1233, 2333, 3222, 1123, 13443, 3443},
    {34433, 343566, 24567, 35453, 1343, 1435, 1334, 1254, 454, 3453, 7853, 4343}
}
```

[Exercises](./Exercises.md) is a list of exercises from Chapter 3.

[3-1.c](./3-1.c) is a C program for sorting an array of student structs.

[3-1.cpp](./3-1.cpp) is a C++ implementation of the same thing.

[3-2.c](./3-1.c) is a C program for finding the agent with the highest median sales.

[3-3.cpp](./3-3.cpp) is a C++ program for determining whether or not an array is sorted.

[3-4.cpp](./3-4.cpp) is a C++ program that takes in a string and returns a ciphertext.

[3-5.cpp](./3-5.cpp) is a C++ program that not only creates a ciphertext but also returns the original plaintext

[3-6.cpp](./3-6.cpp) is a C++ program that creates a ciphertext using a randomly generated cipher array.

[3-7.cpp](./3-7.cpp) is a C++ program that determines a mode of a given array of integers (though it returns the first mode and ignores others if there is a tie).

[3-7b.cpp](./3-7b.cpp) is an improvement on 3-7 in that it returns the highest mode, the lowest mode, and the number of modes present in the array (though it still doesn't return all of the modes that exist).

[3-8.c](./3-8.c) is a C program that determines the 1st, 2nd, and 3rd quartiles of the student array.

[3.8cpp](./3-8.cpp) is a broken attempt at the former program.

[3-8.md](./3-8.md) is a markdown file where I document my thinking process in trying to solve the exercise as I was stuck on this problem longer than most and opted to eventually write it out by hand in an attempt to solve it (which I should have done at the start).

[3-9.c](./3-9.c) is a C program that is a slight modification on the earlier 3-2.c, allowing the marking of non-working months with a -1 while still calculating the highest sales median.
