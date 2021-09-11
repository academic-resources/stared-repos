# -------------------------------------------------------------------------------------- #
# Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.

# -------------------------------------------------------------------------------------- #


def bubble_sort(array):
    # Loop through entire array
    for i in range(len(array) - 1):
        # Last i elements are already in place
        for j in range(len(array) - i - 1):
            # Traverse the array from 0 to len(array)-i-1
            # Swap if the element found is greater than the next element
            if array[j] > array[j + 1]:
                array[j], array[j + 1] = array[j + 1], array[j]


def bubble_sort_2(array):
    n = len(array)

    # Traverse through all array elements
    for i in range(n):
        swapped = False

        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Traverse the array from 0 to n-i-1.  Swap the element
            #  if the next element is greater
            if array[j] > array[j + 1]:
                array[j], array[j + 1] = array[j + 1], array[j]
                swapped = True

            # IF no two elements were swapped by the inner loop, break
        if swapped == False:
            break


class bubbleSort:
    """
        bubbleSort:
            function:
                bubbleSortRecursive: recursive function to sort array
                __str__: format print of array
                __init__: constructor function in Python

            variables:
                self.array = contains array
                self.length = contains length
    """
    def __init__(self, array):
        self.array = array
        self.length = len(array)

    def __str__(self):
        return ", ".join([str(x) for x in self.array])

    def bubbleSortRecursive(self, n=None):
        if n is None:
            n = self.length

        # Base Case
        if n == 1:
            return

        # One pass of bubble sort.  After this pass,
        #  the largest element is moved (or bubbled) to the end
        for i in range(n - 1):
            if self.array[i] > self.array[i + 1]:
                self.array[i], self.array[i + 1] = self.array[i +
                                                              1], self.array[i]

        # Largest element is fixed, recur for remaining array
        self.bubbleSortRecursive(n - 1)


array = [64, 34, 25, 12, 22, 11, 90]
# print(array)
# bubble_sort_2(array)
# print(array)
sort = bubbleSort(array)
print(sort)
sort.bubbleSortRecursive()
print(f'Sorted Array: \n{sort}')
