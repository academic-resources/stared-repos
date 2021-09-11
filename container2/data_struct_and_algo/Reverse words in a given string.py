# S = pqr.mno
# Output: mno.pqr
# Explanation: After reversing the whole
# string , the input string becomes
# mno.pqr



def RevString(String):
    temp=[]
    rev=[]
    for i in String.split("."):   #O(n)
        temp.append(i)
    temp.reverse()
    for i in temp:                #O(n)
        rev.append(i)
        rev.append(".")
    for i in rev[:-1]:            #O(n)  
        print(i,end="")      

#total = 3*O(n)

String="pqr.mno"
RevString(String)

