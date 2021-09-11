require 'byebug'

def range(s, e)
    return [] if e < s || s == e
    arr = [s] + range(s + 1, e)
end

def array_sum_r(arr)
  return 0 if arr.length == 0
  return arr.first + array_sum_r(arr[1..-1])
end

def array_sum_i(arr)
  sum = 0
  arr.each { |n| sum += n }
  sum 
end

$counter = 0

def exponentiation_1(base, power)
    $counter += 1
  return 1 if power == 0 
  return base * exponentiation_1(base, power - 1)
end

def exponentiation_2(base, power)
    $counter += 1
    return 1 if power == 0
    return base if power == 1
    if power.even?
        exp_result = exponentiation_2(base, power/2 )
        return  exp_result * exp_result
    else
        exp_result = exponentiation_2(base, (power - 1)/2)
        return  base * exp_result * exp_result
    end

end

class Array
    def deep_dup
        output = []
        self.each do |item|
          if !item.is_a?(Array) 
            output << item 
          elsif item.length <= 1
            output += item 
          else
            if item.first.is_a?(Array)
              output += item.first.deep_dup + item[1..-1].deep_dup
            else 
              output += [item.first] + item[1..-1].deep_dup
            end
            
          end
        end
        output 
    end
end

def fib_iterative(n)
    results = [1,1]
    while results.length < n
        new_num = results[-1] + results[-2]
        results << new_num
    end
    results
end

def fib_recursive(n)
    base_cases = [1,1]
    return base_cases.take(n) if n <= 2

    new_fibs = fib_recursive(n - 1)
    new_num = new_fibs[-1] + new_fibs[-2]
    new_fibs << new_num
end

def bsearch(arr, val)
    middle = arr.length / 2
    return middle if val == arr[middle]
    return nil if arr.empty?
    if val > arr[middle]
        right = arr[middle + 1..-1]
        res = bsearch(right, val)
        res ? (middle + res + 1) : nil
    else
      debugger
        left = arr[0...middle]
        bsearch(left, val) 
    end
end


# p bsearch([1, 2, 3], 1) # => 0
# p bsearch([2, 3, 4, 5], 3) # => 1
# p bsearch([2, 4, 6, 8, 10], 6) # => 2
# p bsearch([1, 3, 4, 5, 9], 5) # => 3
# p bsearch([1, 2, 3, 4, 5, 6], 6) # => 5
# p bsearch([1, 2, 3, e, 5, 6], 0) # => nil
# p bsearch([1, 2, 3, 4, 5, 7], 6) # => nil

def merge_sort(arr)
  return arr if arr.length <= 1

  pivot = arr[0]
  left = arr[1..-1].select { |num| num <= pivot }
  right = arr[1..-1].select { |num| num > pivot }

  return merge_sort(left) + [pivot] + merge_sort(right)
end

def subsets(arr)
  subs = []
  return [[], arr] if arr.length == 1 

  results = subsets(arr[0..-2])
  res_last = results.map { |a| a += [arr.last] }
  subs += results + res_last 
  subs
end

def permutations(arr)

    results = []
    
    return [] if arr.nil?
    return arr if arr.length <= 1

    sub_array = []
    first = arr.shift
    sub_array << first
    sub_array += permutations(arr[1..-1])
    results << sub_array

    results 
end

print permutations([1,2,3])

#[1, 2] => [1, 2], [2, 1]
#[1] => [2]
#[1] << 2 => [1, 2]
#[2] << 1 => [2, 1]

#[1] => [2, 3]
#[2] => [3 ]


# [ [1, 2, 3], [1, 3, 2],
#   [2, 1, 3], [2, 3, 1],
#   [3, 1, 2], [3, 2, 1]
# ]