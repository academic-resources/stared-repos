# Input:
# n = 6
# a[] = {5,5,5,100}
#        0,1,2,3,4
# pos=odd , len = even  , sum = 1,3,...last
# pos=odd , len = odd  , sum = 1,3,...not last
# pos=even , len = even  , sum = 0,2,..not last
# pos=even , len = odd  , sum = 0,2,..last
# Output: 110
# Explanation: 5+100+5=110

def findMaxSum(a, n):
    max=0
    for i in a:
        if max <= i:
            max=i            
        else:
            max=max
   

    for i in range(n):
        if a[i]==max:
            index=i
    sum=0

    if index%2!=0:
        for i in range(0,len(a)):
            if i%2!=0:
 
                sum+=a[i]


    if index%2==0:
        for i in range(0,len(a)):
            if i%2==0:

                sum+=a[i]

    return sum

a=[5,5,10,100,10,5]


print(findMaxSum(a,len(a)))