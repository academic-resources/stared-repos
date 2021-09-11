# Given an array A of N integers, find any 3 elements in it such that A[i] < A[j] < A[k] and i < j < k.

# Example 1:

# Input:
# N = 5
# A[] = {1,2,1,1,3}
# Output: 1
# Explanation: a sub-sequence 1 2 3 exist.

def find3number(A, n):
    A.sort()
    sum=0

    dic=[]
    validate=[]

    for i in A:
        if i in dic:
            pass
        else:
            dic.append(i)
    if len(dic)>2:
        for j in range(len(dic)-1):
            if dic[j]<dic[j+1]:
                validate.append(1)
            else:
                return 0
                break

    for k in validate:
        sum+=k
 

    if ((sum+1)/len(dic)) == 1:
        return 1
    else:
        return 0



        


A=[1,2,1,1,3]
n=len(A)

print(find3number(A, n))