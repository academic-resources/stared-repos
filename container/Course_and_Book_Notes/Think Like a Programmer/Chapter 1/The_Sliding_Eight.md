## Problem: The Sliding Eight

A 3x3 grid is filled with 8 tiles, numbered 1 through 8, and one empty space. A tile can be slid into an adjacently empty space, leaving the tile's previous location empty. The goal is to slide the tiles to place the grid in an ordered configuration from 1 in the upper left

## Step 1 - Restate the problem constraints

1. A tile can be slid into an adjacently empty space
2. If a tile is moved to an empty space, previous location becomes the empty space
3. The 1 tile must end up in the upper left
4. The grid must end up ordered

## Step 2 - Operations

1. Look at the position of the tiles in the grid
2. Move a numbered tile to an empty space
3. Repeat until ordered

## Solution should look like:

| 1   | 2   | 3   |
| --- | --- | --- |
| 4   | 5   | 6   |
| 7   | 8   |     |

## A starting position:

| 4   | 7   | 2   |
| --- | --- | --- |
| 8   | 6   | 1   |
| 3   | 5   |     |

## Solution

Form a train of consecutive numbers to maintain order. Solve for a row or column in order to break up problem into smaller problems

Left:⇦

Right:⇨

Up:⇧

Down:⇩

**Step 1**

| 4   | 7   | 2   |
| --- | --- | --- |
| 8   | 6   | 1   |
| 3   | 5   | ⇩   |

**Step 2**

| 4   | 7   | 2   |
| --- | --- | --- |
| 8   | 6   | ⇩   |
| 3   | 5   | 1   |

**Step 3**

| 4   | 7   | ⇨   |
| --- | --- | --- |
| 8   | 6   | 2   |
| 3   | 5   | 1   |

**Step 4**

| 4   | ⇧   | 7   |
| --- | --- | --- |
| 8   | 6   | 2   |
| 3   | 5   | 1   |

**Step 5**

| 4   | 6   | 7   |
| --- | --- | --- |
| 8   | ⇧   | 2   |
| 3   | 5   | 1   |

**Step 6**

| 4   | 6   | 7   |
| --- | --- | --- |
| 8   | 5   | 2   |
| 3   | ⇦   | 1   |

**Step 7**

| 4   | 6   | 7   |
| --- | --- | --- |
| 8   | 5   | 2   |
| 3   | 1   | ⇩   |

**Step 8**

| 4   | 6   | 7   |
| --- | --- | --- |
| 8   | 5   | ⇩   |
| 3   | 1   | 2   |

**Step 9**

| 4   | 6   | ⇨   |
| --- | --- | --- |
| 8   | 5   | 7   |
| 3   | 1   | 2   |

**Step 10**

| 4   | ⇧   | 6   |
| --- | --- | --- |
| 8   | 5   | 7   |
| 3   | 1   | 2   |

**Step 11**

| 4   | 5   | 6   |
| --- | --- | --- |
| 8   | ⇧   | 7   |
| 3   | 1   | 2   |

**Step 12**

| 4   | 5   | 6   |
| --- | --- | --- |
| 8   | 1   | 7   |
| 3   | ⇦   | 2   |

**Step 13**

| 4   | 5   | 6   |
| --- | --- | --- |
| 8   | 1   | 7   |
| 3   | 2   | ⇩   |

**Step 14**

| 4   | 5   | 6   |
| --- | --- | --- |
| 8   | 1   | ⇨   |
| 3   | 2   | 7   |

**Step 15**

| 4   | 5   | 6   |
| --- | --- | --- |
| 8   | ⇧   | 1   |
| 3   | 2   | 7   |

**Step 16**

| 4   | 5   | 6   |
| --- | --- | --- |
| 8   | 2   | 1   |
| 3   | ⇨   | 7   |

**Step 17**

| 4   | 5   | 6   |
| --- | --- | --- |
| 8   | 2   | 1   |
| ⇩   | 3   | 7   |

**Step 18**

| 4   | 5   | 6   |
| --- | --- | --- |
| ⇩   | 2   | 1   |
| 8   | 3   | 7   |

**Step 19**

| ⇦   | 5   | 6   |
| --- | --- | --- |
| 4   | 2   | 1   |
| 8   | 3   | 7   |

**Step 20**

| 5   | ⇦   | 6   |
| --- | --- | --- |
| 4   | 2   | 1   |
| 8   | 3   | 7   |

**Step 21**

| 5   | 6   | ⇧   |
| --- | --- | --- |
| 4   | 2   | 1   |
| 8   | 3   | 7   |

**Step 22**

| 5   | 6   | 1   |
| --- | --- | --- |
| 4   | 2   | ⇨   |
| 8   | 3   | 7   |

**Step 23**

| 5   | 6   | 1   |
| --- | --- | --- |
| 4   | ⇧   | 2   |
| 8   | 3   | 7   |

**Step 24**

| 5   | 6   | 1   |
| --- | --- | --- |
| 4   | 3   | 2   |
| 8   | ⇨   | 7   |

**Step 25**

| 5   | 6   | 1   |
| --- | --- | --- |
| 4   | 3   | 2   |
| ⇩   | 8   | 7   |

**Step 26**

| 5   | 6   | 1   |
| --- | --- | --- |
| ⇩   | 3   | 2   |
| 4   | 8   | 7   |

**Step 27**

| ⇦   | 6   | 1   |
| --- | --- | --- |
| 5   | 3   | 2   |
| 4   | 8   | 7   |

**Step 28**

| 6   | ⇦   | 1   |
| --- | --- | --- |
| 5   | 3   | 2   |
| 4   | 8   | 7   |

**Step 29**

| 6   | 1   | ⇧   |
| --- | --- | --- |
| 5   | 3   | 2   |
| 4   | 8   | 7   |

**Step 30**

| 6   | 1   | 2   |
| --- | --- | --- |
| 5   | 3   | ⇨   |
| 4   | 8   | 7   |

**Step 31**

| 6   | 1   | 2   |
| --- | --- | --- |
| 5   | ⇧   | 3   |
| 4   | 8   | 7   |

**Step 32**

| 6   | 1   | 2   |
| --- | --- | --- |
| 5   | 8   | 3   |
| 4   | ⇨   | 7   |

**Step 33**

| 6   | 1   | 2   |
| --- | --- | --- |
| 5   | 8   | 3   |
| ⇩   | 4   | 7   |

**Step 34**

| 6   | 1   | 2   |
| --- | --- | --- |
| ⇩   | 8   | 3   |
| 5   | 4   | 7   |

**Step 35**

| ⇦   | 1   | 2   |
| --- | --- | --- |
| 6   | 8   | 3   |
| 5   | 4   | 7   |

**Step 36**

| 1   | ⇦   | 2   |
| --- | --- | --- |
| 6   | 8   | 3   |
| 5   | 4   | 7   |

**Step 37**

| 1   | 2   | ⇧   |
| --- | --- | --- |
| 6   | 8   | 3   |
| 5   | 4   | 7   |

**Step 38**

| 1   | 2   | 3   |
| --- | --- | --- |
| 6   | 8   | ⇨   |
| 5   | 4   | 7   |

**Step 39**

| 1   | 2   | 3   |
| --- | --- | --- |
| 6   | ⇨   | 8   |
| 5   | 4   | 7   |

**Step 40**

| 1   | 2   | 3   |
| --- | --- | --- |
| ⇧   | 6   | 8   |
| 5   | 4   | 7   |

**Step 41**

| 1   | 2   | 3   |
| --- | --- | --- |
| 5   | 6   | 8   |
| ⇦   | 4   | 7   |

**Step 42**

| 1   | 2   | 3   |
| --- | --- | --- |
| 5   | 6   | 8   |
| 4   | ⇦   | 7   |

**Step 43**

| 1   | 2   | 3   |
| --- | --- | --- |
| 5   | 6   | 8   |
| 4   | 7   | ⇩   |

**Step 44**

| 1   | 2   | 3   |
| --- | --- | --- |
| 5   | 6   | ⇨   |
| 4   | 7   | 8   |

**Step 45**

| 1   | 2   | 3   |
| --- | --- | --- |
| 5   | ⇨   | 6   |
| 4   | 7   | 8   |

**Step 46**

| 1   | 2   | 3   |
| --- | --- | --- |
| ⇧   | 5   | 6   |
| 4   | 7   | 8   |

**Step 47**

| 1   | 2   | 3   |
| --- | --- | --- |
| 4   | 5   | 6   |
| ⇦   | 7   | 8   |

**Step 48**

| 1   | 2   | 3   |
| --- | --- | --- |
| 4   | 5   | 6   |
| 7   | ⇦   | 8   |

**Step 49**

| 1   | 2   | 3   |
| --- | --- | --- |
| 4   | 5   | 6   |
| 7   | 8   |     |

\*Note: This was much easier to document on paper.

## Lessons Learned:

1.  In solving problems, you are sometimes faced with situations where you wont' see a clear path to code a solution. You must never use that as an excuse to forgo planning and systematic approaches.
2.  Sometimes problems are divisible in ways that aren't immediately obvious. Looking for a way to divide a problem is usually time well spent.

- Even if you are unable to find a clean division, you may learn something about the problem that helps you solve it.

"When solving problems, working with a specific goal in mind is always better than random effort, whether you achieve that specific goal or not."
