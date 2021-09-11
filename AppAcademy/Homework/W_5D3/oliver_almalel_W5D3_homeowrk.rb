# Exercise 1 - sum_to
# Write a function sum_to(n) that uses recursion to calculate the sum from
# 1 to n (inclusive for n)

def sum_to(n)
  return nil if n < 0
  return n if n == 0
  n += sum_to(n - 1)
end
# Test Cases
p sum_to(5)  # => returns 15
p sum_to(1)  # => returns 1
p sum_to(9)  # => returns 45
p sum_to(-8)  # => returns nil
puts


# Exercise 2 - add_numbers
# Write a function add_numbers(nums_array) that takes in an array of Integers
# and returns the sum of those numbers. Write this method recursively.

def add_numbers(num_array)
  return num_array[0] if num_array.length <= 1
  sum = num_array[0]
  sum += add_numbers(num_array[1..-1])
end

# Test Cases
p add_numbers([1,2,3,4]) # => returns 10
p add_numbers([3]) # => returns 3
p add_numbers([-80,34,7]) # => returns -39
p add_numbers([]) # => returns nil
puts


# Exercise 3 - Gamma Function
# Let's write a method that will solve Gamma Function recursively. The Gamma
# Function is defined Γ(n) = (n-1)!.

def gamma_fnc(n)
  return nil if n < 1
  factorial(n - 1)
end

def factorial(n)
  return 1 if n <= 1
  n *= factorial(n - 1)
end

# Test Cases
p gamma_fnc(0)  # => returns nil
p gamma_fnc(1)  # => returns 1
p gamma_fnc(4)  # => returns 6
p gamma_fnc(8)  # => returns 5040
puts


# Exercise 4 - Ice Cream Shop
# Write a function ice_cream_shop(flavors, favorite) that takes in an array
# of ice cream flavors available at the ice cream shop, as well as the user's
# favorite ice cream flavor. Recursively find out whether or not the shop
# offers their favorite flavor.

def ice_cream_shop(flavors, favorite)
  return true if favorite == flavors[0]
  return false if flavors.length <= 1
  ice_cream_shop(flavors[1..-1], favorite)
end

# Test Cases
p ice_cream_shop(['vanilla', 'strawberry'], 'blue moon')  # => returns false
p ice_cream_shop(['pistachio', 'green tea', 'chocolate', 'mint chip'], 'green tea')  # => returns true
p ice_cream_shop(['cookies n cream', 'blue moon', 'superman', 'honey lavender', 'sea salt caramel'], 'pistachio')  # => returns false
p ice_cream_shop(['moose tracks'], 'moose tracks')  # => returns true
p ice_cream_shop([], 'honey lavender')  # => returns false
puts


# Exercise 5 - Reverse
# Write a function reverse(string) that takes in a string and returns it
# reversed.

def reverse(string)
  return string if string.length <= 1
  reverse(string[1..-1]) + string[0]
end

# Test Cases
p reverse("house") # => "esuoh"
p reverse("dog") # => "god"
p reverse("atom") # => "mota"
p reverse("q") # => "q"
p reverse("id") # => "di"
p reverse("") # => ""