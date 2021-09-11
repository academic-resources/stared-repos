def Solve (N):
    val=[]
    for i in range(1,N):
        if N%i==0:
            val.append(i)
        else:
            pass
    sum=0    
    for k in val:
        sum+=int(k)
    if sum == N:
        return "YES"
    else:
        return "NO"

T = int(input())
for _ in range(T):
    N = int(input())
    out_ = Solve(N)
    print (out_)