def sorted_find(arr,low,high,x):
    while(low<high):
        mid=low+(high-low)//2
        if(arr[mid]==x):
            return mid
        elif(arr[mid]>=arr[low]):
            if(arr[low]>x and arr[mid]<x):
                high=mid-1
            else:
                low=mid+1
        elif(arr[high]<=arr[mid]):
            if(arr[high]>x and arr[mid]>x):
                low=mid+1
            else:
                high=mid-1



arr=[12,14,18,21,3,6,8,9]

result=sorted_find(arr,0,len(arr)-1,8)
print("element is present at index: "+str(result))