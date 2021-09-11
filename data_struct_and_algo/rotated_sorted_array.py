# Input : arr[] = {15, 18, 2, 3, 6, 12}
# Output: 2
# Explanation : Initial array must be {2, 3,
# 6, 12, 15, 18}. We get the given array after
# rotating the initial array twice.

# Input : arr[] = {7, 9, 11, 12, 5}
# Output: 4

# Input: arr[] = {7, 9, 11, 12, 15};
# Output: 0


def single_rotation(arr, l):
    temp = arr[0]
    for i in range(l - 1):
        arr[i] = arr[i + 1]
    arr[l - 1] = temp


def find_min(arr, l):
    min = arr[0]
    for i in range(l):
        if min < arr[i]:
            min = arr[i]
    minimum = min

    for i in range(l):
        if min == arr[i]:
            index = i + 1

    for i in range(index):
        single_rotation(arr, len(arr))

    return index


# def print_array(arr,l):
#     for i in range(l):
#         print(arr[i])


arr = [15, 18, 2, 3, 6, 12]
rotations = find_min(arr, len(arr))
print("number of rotations:" + str(rotations))
# print_array(arr,len(arr))
print
