# Input: nums = [0,1,2,2,3,0,4,2], val = 2
# Output: 5, nums = [0,1,4,0,3]


def removeElement(arr,element):
    dictonary={}
    output=0
    for iter in arr:
        if iter in dictonary:
            dictonary[iter]+=1
        else:
            dictonary[iter]=1
    # {0: 2, 1: 1, 3: 1, 4: 1}
    delete= int(dictonary.get(element))
    for i in range(delete):
        arr.remove(element)
    del dictonary[element]
    output= sum(dictonary.values())
    return arr,output


arr=[0,1,2,2,3,0,4,2]
element=2
nums,output=removeElement(arr,2)
print(nums,"::",output)