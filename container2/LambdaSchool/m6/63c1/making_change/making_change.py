#!/usr/bin/python

import sys

def calculate_change(amount, denominations, cache):
    # THIRD:  if amount is 0, only one way to make change
    if amount == 0: return 1
    # FOURTH:  if only one denomination, only one way to make change
    elif len(denominations) == 1: return 1
    # FIFTH: if amount > 0 and denoms > 1, calculate ways to make change
    else:
        # SIXTH-A:  try to pull calculation from cache
        try:
            x = f'{amount}-{denominations}'
            if cache[x] >= 1: return cache[x]
        # SIXTH-B:  account for errors
        except KeyError: pass
        # SEVENTH:  start at 0 to count number of ways to count change
        change_methods = 0
        # EIGHTH:  if amount < current denom, remove from/return denom
        while denominations[-1] > amount: denominations.pop()
        # NINTH:  set next denom as current denom
        current_denomination = denominations[-1]
        # 10TH:  calculate how many of current denoms fit into amount 
        current_quantity_current_denoms = amount // current_denomination + 1
        # 11TH:  loop through each 
        for i in range(current_quantity_current_denoms):
            # 12TH:  calculate variables for recursion
            current_denom_total = i * current_denomination
            remainder = amount - current_denom_total
            previous_denoms = denominations[:-1]
            # 13TH: add recursive results to ways count
            change_methods += calculate_change(remainder, previous_denoms, cache)
            # 14TH:  set new current denom
            current_denomination = denominations[-1]
        # 15TH:  save ways to make change to cache 
        cache[x] = change_methods
        # LAST:  return number of ways to make change
        return change_methods

def making_change(amount, denominations):
    # FIRST:  if amount is 1 or less, there is only one way to make change 
    if amount <= 1: return 1
    # SECOND: if amount > 1, calculate ways to make change recursively
    else: return calculate_change(amount, list(denominations), {})

if __name__ == "__main__":
  # Test our your implementation from the command line
  # with `python making_change.py [amount]` with different amounts
  if len(sys.argv) > 1:
    denominations = [1, 5, 10, 25, 50]
    amount = int(sys.argv[1])
    print("There are {ways} ways to make {amount} cents.".format(ways=making_change(amount, denominations), amount=amount))
  else:
    print("Usage: making_change.py [amount]")
