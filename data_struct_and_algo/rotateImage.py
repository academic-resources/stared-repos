def Rotate(arr):
    temp = []
    for i in range(len(arr)):
        for j in range(0, len(arr)):
            if i != j and i < j:
                arr[i][j], arr[j][i] = arr[j][i], arr[i][j]

    for l in arr:
        l.reverse()
        print(l)


arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

Rotate(arr)
