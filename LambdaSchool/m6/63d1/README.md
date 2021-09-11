# Sprint Challenge: Algorithms

In this week's Sprint you explored and implemented some classic algorithmic approaches and used them to solve novel problems. You also implemented some classic and fundamental sorting algorithms and learned how to go about evaluating their respective runtimes and performance. This Sprint Challenge aims to assess your comfort with these topics through exercises that build on the algorithmic intuition you've started to build up.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment. All work must be your own. Your Challenge score is a measure of your ability to work independently using the material covered throughout this sprint. You need to demonstrate proficiency in the
concepts and objectives that were introduced and that you practiced in the preceding days.

You are not allowed to collaborate during the Sprint Challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your TL and
Instructor in your cohort help channel on Slack. Your submitted work reflects your proficiency in the concepts and topics that were covered this sprint.

You have three hours to complete this Sprint Challenge. Plan your time accordingly.

## Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons) and it also helps your team lead to more thoroughly assess your work.

## Description

This Sprint Challenge is split into two separate parts that test your ability to analyze and write algorithms.

### Short Answer Questions 

 > It is recommended that you spend no more than 1 hour on this portion of the Sprint Challenge.

For this portion of the Sprint Challenge, you'll be answering questions posed in the `Algorithms_Questions.md` document inside the `Short-Answer` directory. Write down your answer and also write down a justification for _why_ you put down that answer. This could net you some partial credit if your justification is sound but the answer you put down turns out to not be correct. Add your answers to the questions in the `Algorithms_Answers.md` file.

#### 1. Analyzing runtime _(3 points)_

- [X] Given 3 blocks of code, identify the runtime of each. Justify your answer.

#### 2. Find the highest floor _(3 points)_

- [X] Suppose that you have an n-story building and plenty of eggs. Suppose also that an egg gets broken if it is thrown off floor f or higher, and doesn't get broken if dropped off a floor less than floor f. Devise a strategy to determine the value of f such that the number of dropped + broken eggs is minimized.

- [X] Write out your proposed algorithm in plain English or pseudocode AND give the runtime complexity of your solution.

### Code Challenges

#### 3. Use recursion to complete the `count_th()` function _(3 points)_

Inside the `recursive_count_th` directory you'll find the `count_th.py` file. In this file, please add your recursive implementation to the `count_th()` method following these rules:

- [X] Your function should take in a signle parameter (a string `word`)
- [X] Your function should return a count of how many occurences of ***"th"*** occur within `word`. Case matters.
- [X] Your function must utilize recursion. 
- [X] It cannot contain any loops.

Run `python test_count_th.py` to run the tests for your `count_th()` function to ensure that your implementation is correct.

#### 4. Understand, plan, & implement the Robot Sort algorithm _(6 points)_

You have been given a robot with very basic capabilities:

- [X] It can move left or right.
- [X] It can pick up an item
- [X] If it tries to pick up an item while already holding one, it will swap the items instead.
- [X] It can compare the item it's holding to the item in front of it.
- [X] It can switch a light on its head on or off.

Your task is to program this robot to sort lists using ONLY these abilities.

##### Rules

Inside the `robot_sort` directory you'll find the `robot_sort.py` file. Open it up and read through each of the robot's abilities. Once you've understood those, start filling out the `sort()` method following these rules:

- [X] You may use any pre-defined robot methods.
- [X] You may NOT modify any pre-defined robot methods.
- [X] You may use logical operators. (`if`, `and`, `or`, `not`, etc.)
- [X] You may use comparison operators. (`>`, `>=`, `<`, `<=`, `==`, `is`, etc.)
- [X] You may use iterators. (`while`, `for`, `break`, `continue`)
- [X] You may NOT store any variables. (`=`)
- [X] You may NOT access any instance variables directly. (`self._anything`)
- [X] You may NOT use any Python libraries or class methods. (`sorted()`, etc.)
- [X] You may define robot helper methods, as long as they follow all the rules.

##### Hints

- [X] Make sure you understand the problem and all of the rules! A solution that breaks the rules will not receive full credit.
- [X] If you're unsure if an operator or method is allowed, ask.
- [X] Lay out some numbered cards in a line and try sorting them as if you were the robot.
- [X] Come up with a plan and write out your algorithm before coding. If your plan is sound but you don't reach a working implementation in three hours, you may receive partial credit.
- [X] There is no efficiency requirement but you may lose points for an unreasonably slow solution. Tests should run in far less than 1 second.
- [X] We discussed a sorting method this week that might be useful. Which one?
- [X] The robot has exactly one bit of memory: its light. Why is this important?

Run `python test_robot.py` to run the tests for your `robot_sort()` function to ensure that your implementation is correct.

### Stretch 

- [X] Uncomment the `test_stretch_times()` test in `test_robot.py`. Can you optimize your robot sort to perform better than the given times?

## Rubric
| OBJECTIVE | TASK | 1 - DOES NOT MEET Expectations | 2 - MEETS Expectations | 3 - EXCEEDS Expectations | SCORE |
| ---------- | ----- | ------- | ------- | ------- | -- |
| _Student should be able to define what runtime complexity is, differentiate between various classifications and categorize the performance of an algorithm using Big O notation_ | 1. Complete Analysis of Algorithms - Exercise I | Student correctly identifies 0-1/3 runtimes | Student correctly identifies 2/3 runtimes | Student correctly identifies 3/3 runtimes | 3 |
| _Student should be able to describe the differences between Linear and Binary Searching algorithms_ | 2. Complete Analysis of Algorithms - Exercise II | Student does NOT clearly identify a strategy that would allow us to search for and find floor `f`.<br/><br/>It is either incorrect **OR** requires the TL to make assumptions about how the strategy works. | Student's answer describes a searching strategy **BUT** either i) does NOT correctly identify the runtime **OR** ii) recommends an approach that will work but is not ideal in terms of efficiency |  Student's answer describes a strategy that functions (like Binary Search) and is easy to understand (if their description is in English, all details are provided, if in psuedocode, variables names make sense, code is clean and easy to follow) **AND** performs better than (O(n)) **AND** identifies the runtime correctly. | 3 |
| _Student should be able to identify when a problem is amenable to a recursive solution and utilize recursion in order to solve it_ | 3. Utilize recursion to complete `count_th()` | Student's function does not compile & run **OR** <br/><br/>runs but does NOT pass a minimum of **4/5** of test cases. | Student's function passes **4/5** of test cases | Student's function passes **ALL** test cases | 3 |
| _Student should be able to demonstrate an understanding of the implementation of various iterative & recursive sorting algorithms_ | 4. Understand and plan an approach to implement the `robot_sort()` function | Student's comments, psuedocode, or solution will not sort a collection of elements because it is incomplete or contains 4 or more errors preventing it from executing as intended.  | Student's comments, psuedocode, or solution has **MOST** of the elements needed for a robot to sort a given collection of items. May contain up to 3 minor errors. <br/><br/> Robot Sort rules violations will not be held against students in this row. | Student's comments, psuedocode, or solution has **ALL** of the elements needed for a robot to sort a given collection of items. Contains no errors or missing logic. Clear & easy to follow algorithm. <br/><br/> Robot Sort rules violations will not be held against students in this row. | 3 |
|  _Student should be able to approach a novel problem and come up with a workable first-pass solution._ | 5. Implement the `robot_sort()` function | Student's function does not compile & run **OR** <br/><br/>runs but fails to pass a minimum of **4/5** of test cases. | Student's function follows **ALL** [rules](https://github.com/LambdaSchool/Sprint-Challenge--Algorithms#rules) **BUT** only passes **4/5** of test cases, takes longer than 1 second to run OR the student cannot clearly explain what some segments of the code are doing to the TL. | Student's function follows **ALL** [rules](https://github.com/LambdaSchool/Sprint-Challenge--Algorithms#rules), runs in less than 1 second **AND** passes **ALL** test cases. Code is well-formatted, includes appropriate comments, and student can walk-through their solution and explain their process clearly to the TL. | 3 | 
| _Student should be able to apply techniques such as memoization or heuristics to improve an existing first-pass solution_ | [STRETCH] Optimize `robot_sort()` to improve runtime  | Student's function passes ALL test cases **AND** <br/> **1/4** stretch tests outperform the benchmark | Student's function passes ALL test cases **AND** <br/> **2/4** stretch tests outperform the benchmark | Student's function passes ALL test cases **AND** <br/> **4/4** stretch tests outperform the benchmark | 3 |


### Passing the Sprint
Score ranges for a 1, 2, and 3 are shown in the rubric above. For a student to have _passed_ a sprint challenge, they need to earn an **average of at least 2** for all items on the rubric.
