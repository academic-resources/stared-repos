# max_unique_psub
# Given a string, find the lexicographically greatest pseudo-substring.

# Example (read on for further explanation):

# max_unique_psub('abcdef')
# => 'f'

# max_unique_psub('abcdefedcba')
# => 'fedcba'

# max_unique_psub('algorithms')
# => 'ts'
# Let's define a pseudo-substring: psub is any subset that is ordered by index. (Differs from a standard substring because it does not need to be contiguous.)

# For example:

# "ac" is a psub of "acb"
# "cb" is a psub of "acb"
# "bc" is _not_ a psub of "acb" (letters are out of order)

# psubs("acb") == [
#   "a",
#   "ac",
#   "acb",
#   "ab",
#   "c",
#   "cb",
#   "b"
# ]
# Next, let's define lexicographical order:

# str1 > str2 IF
# (a) str1 != str2 AND EITHER
# (b1) str2 is a prefix of str1 OR
# (b2) at the first position at which str1 and str2 differ (say i), str1[i] > str2[i].
# For instance: "abc" > "ab" and "acb" > "abc".

# With this information, given a string str, find the lexicographical greatest psubstring.

# Solve it first by generating all psubstrings and picking the greatest (in Big-Oh, how many are there?).

# Next, improve your algorithm to do this in O(n) time.

# Solution
# O(n**2)
def max_unique_psub(str)
  psub = str[str.length - 1]

  (str.length - 2).downto(0) do |i|
    next if str[i] < psub[0]
    # CAREFUL: this takes O(n) in the inner loop to copy the contents of
    # psub to create the new string.
    psub = str[i] + psub
  end

  psub
end

# In our first solution, we walk backwards through a string, starting from the last index. Every time we find an element that is greater than our first element, we know that we've found a new first element of our pseudo-substring, and we push it to the front.

# This solution takes O(n**2) - the loop through the string's indices takes O(n) and copying the contents of psub over takes O(n). We can do slightly better by simply pushing the element into the array and reversing at the end.

# Slight rewriting that is O(n)
def max_unique_psub(str)
  psub_arr = [str[str.length - 1]]

  (str.length - 2).downto(0) do |i|
    next if str[i] < psub_arr.last
    # this is amortized O(1) time.
    psub_arr << str[i]
  end

  psub = psub_arr.reverse.join("")
  psub
end

