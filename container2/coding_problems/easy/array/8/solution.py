def bubbleSort(array):
    sorted = False
    counter = 0
    while not sorted:
        sorted = True
        for i in range(0, len(array) - 1 - counter):
            if array[i] > array[i+1]:
                sorted = False
                swap(array, i, i+1)
        counter += 1
    return array

def swap(array, x, y):
    array[x], array[y] = array[y], array[x]

if __name__ == '__main__':
    print(bubbleSort([8,5,2,9,5,6,3]))