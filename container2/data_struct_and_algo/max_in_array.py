def find_max(arr,l):
    temp=arr[0]
    for i in range(l):
        if temp<arr[i]:
            temp=arr[i]
    return temp


arr=[1,2,3,4,5,6,55,6,7,8,8,8]

max=find_max(arr,len(arr))
print(max)