# duplicates (from LeanData)
# Write a method that takes an array and returns its duplicate values. Use less than O(n*n) time.
def duplicates(arr)
  values = Set.new
  copies = Set.new

  arr.each do |value|
   if values.include?(value)
    copies << value
   else
    values << value
   end
  end

  return copies
end

# In this solution, we use sets. Because sets have O(1) lookup time, we solve the problem in a time complexity of O(n).



# choose_a_record (also LeanData)
# Write a method that takes a hash of symbol keys, for which the values are integers representing each key's weight. The method returns a key such that the chances of selecting a particular key are weighted by that key's value.

# For the hash {:a => 1, :b => 2, :c => 3}, the chance of returning :c is 1/2, :b is 1/3, and :a is 1/6.

# Solution
def key_chance(hash)
  total = hash.values.inject(&:+)
  selection = rand(total)

  sum = 0
  hash.each do |k, v|
    sum += v
    if selection < sum
      return k
    end
  end
end

# In this solution, we start by finding the total of the hash's values. We can then generate a random number from (0...total). We then iterate back through our hash, keeping track of a sum along the way. If our selection falls below the sum at any point, we are in the portion of the hash and return the key.