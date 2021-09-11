"""
Factorial Function (n!) is a classic mathematical function
that has a natural recursive definition.

* if n = 0, n! = 1
* if n >= 1, n! = n * (n-1)!
"""

def factorial(n):
  if n == 0:
    return 1
  else:
    return n * factorial(n-1)

print(factorial(10))