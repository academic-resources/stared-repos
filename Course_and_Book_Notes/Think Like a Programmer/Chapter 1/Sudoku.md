## Problem: Sudoku

A 9x9 grid is partially filled with single digits (from 1-9) and the player must fill in the empty squares while meeting certain constraints. In each row and column, each digit must appear exactly once, and further, in each marked 3x3 area, each digit must appear exactly once

## Step 1: Restate Problem Constraints

1. The numbers 1-9 must appear exactly once per row
2. The numbers 1-9 must appear exactly once per column
3. The numbers 1-9 must appear exactly once per 3x3 grid

## Operations

1. Fill in grid based on information already provided
2. Start with area of grid most filled in and less uncertain

## Board

<table class="tg">
  <tr>
    <th class="tg-yj5y"></th>
    <th class="tg-yj5y">Col 0</th>
    <th class="tg-yj5y">Col 1</th>
    <th class="tg-yj5y">Col 2</th>
    <th class="tg-yj5y">Col 3</th>
    <th class="tg-yj5y">Col 4</th>
    <th class="tg-yj5y">Col 5</th>
    <th class="tg-yj5y">Col 6</th>
    <th class="tg-yj5y">Col 7</th>
    <th class="tg-yj5y">Col 8</th>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 0</td>
    <td class="tg-jnby"></td>
    <td class="tg-jnby">9</td>
    <td class="tg-jnby">1</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow">6</td>
    <td class="tg-c3ow"></td>
    <td class="tg-34fe">7</td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe"></td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 1</td>
    <td class="tg-jnby"></td>
    <td class="tg-jnby"></td>
    <td class="tg-jnby"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow">8</td>
    <td class="tg-c3ow">2</td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe">3</td>
    <td class="tg-34fe">9</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 2</td>
    <td class="tg-jnby">5</td>
    <td class="tg-jnby"></td>
    <td class="tg-jnby">3</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-34fe">2</td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe"></td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 3</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-34fe">9</td>
    <td class="tg-34fe">1</td>
    <td class="tg-34fe">3</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow">6</td>
    <td class="tg-c3ow">2</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 4</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow">2</td>
    <td class="tg-34fe">4</td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe">6</td>
    <td class="tg-c3ow">8</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 5</td>
    <td class="tg-c3ow">1</td>
    <td class="tg-c3ow">4</td>
    <td class="tg-c3ow"></td>
    <td class="tg-34fe">8</td>
    <td class="tg-34fe">2</td>
    <td class="tg-34fe">5</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 6</td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe">9</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-34fe">5</td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe">7</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 7</td>
    <td class="tg-34fe">6</td>
    <td class="tg-34fe">7</td>
    <td class="tg-34fe"></td>
    <td class="tg-c3ow">1</td>
    <td class="tg-c3ow">5</td>
    <td class="tg-c3ow"></td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe"></td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 8</td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe"></td>
    <td class="tg-34fe">5</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow">4</td>
    <td class="tg-c3ow"></td>
    <td class="tg-34fe">6</td>
    <td class="tg-34fe">9</td>
    <td class="tg-34fe"></td>
  </tr>
</table>

## Steps

1. Assess if any unambiguous solution for a square

- [4, 4] is the obvious starting point as the other squares in the 3x3 grid it belongs to are already filled out, leaving the only solution for that square to be 7

2. Col 4 now only has two open slots, on Row 2 and Row 6. As there are only two slots left in the row, we can rule out all the numbers that are already present in the row (1, 2, 4, 5, 6, 7, 9], leaving the only two options 3 and 9. There is already a 3 on Row 2 and there is already a 9 on Row 6, so we know that [2, 4] must be 9 and [6, 4] must be 3.

3. [3, 6] is a good next target. It can't be 1, 2, 3, 6, or 9 because those are already found in Row 3. Col 6 eliminates 5, 7, and 8. That leaves 4.

4. [7, 6] is a good next target. 1, 5, 6, 7 are eliminated because they are present in Row 7. 2, 4, and 8 are additionally eliminated by Col 6. The 3x3 grid eliminates 9. That leaves 3.

5. [5, 6] is a good target. 1, 2, 4, 5 are eliminated by Row 5. 3, 6, 7, 8 are eliminated by Col 6. That leaves 9.

6. [1, 6] now can only be 1 because 1 is the only number missing in Col 6.

7. [5, 7] is a good target. 1, 2, 4, 5, 8, 9 are elinated by Row 5. 3 and 6 are eliminated by Col 7. That leaves 7.

8. [5, 8] is a good target. 1, 2, 4, 5, 7, 8, 9 are eliminated by Row 7. 6 is eliminated by the 3x3 grid. Leaving 3.

9. [5, 2] has to be 6 because that's the only number missing in Row 5.

10. [0, 5] is a good target. 1, 6, 7, 9 are eliminated by Row 0. 2, 3, 5 are eliminated by Col 5. 8, 9 are eliminated by the 3x3 grid. Leaving 4.

11. [2, 5] is a non-obvious next target - there is not a 1 found in the 3x3 grid and the only other open slots in the grid are in Col 3, which already has a 1, which leaves [2, 5] having to be 1.

12. [2, 3] is a good next target. 1, 2, 3, 5 are eliminated by Row 2. 4, 8, 9 are eliminated by Col 3. 6 is eliminated by the 3x3. That leaves 7

13. [0, 3] is a good target. In the 3x3, only 5 and 3 are still missing and the open slots are [0, 3] and [1, 3]. However, Row 1 already has a 3, so [0, 3] must be the 3 in the 3x3.

14. That leaves [1, 3] being the 5.

15. [6, 5] is a good target. 3, 5, 7, 9 are eliminated by Row 6. 1, 2, 4, 6 are eliminated by Col 5. That leaves 8

16. [7, 5] is a good target. 1, 3, 5, 6, 7 are eliminated by Row 7. 2, 4, 8 are eliminated by Col 5. That leaves 9.

17. That leaves [8, 5] being 7 as it's the only number not accounted for in Col 5.

18. [8, 3] is a good target. 4, 5, 6, 7, 9 are eliminated by Row 8. 1, 3, 8 are eliminated by Col 3. That leaves 2.

19. [6, 3] has to be 6 as it's the only unaccounted number in the 3x3 and in Col 3.

20. [1, 1] is a good target. 1, 2, 3, 5, 8, 9 are eliminated by Row 1. 4, 7 are eliminated by Col 1. That leaves 6.

21. [2, 1] is a good target. 1, 2, 3, 5, 7, 9 are eliminated by Row 2. 4, 6 are eliminated by Col 1. That leaves 8.

22. [2, 7] is a good target. 1, 2, 3, 5, 7, 8, 9 are eliminated by Row 2. 6 is eliminated by Col 7. That leaves 4.

23. [2, 8] has to be 6 because it's the only number unaccounted for in Row 2.

24. [0, 0] is a good target. 1, 3, 4, 6, 7, 9 are eliminated by Row 0. 5 is eliminated by Col 0. 8 is eliminated by 3x3. That leaves 2.

25. [3, 1] is a good target. 1, 2, 3, 4, 6, 9 are eliminated by Row 3. 7, 8 are eliminated by Col 1. That leaves 5.

26. [6, 0] is a good target. 3, 5, 6, 7, 8, 9 are eliminated by Row 6. 1, 2 are eliminated by Col 0. That leaves 4.

27. This means [1, 2] must be 4 as Col 0 and Col 1 already have a 4, as do Rows 0 and 2.

28. This means [1, 0] has to be 7 as it is the only number missing in the 3x3 grid and in Row 1.

29. [3, 0] is a good target. 1, 2, 3, 4, 5, 6, 9 are eliminated by Row 3. 7 is eliminated by Col 0. That leaves 8.

30. This means [3, 2] has to be 7 as it's the only number missing from Row 3.

31. [4, 1] is a good target. 2, 4, 6, 7, 8 are eliminated by Row 4. 5, 9 are eliminated by Col 1. 1 is eliminated by the 3x3 grid. That leaves 3.

32. That means [4, 0] must be 9 as it's the only number missing from the 3x3.

33. That means [8, 0] has to be 3 as it's the only number missing from Col 0

34. [7, 2] has to be 8 as it's the only number missing from Col 2.

35. [6, 1] is a good target. 3, 4, 5, 6, 7, 8, 9 are eliminated by Row 6. While that leaves 1 and 2 as options, the only other empty slot in the 3x3 is [8, 1] and Row 8 already has a 2, leaving [6, 1] having to be 2.

36. That leaves [8, 1] having to be 1.

37. That leaves [8, 8] having to be 8 as it's the only missing number in Row 8.

38. [7, 7] is a good target. 1, 3, 5, 6, 7, 8, 9 are eliminated by Row 7. 4 is eliminated by Col 7. That leaves 2.

39. That leaves [6, 7] having to be 1 as it's the only missing number in Row 6.

40. That leaves [7, 8] having to be 4 as it's the only missing number in the 3x3 and in Row 7.

41. [4, 8] is a good target. In the 3x3, the only two numbers missing are 1 and 5. The other empty slot is [4, 7] and Col 7 already has a 1, so [4, 7] must be 1.

42. That means [4, 7] must be 5.

43. [0, 7] has to be 8 because that's the only number missing from Col 7

44. [0, 8] has to be 5 because that's the only number missing from Col 8

<table class="tg">
  <tr>
    <th class="tg-yj5y"></th>
    <th class="tg-yj5y">Col 0</th>
    <th class="tg-yj5y">Col 1</th>
    <th class="tg-yj5y">Col 2</th>
    <th class="tg-yj5y">Col 3</th>
    <th class="tg-yj5y">Col 4</th>
    <th class="tg-yj5y">Col 5</th>
    <th class="tg-yj5y">Col 6</th>
    <th class="tg-yj5y">Col 7</th>
    <th class="tg-yj5y">Col 8</th>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 0</td>
    <td class="tg-jnby">2</td>
    <td class="tg-jnby">9</td>
    <td class="tg-jnby">1</td>
    <td class="tg-c3ow">3</td>
    <td class="tg-c3ow">6</td>
    <td class="tg-c3ow">4</td>
    <td class="tg-34fe">7</td>
    <td class="tg-34fe">8</td>
    <td class="tg-34fe">5</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 1</td>
    <td class="tg-jnby">7</td>
    <td class="tg-jnby">6</td>
    <td class="tg-jnby">4</td>
    <td class="tg-c3ow">5</td>
    <td class="tg-c3ow">8</td>
    <td class="tg-c3ow">2</td>
    <td class="tg-34fe">1</td>
    <td class="tg-34fe">3</td>
    <td class="tg-34fe">9</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 2</td>
    <td class="tg-jnby">5</td>
    <td class="tg-jnby">8</td>
    <td class="tg-jnby">3</td>
    <td class="tg-c3ow">7</td>
    <td class="tg-c3ow">9</td>
    <td class="tg-c3ow">1</td>
    <td class="tg-34fe">2</td>
    <td class="tg-34fe">4</td>
    <td class="tg-34fe">6</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 3</td>
    <td class="tg-c3ow">8</td>
    <td class="tg-c3ow">5</td>
    <td class="tg-c3ow">7</td>
    <td class="tg-34fe">9</td>
    <td class="tg-34fe">1</td>
    <td class="tg-34fe">3</td>
    <td class="tg-c3ow">4</td>
    <td class="tg-c3ow">6</td>
    <td class="tg-c3ow">2</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 4</td>
    <td class="tg-c3ow">9</td>
    <td class="tg-c3ow">3</td>
    <td class="tg-c3ow">2</td>
    <td class="tg-34fe">4</td>
    <td class="tg-34fe">7</td>
    <td class="tg-34fe">6</td>
    <td class="tg-c3ow">8</td>
    <td class="tg-c3ow">5</td>
    <td class="tg-c3ow">1</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 5</td>
    <td class="tg-c3ow">1</td>
    <td class="tg-c3ow">4</td>
    <td class="tg-c3ow">6</td>
    <td class="tg-34fe">8</td>
    <td class="tg-34fe">2</td>
    <td class="tg-34fe">5</td>
    <td class="tg-c3ow">9</td>
    <td class="tg-c3ow">7</td>
    <td class="tg-c3ow">3</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 6</td>
    <td class="tg-34fe">4</td>
    <td class="tg-34fe">2</td>
    <td class="tg-34fe">9</td>
    <td class="tg-c3ow">6</td>
    <td class="tg-c3ow">3</td>
    <td class="tg-c3ow">8</td>
    <td class="tg-34fe">5</td>
    <td class="tg-34fe">1</td>
    <td class="tg-34fe">7</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 7</td>
    <td class="tg-34fe">6</td>
    <td class="tg-34fe">7</td>
    <td class="tg-34fe">8</td>
    <td class="tg-c3ow">1</td>
    <td class="tg-c3ow">5</td>
    <td class="tg-c3ow">9</td>
    <td class="tg-34fe">3</td>
    <td class="tg-34fe">2</td>
    <td class="tg-34fe">4</td>
  </tr>
  <tr>
    <td class="tg-yj5y">Row 8</td>
    <td class="tg-34fe">3</td>
    <td class="tg-34fe">1</td>
    <td class="tg-34fe">5</td>
    <td class="tg-c3ow">2</td>
    <td class="tg-c3ow">4</td>
    <td class="tg-c3ow">7</td>
    <td class="tg-34fe">6</td>
    <td class="tg-34fe">9</td>
    <td class="tg-34fe">8</td>
  </tr>
</table>

## Lessons Learned

Look for most constrained part of the problem.

In AI: In a problem where you are trying to assign different values to different variables to meet constraints, you should start with the variable with the most constraints/the variable with the lowest number of possible options.
