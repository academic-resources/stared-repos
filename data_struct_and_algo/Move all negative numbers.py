# An array contains both positive and negative numbers in random order.
#  Rearrange the array elements so that all negative numbers appear before all positive numbers.
# Input: -12, 11, -13, -5, 6, -7, 5, -3, -6
# Output: -12 -13 -5 -7 -3 -6 11 6 5


#time complexity O(N)
#space occupied O(2N)
#method 1
def rearrange(arr, n ) :
    arr1=[]
    arr2=[]
    for integer in arr:
        if integer <=0:
            arr1.append(integer)
        else:
            arr2.append(integer)     
    arr=[]
    arr=arr1+arr2
    return arr

arr=[-12, 11, -13, -5, 6, -7, 5, -3, -6]
n=len(arr)

print(rearrange(arr,n))

#method 2

