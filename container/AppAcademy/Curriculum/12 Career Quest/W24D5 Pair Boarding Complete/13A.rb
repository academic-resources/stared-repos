# rand7
# Write a method to generate a random integer (0...7), given a method that generates a random integer between (0...5). The resulting rand7 distribution must be uniform.

# Solution
def rand7
  while true
    # construct a random number (0...5**2)
    # (0, 5, 10, 15, 20) + (0, 1, 2, 3, 4)
    num = 5 * rand5 + rand5
    return (num % 7) if num < 21

    # we reject 21, 22, 23, 24; we'll choose another number in that
    # case.
  end
end

# Let's walk through the above solution. First off, why can't we do something like this:

def rand7
  sum = 0
  7.times do
    sum += rand5
  end

  sum / 7
end

# We can't use the above code, because our distribution would not be even - we would see a bell curve where it would be much more likely to get values in the middle of the curve than values like 0. (Think of rolling two dice - 7 is a much more likely than a 2 or 12).

# In the correct code, we generate a random number with even distribution between 0 and 24 with the line num = 5 * rand5 + rand5. Prove to yourself that this number is randomly distributed. We then reject the number and try again if it is > 21 (to ensure even distribution), or if it is <= 21, we return the number % 7 (this will return evenly distributed numbers in the range 0...7).

# Alternate Solution
def rand7
  result = 0
  result += (rand5 < 3 ? 0 : 1)
  result += (rand5 < 3 ? 0 : 2)
  result += (rand5 < 3 ? 0 : 4)
  result
end



# Matchsticks
# You have two sticks and a matchbox. Each stick takes exactly an hour to burn from one end to the other.

# The sticks are weird, in that they do not burn at a steady. If you break a stick in half, it is not guaranteed that each half will take 30min to burn.

# How would you measure exactly 45 minutes by burning these sticks?

# Solution
# Take stick1, light it at both ends. At the same time, light stick2 at one end.

# When stick1 is extinguished, 30min have passed. Now, light stick2 at the other end. The stick will take another 15min to finish burning.