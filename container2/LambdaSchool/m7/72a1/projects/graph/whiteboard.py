# Add up and print the sum of all of the minimum elements of each inner array:

# [[8, 4], [90, -1, 3], [9, 62], [-7, -1, -56, -6], [201], [76, 18]]

# The expected output is given by:

# 4 + -1 + 9 + -56 + 201 + 18 = 175

def sum_minimum_elements(array):
    total = 0
    if len(array) == 0:
        return "This array has no elements."
    for subarray in array:
        if len(subarray) == 0:
            return "This array has no elements."
        elif len(subarray) == 1:
            print("subarray 0 = " + str(subarray[0]))
            total = total + subarray[0]
        elif len(subarray) == 2:
            if subarray[0] > subarray[1]:
                print("subarray 1 = " + str(subarray[1]))
                total = total + subarray[1]
            else:
                print("subarray 0 = " + str(subarray[0]))
                total = total + subarray[0]
        else:
            current_value = subarray[0]
            for item in subarray:
                if item < current_value:
                    current_value = item
            print("current value = " + str(current_value))
            total = total + current_value
    print(total)
    return total


sum_minimum_elements([[8, 4], [90, -1, 3], [9, 62],
                      [-7, -1, -56, -6], [201], [76, 18]])
