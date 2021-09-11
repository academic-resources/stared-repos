def add_list(l):
    # The sum of an empty list is 0
    if l == []:
        return 0

    # print(f'Add {l[0]} to the sum of {l[1:]}.')
    return l[0] + add_list(l[1:])


l = [1,2,3,4]

print(add_list(l)) # Should print 10

# add_list := element 0 + add_list(rest_of_list)


# Quick sort

sample = [5, 3, 9, 4, 8, 1, 7]


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

def quicksort(l):
    # One of our base cases is an empty list or list with one element
    if len(l) == 0 or len(l) == 1:
        return l

    # If we have a left list, a pivot point and a right list...
    # assigns the return values of the partition() function
    left, pivot, right = partition(l)
    
    # Our sorted list looks like left + pivot + right, but sorted.
    # Pivot has to be in brackets to be a list, so python can concatenate all the elements to a single list
    return quicksort(left) + [pivot] + quicksort(right)


# print(quicksort([]))
# print(quicksort([1]))
# print(quicksort([1,2]))
# print(quicksort([2,1]))
# print(quicksort([2,2]))
# print(quicksort([5,3,9,4,8,1,7]))
# print(quicksort([1,2,3,4,5,6,7]))
# print(quicksort([9,8,7,6,5,4,3,2,1]))



def quicksort2(l, low, high):
    if len(l) == 0 or len(l) == 1:
        return l
    
    if low >= high:
        return l

    pivot_index = low

    # Partitioning
    for i in range(low, high):
        # print(f'Checking against {l[i]}. Current list is {l}. \n')
        
        if l[i] < l[pivot_index]:
            # print(f'{l[i]} is less than {l[pivot_index]}, so we need to swap l[i] ({l[i]}) with l[pivot_index + 1] ({l[pivot_index+1]}).')
            # If i is less than pivot, we need to swap it with the item after the pivot
            l[i], l[pivot_index + 1] = l[pivot_index + 1], l[i]

            # print(f'Next, we will swap {l[pivot_index]} with {l[pivot_index + 1]} and increase the pivot index from {pivot_index} to {pivot_index + 1}.')
            # Then we'll swap the pivot with the item after the pivot
            l[pivot_index], l[pivot_index + 1] = l[pivot_index + 1], l[pivot_index]
            # print(f'Now the current list is {l} \n')

            # Update the pivot index:
            pivot_index += 1
    
    # Sort from low to the pivot index
    # print(f'\n Splitting list to check quicksort({l}, {low}, {pivot_index}) and quicksort({l}, {pivot_index + 1}, {high}). \n')
    quicksort2(l, low, pivot_index)
    # Sort from the pivot index to high
    quicksort2(l, pivot_index + 1, high)

    return l

def in_place_quicksort(l):
    return quicksort2(l, 0, len(l))


print(in_place_quicksort([]))
print(in_place_quicksort([1]))
print(in_place_quicksort([1,2]))
print(in_place_quicksort([2,1]))
print(in_place_quicksort([2,2]))

# print(f"Our starting list is [5,3,9,4,8]. \n")
print(in_place_quicksort([5,3,9, 4]))

print(in_place_quicksort([1,2,3,4,5,6,7]))
print(in_place_quicksort([9,8,7,6,5,4,3,2,1]))