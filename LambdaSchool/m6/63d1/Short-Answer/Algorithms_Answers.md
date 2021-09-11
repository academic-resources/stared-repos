#### Please add your answers to the ***Analysis of  Algorithms*** exercises here.

## Exercise I

a) O(n) because n is the difference between the powers n^2 (worth of each step) and n^3 (max)

b) O(n^2) because there are two nested loops

c) O(n) because it is recursive

## Exercise II

- loop through 0 to n-1 to represent each story
- you will not actually loop through every story, only up to where the eggs start breaking
- try to drop an egg off of each floor
- if it is successful (no breakage), go to next floor
- if egg breaks, save current story as variable and exit loop
- subtract 1 from current story
- return story
- The runtime of this would be O(n) because there is one loop and it is dependent on the number of building stories.

- Alternatively, you could do a binary search, start at n/2 and then do upper or lower half depending on if it breaks or not until you get the max floor.
- This would be runtime O(log n).
