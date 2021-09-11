# Back in the good old days, you used to be able to write a darn near
# uncrackable code by simply taking each letter of a message and incrementing it
# by a fixed number, so "abc" by 2 would look like "cde", wrapping around back
# to "a" when you pass "z".  Write a function, `caesar_cipher(str, shift)` which
# will take a message and an increment amount and outputs the encoded message.
# Assume lowercase and no punctuation. Preserve spaces.
#
# To get an array of letters "a" to "z", you may use `("a".."z").to_a`. To find
# the position of a letter in the array, you may use `Array#find_index`.

def caesar_cipher(str, shift)
  letters = ("a".."z").to_a
  (0...str.length).each do |i|
    index = letters.index(str[i])
    if index
      str[i] = letters[(index + shift) % 26]
    end
  end
  str
end

# Write a method, `digital_root(num)`. It should Sum the digits of a positive
# integer. If it is greater than 10, sum the digits of the resulting number.
# Keep repeating until there is only one digit in the result, called the
# "digital root". **Do not use string conversion within your method.**
#
# You may wish to use a helper function, `digital_root_step(num)` which performs
# one step of the process.

# Example:
# digital_root(4322) => digital_root(11) => (2)

def digital_root(num)
  return num if num < 10
  my_num = num
  sum = 0
  while my_num > 10
    sum += my_num % 10
    my_num = my_num / 10
  end
  digital_root(sum)
end

# Jumble sort takes a string and an alphabet. It returns a copy of the string
# with the letters re-ordered according to their positions in the alphabet. If
# no alphabet is passed in, it defaults to normal alphabetical order (a-z).

# Example:
# jumble_sort("hello") => "ehllo"
# jumble_sort("hello", ['o', 'l', 'h', 'e']) => 'ollhe'

def jumble_sort(str, alphabet = nil)
  alphabet ||= ("a".."z").to_a
  str.split("")
    .map do |letter| { "letter" => letter, "order" => alphabet.index(letter) } end
    .sort do |a, b| a["order"] <=> b["order"] end
    .map { |h| h["letter"] }
    .join("")
end

class Array
  # Write a method, `Array#two_sum`, that finds all pairs of positions where the
  # elements at those positions sum to zero.

  # NB: ordering matters. I want each of the pairs to be sorted smaller index
  # before bigger index. I want the array of pairs to be sorted
  # "dictionary-wise":
  #   [0, 2] before [1, 2] (smaller first elements come first)
  #   [0, 1] before [0, 2] (then smaller second elements come first)

  def two_sum
    pairs = []
    (0..self.length - 1).each do |i|
      (i...self.length).each do |j|
        if self[i] + self[j] == 0
          pairs << [i, j]
        end
      end
    end
    pairs
  end
end

class String
  # Returns an array of all the subwords of the string that appear in the
  # dictionary argument. The method does NOT return any duplicates.

  def real_words_in_string(dictionary)
    found = {}
    (0..self.length).each do |i|
      (i..self.length).each do |j|
        sub_w = self[i..j]
        if dictionary.include?(sub_w)
          found[sub_w] = true
        end
      end
    end

    found.keys
  end
end

# Write a method that returns the factors of a number in ascending order.

def factors(num)
end
