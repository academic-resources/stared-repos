# Cyclically rotate an array by one
# Input:
# N = 5
# A[] = {1, 2, 3, 4, 5}
# Output:
# 5 1 2 3 4


def SingleCyclicallyRotate(arr,n):
    temp=arr[n-1]
    for i in range(n-1,0,-1): 
        arr[i]=arr[i-1]
    arr[0]=temp
    return arr

def CyclicallyRotate(arr,turns):
    for j in range(turns+1):
        SingleCyclicallyRotate(arr,len(arr))
    return arr

arr=[1,2,3,4,5]
turns=6
print(CyclicallyRotate(arr,turns))