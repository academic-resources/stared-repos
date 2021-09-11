
# Lecture II Notes
a. [Additional Resources](#Additional-Resources)  
b. [Divide and Conquer](#Divide-and-Conquer)  
c. [Quick Sort](#Quick-Sort)  
d. [Implementing Quick Sort](#Implementing-Quick-Sort)   
e. [In Place Sorting](#In-Place-Sorting)   

<br>

If you feel so inclined, you can contribute to these notes by [donating coffee to the author](buymeacoff.ee/G1stPBuYU), for caffeine-fueled focus during lectures.    

<br>

# Additional Resources

[Sorting Algorithms Animations](https://www.toptal.com/developers/sorting-algorithms)  

[How to Compare Algorithm Run Time in Python](https://pythonhow.com/measure-execution-time-python-code/)  

[Sorting Algorithms on Geeks for Geeks](https://www.geeksforgeeks.org/searching-algorithms/)   

[How to Analyze Time Complexity of Sort and Search Algorithms](https://python-textbok.readthedocs.io/en/1.0/Sorting_and_Searching_Algorithms.html)  

[Sorting Algorithm Walk Through Visualizations](https://visualgo.net/en/sorting?slide=1)  

[Python Tutor: Debug Your Code Step By Step](http://www.pythontutor.com/visualize.html#mode=edit)  

Additional Algorithmic Practice Problems: [Find the rotation point](practice_algs/find_rotation_point.py), [Find the smallest missing element](practice_algs/smallest_missing_element.py), and [sorted matrix search](practice_algs/sorted_matrix.py). Video recording of lecture reviewing these with Sean Chen found [here](https://youtu.be/2nPItBCCjMA).  

<br>

![Search and Sort Complexities](./search_sort_complexities.png "Search and Sort Complexities")  

<br>
<br>

# Divide and Conquer

[Lecture II Recording](https://www.youtube.com/watch?v=hPQ0gr9cTPc&feature=youtu.be)  

<br>

> "It's only a problem if it's a problem"  
> - Beej Jorgensen  

<br>

When would we use recursive solutions? Tree traversals and quick sort are instances where recursion creates an elegant solution that wouldn't be as possible iteratively.

Divide and conquer is when we take a problem, split it into the same type of sub-problem, and run the algorithm on those sub-problems.

<br>

If we have an algorithm that runs on a list, we could break the list into smaller lists and run the algorithm on those smaller lists. We will _divide_ the data into more manageable pieces.

We break down our algorithm problems into `base cases` -- the smallest possible size of data we can run our algorithm upon to determine the basic way our algorithm should work.

These solutions can give us better time complexity solutions; however, they wouldn't work if a portion of the algorithm's data is _dependent_ upon the rest. If we broke the list into two halves, and one half is required to work on the other half, we could not use recursion.

Recursion requires independent sub-data.

<br>


Let's apply recursion to breaking down what a list is. The sum of a list is equal to the first element plus the rest of the list. We could write that like in this `add_list` function found in [this file](day2_work.py):

<br>

```
def add_list(l):
    # The sum of an empty list is 0
    if l == []:
        return 0

    return l[0] + add_list(l[1:])


l = [1,2,3,4]

print(add_list(l)) # Should print 10

```

<br>

This should print 10, or the sum of the items in our list.

On each pass, the `add_list` function is taking the first item and adding the sum of the rest of the list, found by calling `add_list` on the remainder of the list. This would loop through the rest of the list in this manner, only adding together the elements once the final element was reached.

Finding a sum like this is not the most time efficient -- it would be better to do iteratively. But this allows us to understand how recursion works.

Often, iterative solutions are easier to read and more performant. 

If we add a print statement into the `add_list` function:

<br>

```

    print(f'Add {l[0]} to the sum of {l[1:]}')
    return l[0] + add_list(l[1:])
```

<br>


The terminal would print:

>Add 1 to the sum of [2, 3, 4]  
>Add 2 to the sum of [3, 4]  
>Add 3 to the sum of [4]  
>Add 4 to the sum of []  
>10  


This helps us understand what is happening at each recursive step.

Our base case is an empty list or 0, which is what we handle at the beginning of our function with returning 0 if the list is empty. By filling that in, it gives us our first return, so that each previous `add_list` call can be resolved based on the sum of the next.

<br>

When we use recursion, it uses a lot of memory, so each recursive calls allocates an amount of memory. We have a pre-set recursion limit in case we write an infinitely recursive algorithm to prevent our computer needing to reboot to end the algorithm.

With Big O, we're interested in the number of times we have to run an operation. `add_list` just runs basic addition, which is a single operation, and it is being called one time for every element in the list, so this is `O(n)`.

<br>
<br>

# Quick Sort

Quick sort is a great example use case of a recursive appropriate solution.

We need to include a base case and then call itself.

Quick sort sorts a list using `partitioning`. The partitioning process involves splitting up data around the `pivot`.

If our list is `[5, 3, 9, 4, 8, 1, 7]`. 

We'll choose a pivot point to split the list. Let's say we choose 5 as the pivot. One list will contain all the numbers less than 5, and the other will contain all the numbers greater than or equal to 5. This results in two lists like so:

> [3, 4, 1] 5 [9, 8, 7]

5 is already sorted into the correct place that it needs to be. All the numbers to the right and left of it are in the area they need to, just not yet sorted.

This process is partitioning.

<br>

Our next step is to repeat this process until we hit our base case, which is an empty list or a list with just one element. When everything is down to one element lists, then we know they are properly sorted.

> 3 and 9 are our next pivots:  
> [1] 3 [4] 5 [8, 7] 9  
> Next, 8 is our pivot:  
> [1] 3 [4] 5 [7] 8 [] 9  
> 1 3 4 5 7 8 9  

The number of sorted items doubles with each pass through this algorithm, and we have to make one complete pass through the data on each loop. That means each pass is O(n), and we have to make `log n` passes.

It takes `O(log n)` steps to pass through, with each pass taking `O(n)`, so the _average_ case is `O(n log n)`, the fastest search we can aim for.

<br>

What would be a bad case for quick sort?

[1, 2, 3, 4, 5, 6, 7]

If we look at the order of this on each loop:

> [] 1 [2, 3, 4, 5, 6, 7]  
> 1 [] 2 [3, 4, 5, 6, 7]  
> 1 2 [] 3 [4, 5, 6, 7]  
> 1 2 3 [] 4 [5, 6, 7]  
> 1 2 3 4 [] 5 [6, 7]  
> 1 2 3 4 5 [] 6 [7]  
> 1 2 3 4 5 6 7  

This took a full 7 passes, for 7 elements, because there was only one sorted item being added with each pass.

Already sorted lists are the worst case scenario which results in an order `O(n^2)`.

Quick sort shines when the first pivot chosen is roughly the median value of the list. Now, since we can't always choose the median value with the traditional quick sort.

We could use `quick select` to find the median at each step -- but this slows down our algorithm to `O(n)` run time on average.

If we choose a _random_ pivot point, we generally do not pick the worst case pivot with each pass. Randomly selecting a pivot point results in the most time efficient average.

<br>
<br>

# Implementing Quick Sort

If we were to write out our quick sort algorithm in a basic way, it would look something like this:

<br>

```
def quicksort(list):
    # One of our base cases is an empty list or list with one element
    if len(list) == 0 or len(list) == 1:
        return list

    # If we have a left list, a pivot point and a right list...
    left, pivot, right = partition(list)
    
    # Our sorted list looks like left + pivot + right, but sorted.
    # Pivot has to be in brackets to be a list, so python can concatenate all the elements to a single list
    return quicksort(left) + [pivot] + quicksort(right)
```

<br>

Let's define our partition function next:

<br>

```
def partition(list):
    left = []
    pivot = list[0] # Or make random, as a stretch
    right = []

    for v in list[1:]:
        if v < pivot:
            left.append(v)
        else:
            right.append(v)
            
    return left, pivot, right
```

<br>

Let's test out a bunch of possible cases like so:

<br>

```
print(quicksort([]))
print(quicksort([1]))
print(quicksort([1,2]))
print(quicksort([2,1]))
print(quicksort([2,2]))
print(quicksort([5,3,9,4,8,1,7]))
print(quicksort([1,2,3,4,5,6,7]))
print(quicksort([9,8,7,6,5,4,3,2,1]))
```

<br>

We already know off the tops of our heads that we have not setup our algorithm to handle edge cases like an input that is not a list, or is a list full of strings, etc.

Our terminal returns back:

<br>

```
[]
[1]
[1, 2]
[1, 2]
[2, 2]
[1, 3, 4, 5, 7, 8, 9]
[1, 2, 3, 4, 5, 6, 7]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

So we can see that it handles all of our tests well.

It's important to analyze what you know about your incoming data before choosing a type of algorithm. If you know that your list is almost completely sorted, bubble sort would handle that the quickest. If the list is completely garbled, quick sort would be best.

Even when we aren't handling sort, we need to customize our algorithmic choices to the data anticipated, _especially_ when dealing with large sets of data where time performance can have a huge impact.

<br>
<br>


# In Place Sorting

The quick sort function we wrote is not an in-place solution. When we sort that list, we're actually returning an entirely _new_ list. It's not returning the same list.

This isn't time or space efficient because it takes time and data to copy lists over to newly allocated spots in memory. It would be more efficient to move items around within the original given list.

This is `in-place sorting` -- using the original list to sort items within it and returning that same original list, but now sorted. We mutate the original list rather than making new lists.

<br>

To do in-place sorting, we need to be able to pass into the function the bounds of the current part of the list that we're working on, to ensure that we are only working on certain segments of the list at a time.

We can give it a low index, and a high index, to indicate the start and stop points of the section of the list to work on.

As we keep going, the low and high indices will change. Our base case should now change to where if the low and high are the _same_, then our list is sorted.

Let's try it:

<br>

```
def quicksort2(l, low, high):
    if len(l) == 0 or len(l) == 1:
        return l
    
    if low >= high:
        return l

    pivot_index = low

    # Partitioning
    for i in range(low, high):
        
        if l[i] < l[pivot_index]:
            # If i is less than pivot, we need to swap it with the item after the pivot
            l[i], l[pivot_index + 1] = l[pivot_index + 1], l[i]

            # Then we'll swap the pivot with the item after the pivot
            l[pivot_index], l[pivot_index + 1] = l[pivot_index + 1], l[pivot_index]

            # Update the pivot index:
            pivot_index += 1
    
    # Sort from low to the pivot index
    quicksort2(l, low, pivot_index)
    # Sort from the pivot index to high
    quicksort2(l, pivot_index + 1, high)
```

<br>

We're iterating through the list and checking if the item at `list[i]` is less than the item at `list[pivot_index]`. If it is, then we need to swap these items. 

That has to happen in two steps. First we swap i with an item one _beyond_ the pivot index. Then we swap the pivot with the item after the pivot.

Then we update the pivot index to search for the next item to sort in the array.

In order to call this function without passing in three parameters, we can write a short helper function:

<br>

```
def in_place_quicksort(l):
    return quicksort2(l, 0, len(l))

print(in_place_quicksort([]))
print(in_place_quicksort([1]))
print(in_place_quicksort([1,2]))
print(in_place_quicksort([2,1]))
print(in_place_quicksort([2,2]))
print(in_place_quicksort([5,3,9,4,8,1,7]))
print(in_place_quicksort([1,2,3,4,5,6,7]))
print(in_place_quicksort([9,8,7,6,5,4,3,2,1]))
```

<br>

Now we can run this function and it sorts our lists without allocating extra memory.

Let's add some print statements just to see exactly what is happening at each step on one of the sorts:

<br>

```
Our starting list is [5,3,9,4,8]. 

Checking against 5. Current list is [5, 3, 9, 4]. 

Checking against 3. Current list is [5, 3, 9, 4]. 

3 is less than 5, so we need to swap l[i] (3) with l[pivot_index + 1] (3).
Next, we will swap 5 with 3 and increase the pivot index from 0 to 1.
Now the current list is [3, 5, 9, 4] 

Checking against 9. Current list is [3, 5, 9, 4]. 

Checking against 4. Current list is [3, 5, 9, 4]. 

4 is less than 5, so we need to swap l[i] (4) with l[pivot_index + 1] (9).
Next, we will swap 5 with 4 and increase the pivot index from 1 to 2.
Now the current list is [3, 4, 5, 9] 


Splitting list to check quicksort([3, 4, 5, 9], 0, 2) and quicksort([3, 4, 5, 9], 3, 4). 


Checking against 3. Current list is [3, 4, 5, 9]. 

Checking against 4. Current list is [3, 4, 5, 9]. 



Splitting list to check quicksort([3, 4, 5, 9], 0, 0) and quicksort([3, 4, 5, 9], 1, 2). 

Checking against 4. Current list is [3, 4, 5, 9]. 



Splitting list to check quicksort([3, 4, 5, 9], 1, 1) and quicksort([3, 4, 5, 9], 2, 2). 

Checking against 9. Current list is [3, 4, 5, 9]. 



Splitting list to check quicksort([3, 4, 5, 9], 3, 3) and quicksort([3, 4, 5, 9], 4, 4). 

Our final sorted list is [3, 4, 5, 9]

```

<br>


This helps us visualize why we go through each swapping step and how the list is slowly being sorted, and split apart into smaller sorting lists.

<br>
<br>
