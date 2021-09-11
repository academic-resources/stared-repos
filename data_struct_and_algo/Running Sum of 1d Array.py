def runningSum(array):
    temp = 0
    array_1 = []
    for count, i in enumerate(array):
        for j in range(count + 1):
            temp += array[j]
        array_1.append(temp)
        temp = 0
    return array_1
    #         print(count,i,j)


array = [1, 2, 3, 4]
print(runningSum(array))
