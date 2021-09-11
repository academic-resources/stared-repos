# sample input : 4
#                 -1,0,3,57,89,9
#output        : -1,0,3,9,57,89


def selection_sort(arr,n):
    imin=0
    for i in range(n-1):
        imin=i
        for j in range(i+1,n):
            if arr[i]>=arr[j]:
                arr[i],arr[j]=arr[j],arr[i]
                imin = j
    return arr


arr=[-1,0,3,57,89,9]

print(selection_sort(arr,len(arr)))