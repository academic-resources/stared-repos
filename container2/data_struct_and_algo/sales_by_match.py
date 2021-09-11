# Complete the sockMerchant function below.
def sockMerchant(n, arr):
    dictonary={}
    counter=0
    for i in arr:
        if i in dictonary:
            dictonary[i]+=1
        else:
            dictonary[i]=1
    for pred in dictonary.values():
        if pred%2!=0:
            counter+=1

    return counter        

arr=[10,20,20,10,10,30,50,10,20]
print(sockMerchant(len(arr),arr))   