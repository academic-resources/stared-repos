def reverse_array(arr,start,end):
    while start<end:
        arr[start],arr[end]=arr[end],arr[start]
        start+=1
        end-=1

arr=[1,2,3,4,5,6]
print("unreversed array: ")
print(arr)
print("reversed array:")
reverse_array(arr,0,len(arr)-1)
print(arr)