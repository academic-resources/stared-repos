# silly_years

# Write a function that takes a year (four digit integer) and returns an array with the 10 closest subsequent years that meet the following condition: the first two digits summed with the last two digits are equal to the middle two digits. E.g.,

# 1978 => 19 + 78 = 97
# 2307 => 23 + 07 = 30

def silly_years(year)
  years = []

  until years.length == 10
    year += 1
    digits = year.to_s

    first_two, middle_two, last_two = [
      digits[0..1], digits[1..2], digits[2..-1]
    ].map { |pair| pair.to_i }

    years << year if (first_two + last_two) == middle_two

  end

  years
end

# In this solution, we iterate up from year, adding each year that meets the condition into the result array until we have 10 silly years.

# There's also a more efficient deductive solution, courtesy of @joshuameisel.

# We're only looking at 4-digit years, all in the form "abcd" (in 1987, a = 1, b = 9, c = 8, d = 7).
# "The first two digits plus the last two equal the middle two" means "ab + cd = bc".
# But ab is really 10 a + b (as in 87 is 8 10 + 7). So we reformulate "ab + cd = bc"
# as (10 a + b) + (10 c + d) = (10 b + c).
# Subtracting by the right side we get: (10 a + b) + (10 c + d) - (10 b + c) = 0.
# Combine like terms:
# 10 a - 9 b + 9 * c + d = 0.
# We can manipulate the left side further. It's equal to:
# a + 9a - 9b + 9c + d = a + 9a + 9(-b) + 9c + d = a + 9(a - b + c) + d = 0
# So:
# a + d = -9(a - b + c)

# We've proven that a + d is a multiple of 9. We also know that a and d, being digits, are between 0 and nine inclusive. So a + d is in between 0 + 0 = 0 and 9 + 9 = 18. It has to be 0, 9, or 18. It can't be 0 (there's no year 0870). a + d also can't be 18, because that would mean a and d are both 9. In the year 9bc9, 9b + c9 is at least 99, meaning b and c would also be at least 9. We know 9999 does not match the pattern we're looking for.

# We're now proven that

# a + d = 9
# a - b + c = -1
# Given the above, we can figure out what d and c must be once we know a and b. This means there is at most one silly year per century. On our input year, we simply iterate up subsequent centuries to see if any of them have a silly year. A century tells us a and b, from which we derive c and d. If c and d are both between 0 and 9, abcd is a silly year.

# In code:
def silly_years(year)
  years = []

  year_arr = year.to_s.split("").map(&:to_i)

  # Keep going until we hit 10
  while years.length < 10

    # Calculate the digits using the principles above
    first_digit = year_arr[0]
    second_digit = year_arr[1]
    third_digit = -1 - first_digit + second_digit
    last_digit = 9 - first_digit

    # Set the year_arr
    year_arr = [first_digit, second_digit, third_digit, last_digit]

    # Make sure the year_arr is valid
    if year_arr.all? { |digit| digit.between?(0, 10) }
      current_silly_year = year_arr.map(&:to_s).join("").to_i

      # Just in case the current_silly_year is before our initial year
      years << current_silly_year if current_silly_year > year
    end

    # Time to move on to the next century
    year_arr[1] += 1

    # Carry if it's a new millenium
    if year_arr[1] >= 10
      year_arr[1] -= 10
      year_arr[0] += 1
    end
  end

  years
end


# pair_sum
# Given an array of integers, return all pairs that sum up to a specified value k. List the pairs in [min, max] order.

require 'set'

def pair_sum(arr, k)
  seen = Set.new
  pairs = Set.new

  arr.each do |num|
    target = k - num

    if seen.include?(target)
      # add in [min, max] order
      pairs.add(
        [[num, target].min, [num, target].max]
      )
    end

    # add `num` after checking; what if we put this before and there's
    # a single `0` is in the `arr`?
    seen.add(num)
  end

  pairs
end

pair_sum([1, 2, -1], 0)          # => #<Set: {[-1, 1]}>
pair_sum([1, 2, -1, -1], 0)      # => #<Set: {[-1, 1]}>
pair_sum([1, 2, -1, -1, -2], 0)  # => #<Set: {[-1, 1], [-2, 2]}>
pair_sum([1, 2, -1, -1, -2], 1)  # => #<Set: {[-1, 2]}>
pair_sum([1, 2, -1, -1, -2], -1) # => #<Set: {[-2, 1]}>

# Time complexity: O(n). This uses the fact that hash set add and include? are both O(1).