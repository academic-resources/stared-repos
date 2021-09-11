# fibs
# Write a function, fibs(num) which returns the first n elements from the fibonnacci sequence, given n.

# Solve it both iteratively and recursively.

def fibs(num)
  return [] if num == 0
  return [0] if num == 1

  fibs = [0, 1]
  while fibs.count < num
    fibs << fibs[-1] + fibs[-2]
  end

  fibs
end

# Time complexity is O(n), where n is num.


# Recursive Solution
def fibs(num)
  return [] if num == 0
  return [0] if num == 1
  return [0, 1] if num == 2

  prev_fibs = fibs(num - 1)
  prev_fibs << prev_fibs[-1]  + prev_fibs[-2]

  prev_fibs
end

# Time complexity is O(n), where n is num. Space complexity is O(n), since we will have O(n) frames on the call stack.


