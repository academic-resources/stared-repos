def Solve(N):

    result=[]
    for i in range(1,N+1):
        if i%3==0 and i%5!=0:
            result.append("Fizz")
        if i%5==0 and i%3!=0:
            result.append("Buzz")
        if i%3==0 and i%5==0:
            result.append("FizzBuzz")
        if i%3!=0 and i%5!=0:
            result.append(str(i))

    
    return '\n'.join(result)
    result=[]


T = int(input())

N = (input().split(' '))

for i in N:
    a=int(i)
    out_ = Solve(a)
    print (out_)