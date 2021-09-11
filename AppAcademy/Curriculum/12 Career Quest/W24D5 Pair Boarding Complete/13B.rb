# Square Root
# Implement a square root function that uses only addition, subtraction, multiplication and division in less than linear time. You may assume that input is always a perfect square.

# Hint: One naive solution has a better time complexity than many people realize--iterating from 0 until the square root is going to be O(sqrt n), not O(n). However, we can do better!

# Solution
def sqroot(num, candidates = nil)  
  return num if num == 1    
  candidates ||= (0..num / 2).to_a
  middle = candidates.length / 2
  case num <=> (candidates[middle] * candidates[middle])
  when -1
      sqroot(num, candidates.take(middle))
  when 0
      middle
  when 1
      sub_answer = sqroot(num, candidates.drop(middle + 1))
      (sub_answer.nil?) ? nil : (middle + 1) + sub_answer
  end
end

# You know it won't be as fast as constant time, but it could be logarithmic. What's our favorite logarithmic algorithm? Binary search! Simply bsearch the candidate options.

#  00      01      04      09      16      25
#    +01     +03     +5      +7      +9
#    0*2+1 + 1*2+1 + 2*2+1 + 3*2+1 + 4*2+1 

# n(n+1) + (n+1) = n**2 + 2n + 1 = (n + 1)**2 = (n + 1) * (n + 1)