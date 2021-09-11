
# EXERCISE 1

def sum_to(n)
  return nil if n < 1
  return n if n == 1

  n + sum_to(n-1)
end

# Test Cases:
#   p sum_to(5)  # => returns 15
#   p sum_to(1)  # => returns 1
#   p sum_to(9)  # => returns 45
#   p sum_to(-8)  # => returns nil




# EXERCISE 2

def add_numbers(arr)
  return arr.first if arr.length <= 1

  arr.pop + add_numbers(arr)
end

# Test Cases:
#   p add_numbers([1,2,3,4]) # => returns 10
#   p add_numbers([3]) # => returns 3
#   p add_numbers([-80,34,7]) # => returns -39
#   p add_numbers([]) # => returns nil




# EXERCISE 3

def gamma_fnc(num)
  return nil if num < 1
  return 1 if num == 1

  (num - 1) * gamma_fnc(num - 1)
end

# Test Cases:
#   p gamma_fnc(0)  # => returns nil
#   p gamma_fnc(1)  # => returns 1
#   p gamma_fnc(4)  # => returns 6
#   p gamma_fnc(8)  # => returns 5040




# EXERCISE 4

def ice_cream_shop(flavors, favorite)
  return false if flavors.empty?
  return true if flavors.last == favorite

  ice_cream_shop(flavors[0...-1], favorite)
end

# Test Cases:
  # p ice_cream_shop(['vanilla', 'strawberry'], 'blue moon')  # => returns false
  # p ice_cream_shop(['pistachio', 'green tea', 'chocolate', 'mint chip'], 'green tea')  # => returns true
  # p ice_cream_shop(['cookies n cream', 'blue moon', 'superman', 'honey lavender', 'sea salt caramel'], 'pistachio')  # => returns false
  # p ice_cream_shop(['moose tracks'], 'moose tracks')  # => returns true
  # p ice_cream_shop([], 'honey lavender')  # => returns false




# EXERCISE 5

def reverse(string)
  return "" if string.empty?
  reverse(string[1..-1]) + string[0]
end

# Test Cases:
  # p reverse("house") # => "esuoh"
  # p reverse("dog") # => "god"
  # p reverse("atom") # => "mota"
  # p reverse("q") # => "q"
  # p reverse("id") # => "di"
  # p reverse("") # => ""
