# Do not use any of the built in array functions for this exercise

class array:
    def __init__(self, capacity):
        # We need to set the capacity
        self.capacity = capacity # Maximum size the array can become

        # We also need the actual current size
        self.count = 0 # Current size being used

        # We need to create the empty cells within the block of memory
        self.elements = [None] * capacity



# Double the size of the given array
def resize_array(array):
    # Double the old capacity
    new_capacity = array.capacity * 2

    # Re-allocate the memory
    new_elements = [None] * new_capacity

    # Copy the elements over
    # We use count instead of capacity because we only need to do it for the memory actually being used
    for i in range(array.count):
        new_elements[i] = array.elements[i]

    # Copy over our changes
    array.elements = new_elements
    array.capacity = new_capacity


# Return an element of a given array at a given index
def array_read(array, index):
    # Throw an error if array is out of the current count
    # Why? To recognize an out of bounds exception

    # How do we know if we're out of bounds?
    if index >= array.count:
        print("Error: out of bounds")
        return None
    
    # Otherwise, return the index value
    return array.elements[index]


# Insert an element in a given array at a given index
def array_insert(array, element, index):
    # Throw an error if array is out of the current count
    if index > array.count:
        print("Error: out of bounds in array_insert")
        return None

    # Resize the array if the number of elements is over capacity
    if array.capacity <= array.count:
        # Create a new array that is doubled in size with our previously written resize_array function
        resize_array(array)

    # Move the elements to create a space at 'index'
    # Everything to the right of index needs to move a space to the right
    for i in range(array.count, index, -1):
        array.elements[i] = array.elements[i-1]

    # Add the new element to the array and update the count
    array.elements[index] = element
    array.count += 1



# Add an element to the end of the given array
def array_append(array, element):

    # Hint, this can be done with one line of code
    # (Without using a built in function)

    array_insert(array, element, array.count)


# Remove the first occurence of the given element from the array
# Throw an error if the value is not found
def array_remove(array, element):
    removed = False
    for i in range(array.count):
        if removed: 
            # if removed is True, we should...?
            array.elements[i-1] = array.elements[i]
        elif array.elements[i] == element:
            removed = True
    
    if removed:
        array.count -= 1
        array.elements[array.count] = None
    
    else: 
        print(f"Error: {str(element)} not found.")



# Remove the element in a given position and return it
# Then shift every element after that occurrance to fill the gap
def array_pop(array, index):
    # Throw an error if array is out of the current count
    if index >= array.count:
        print("Error: out of points in array_pop")
        return None

    # Set the return value of the number being popped so it's stored before being removed
    return_value = array.elements[index]

    # Make a for loop to shift elements over
    # Start one after the index and end at array.count (because it stops at that given position without including it)
    for i in range(index + 1, array.count):
        array.elements[i - 1] = array.elements[i]

    array.count -= 1
    array.elements[array.count] = None

    return return_value



# Utility to print an array
def array_print(array):
    string = "["
    for i in range(array.count):
        string += str(array.elements[i])
        if i < array.count - 1:
            string += ", "

    string += "]"
    print(string)


# Testing
arr = array(1)

array_insert(arr, "STRING1", 0)
array_print(arr)
array_pop(arr, 0)
array_print(arr)
array_insert(arr, "STRING1", 0)
array_append(arr, "STRING4")
array_insert(arr, "STRING2", 1)
array_insert(arr, "STRING3", 2)
array_print(arr)
