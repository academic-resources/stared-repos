

def bad_two_sum?(arr, target)
    (0...arr.length).each do |idx|
        (idx + 1...arr.length).each do |idx2|
            return true if arr[idx] + arr[idx2] == target
        end
    end
    false
end


arr = [0, 1, 5, 7]
#p bad_two_sum?(arr, 10)
#time complexity O(n^2)

def okay_two_sum?(arr, target)
  arr.sort!
  idx_1 = 0
  idx_2 = arr.length - 1
  while idx_1 < idx_2 
    sum = arr[idx_1] + arr[idx_2]
    return true if sum == target 
    if sum > target 
      idx_2 -= 1
    elsif sum < target 
      idx_1 += 1
    end
  end
  false 
end

#p okay_two_sum?(arr, 10)
# time complexity O(n log(n))

# hash = Hash.new { 0 => 0, 1 => 1, 5 => 5, 7 => 7}
# if ele is > target, set value to be false, ele < target value = true
arr = [0, 1, 5, 7]

def hash_two_sum(arr, target)
  hash = {}

  arr.each do |n|
    if hash[target - n].nil?
      hash[n] = target - n 
    else  
      return true 
    end
  end
  false 
end

p hash_two_sum(arr, 6)


def twosum(num_arr, target)
  hash = {}

  num_arr.each do |n|

    if !hash[target - n].nil?
      return [n, target - n]
    end

    hash[n] = target - n

  end

  []
end

hash[0] = 6
hash[1] = 5
[5, 1]
hash[7] = -1