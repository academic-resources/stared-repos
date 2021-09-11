#!/usr/bin/python

import sys

# Write a function `rock_paper_scissors` to generate all of the possible plays that can be made in a game of "Rock Paper Scissors", given some input `n`, which represents the number of plays per round.

#  You'll want to define a list with all of the possible Rock Paper Scissors plays.

# Another problem that asks you to generate a bunch of permutations, so we're probably going to want to opt for using recursion again. Since we're building up a list of results, we'll have to pass the list we're constructing around to multiple recursive calls so that each recursive call can add to the overall result. However, the tests only give our function `n` as input. To get around this, we could define an inner recursive helper function that will perform the recursion for us, while allowing us to preserve the outer function's function signature.

# In Python, you can concatenate two lists with the `+` operator. However, you'll want to make sure that both operands are lists!

# If you opt to define an inner recursive helper function, don't forget to make an initial call to the recursive helper function to kick off the recursion.
def rock_paper_scissors(n):
  choices = ["rock", "paper", "scissors"]

  def rounds(n):

    # saving all lists of the possible plays here
    plays = list()

    # if no rounds, there are no plays
    if n == 0:
      plays.append([])

    # if there is one round, there are three plays
    # loop through possible choices & append each to plays
    elif n == 1:
      for choice in choices:
        plays.append([choice])

    # if there is more than one round:
    elif n > 1:
      # loop through possible choices
      for choice in choices:
        # recursively run through n-1 rounds (decrement -1 from n)
        # this adds each round from end to beginning 
        for round in rounds(n - 1):
          # insert choice at beginning of inner list
          round.insert(0, choice)
          # append round list to plays
          plays.append(round)

    # return list of potential plays
    return plays

  return rounds(n)

if __name__ == "__main__":
  if len(sys.argv) > 1:
    num_plays = int(sys.argv[1])
    print(rock_paper_scissors(num_plays))
  else:
    print('Usage: rps.py [num_plays]')
