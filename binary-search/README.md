# Binary Search

This project contains a skeleton for you to implement Binary Search. In the
file **lib/binary_search.js**, you should implement the Binary Search and its
cousin Binary Search Index.

The Binary Search algorithm can be summarized as the following:

1. If the array is empty, then return false
2. Check the value in the middle of the array against the target value
3. If the value is equal to the target value, then return true
4. If the value is less than the target value, then return the binary search on
   the left half of the array for the target
5. If the value is greater than the target value, then return the binary search
   on the right half of the array for the target

This is a description of how the Binary Search works (and is also in the code
file).

```
procedure binary search (list, target)
  parameter list: a list of sorted value
  parameter target: the value to search for

  if the list has zero length, then return false

  determine the slice point:
    if the list has an even number of elements,
      the slice point is the number of elements
      divided by two
    if the list has an odd number of elements,
      the slice point is the number of elements
      minus one divided by two

  create an list of the elements from 0 to the
    slice point, not including the slice point,
    which is known as the "left half"
  create an list of the elements from the
    slice point to the end of the list which is
    known as the "right half"

  if the target is less than the value in the
    original array at the slice point, then
    return the binary search of the "left half"
    and the target
  if the target is greater than the value in the
    original array at the slice point, then
    return the binary search of the "right half"
    and the target
  if neither of those is true, return true
end procedure binary search
```

Then you need to adapt that to return _the index_ of the found item rather than
a Boolean value. The pseudocode is also in the code file.

```
procedure binary search index(list, target, low, high)
  parameter list: a list of sorted value
  parameter target: the value to search for
  parameter low: the lower index for the search
  parameter high: the upper index for the search

  if low is equal to high, then return -1 to indicate
    that the value was not found

  determine the slice point:
    if the list has an even number of elements,
      the slice point is the number of elements
      divided by two
    if the list has an odd number of elements,
      the slice point is the number of elements
      minus one divided by two

  if the target is less than the value in the
    original array at the slice point, then
    return the binary search of the array,
    the target, low, and the slice point
  if the target is greater than the value in the
    original array at the slice point, then return
    the binary search of the array, the target,
    the slice point plus one, and high
  if neither of those is true, return true
end procedure binary search index
```


* Clone the project from
  https://github.com/appacademy-starters/algorithms-binary-search-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/binary_search.js` that implements the Binary Search and Binary
  Search Index.
