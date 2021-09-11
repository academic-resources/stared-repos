fibo = { 1: 0, 2: 1 }

def getNthFib(n):
  if n in fibo:
    return fibo[n]
  if n-1 in fibo:
    return fibo[n-1] + fibo[n-2]
  fibo[n-2] = getNthFib(n-2)
  fibo[n-1] = getNthFib(n-1)
  fibo[n] = getNthFib(n)
  return fibo[n]
