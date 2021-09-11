#!/usr/bin/python

import sys

# The cache parameter is here for if you want to implement
# a solution that is more efficient than the naive 
# recursive solution

# Cookie Monster can eat either 0, 1, 2, or 3 cookies at a time.
# If he were given a jar of cookies with `n` cookies inside of it, how many ways could he eat all `n` cookies in the cookie jar?
# Implement a function `eating_cookies` that counts the number of possible ways Cookie Monster can eat all of the cookies in the jar.

def eating_cookies(n, cache=dict()):
  # FIRST:  if found in cache return that 
  if n in cache:
    return cache[n]  
  # SECOND:  if n = 0 or neg, return 1 as eat_count
  if n <= 0:
    return 1
  # THIRD:  calculate ways to eat cookies 
  # set way counter to zero 
  eat_count = 0
  # Cookie Monster can eat either 0, 1, 2, or 3 cookies at a time.
  # 0, 1, 2, 3 = current_divisor
  # loop through each divisor except 0
  for current_divisor in range(1, 4):
    # if current divisor less than n, recursively run on (n-divisor)
    if current_divisor < n:
      eat_count += eating_cookies(n - current_divisor)
    # if current divisor equals n, add 1 to eat_count
    elif current_divisor == n:
      eat_count += 1
  cache[n] = eat_count   
  # return eat_count
  return eat_count



if __name__ == "__main__":
  if len(sys.argv) > 1:
    num_cookies = int(sys.argv[1])
    print("There are {ways} ways for Cookie Monster to eat {n} cookies.".format(ways=eating_cookies(num_cookies), n=num_cookies))
  else:
    print('Usage: eating_cookies.py [num_cookies]')
