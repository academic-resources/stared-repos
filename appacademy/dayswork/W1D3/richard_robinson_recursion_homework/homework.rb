def sum_to(n)
  return nil if n < 1
  return 1 if n == 1
  n + sum_to(n - 1)
end

def add_numbers(nums_array)
  return nil if nums_array.length == 0
  return nums_array[0] if nums_array.length == 1
  nums_array[0] + add_numbers(nums_array[1..-1])
end

def gamma_fnc(number)
  return nil if number == 0
  factorial(number - 1)
end

def factorial(number)
  return 1 if number == 1 || number == 0
  number * factorial(number - 1)
end

def ice_cream_shop(flavors, favorite)
  return false if flavors.length == 0
  (flavors[0] == favorite) || ice_cream_shop(flavors[1..-1], favorite)
end

def reverse(string)
  return string if string.length <= 1
  reverse(string[1..-1]) + string[0]
end
