#!/usr/bin/python

import argparse


def find_max_profit(prices):
  pass
  # Write a function `find_max_profit` that receives as input a list of stock prices.
  # Your function should return the maximum profit that can be made from a single buy and sell.
  # You must buy first before selling; no shorting is allowed here.

  # get maximum number value
  max_profit = 0
  max_profit_index = 0
  for x in range(0, len(prices)):
    current_value = prices[x]
    if current_value > max_profit:
      max_profit = current_value
      # get index of max number value
      max_profit_index = x
      min_profit_index = x
  min_profit = prices[min_profit_index]
  # get min number value from all indexes prior to that index
  for y in range(max_profit_index, 0, -1):
    current_value = prices[y]
    if current_value < min_profit:
      min_profit = current_value
      min_profit_index = x
      print('min_profit = ' + str(min_profit))
  print('max_profit = ' + str(max_profit))
  # subtract min from max
  profit = max_profit - min_profit
  # return result as profit
  return profit 


if __name__ == '__main__':
  # This is just some code to accept inputs from the command line
  parser = argparse.ArgumentParser(description='Find max profit from prices.')
  parser.add_argument('integers', metavar='N', type=int,
                      nargs='+', help='an integer price')
  args = parser.parse_args()

  print("A profit of ${profit} can be made from the stock prices {prices}.".format(
      profit=find_max_profit(args.integers), prices=args.integers))
