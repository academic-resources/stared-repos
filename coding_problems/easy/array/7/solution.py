def binarySearch(array, target):
    low = 0
    high = len(array) - 1
    while (low <= high):
        mid = (low + high) // 2
        if target == array[mid]:
            return mid 
        if target < array[mid]:
            high = mid - 1
        else:
            low = mid + 1
    return -1


if __name__ == '__main__':
    testArr = [0,1,21,33,45,45,61,71,72,73]
    target = 33
    print(binarySearch(testArr, target))