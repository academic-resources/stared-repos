require 'byebug'

def range(min, max)
    # debugger
    return [min] if min == max - 1
    [min] + range(min + 1, max)
end

def sum(arr)
    return arr.first if arr.size <= 1
    arr.first + sum(arr[1..-1])
end

def sum_itr(arr)
    sum = 0
    arr.each { |num| sum += num }
    sum
end

def exp(b, n)
    return 1 if n == 0
    b * exp(b, n - 1)
end

def exp_2(b, n)
    return b if n == 1
    if n.even?
        return (exp_2(b, n / 2) ** 2)
    else 
        return b * (exp_2(b, (n-1) / 2) ** 2)
    end
end

def deep_dup(arr)
    duplicated_arr = []
    arr.each do |el|
        if el.is_a?(Array)
            duplicated_arr << deep_dup(el) 
        else
            duplicated_arr << el
        end
    end
    duplicated_arr
end

def fib_recurs(n)
    base_numbers = [1,1]
    return base_numbers.take(n) if n <= 2
    new_fib = fib_recurs(n-1)
    next_fib = new_fib[-1] + new_fib[-2]
    new_fib << next_fib
end

def fib_iter(n)
    fibs = [1, 1]
    return fibs.take(n) if n <= 2
    while fibs.length < n
        fibs << (fibs[-1] + fibs[-2])
    end
    fibs
end

def bsearch(arr, target)
    # base case
    return nil if arr.empty?
    middle = (arr.length / 2)
    return middle if arr[middle] == target
    
    # inductive step
    left = arr[0...middle]
    right = arr[middle..-1]
    if left.include?(target)
        bsearch(left, target)
    else
        middle + bsearch(right, target)
    end
end

def merge_sort(arr)
    return arr if arr.size <= 1
    middle = arr.length / 2
    left = merge_sort(arr[0...middle])
    right = merge_sort(arr[middle..-1])
    merge(left, right)
end

def merge(arr_1, arr_2)
    new_arr = []
    until arr_1.empty? || arr_2.empty?
        if arr_1[0] > arr_2[0]          
            new_arr.push(arr_2.shift)
        else
            new_arr.push(arr_1.shift)
        end
    end
    if arr_1.empty?
        arr_2.each { |el| new_arr << el }
    else
        arr_1.each { |el| new_arr << el }
    end
    new_arr
end

def array_subsets(arr)
    return arr if arr.empty?
    result = []
    arr.each do |el|
        inner = []
        if result.include?([el])
            inner << el
        else
            result << [el]
        end
        result << inner if !result.include?(inner)
    end
end