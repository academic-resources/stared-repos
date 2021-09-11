def isPrime(n):
    for i in range(2,n):
        if n%i == 0:
            return False
            break
    return True

n=10
for j in range(2,n):
    if isPrime(j):
        print(j)