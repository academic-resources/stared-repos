# digital_root
# Write a method, digital_root(num). It should sum the digits of a positive integer. If it is greater than or equal to 10, sum the digits of the resulting number. Keep repeating until there is only one digit in the result, called the "digital root". Do not use string conversion within your method.

def digital_root(num)
  while num >= 10
    num = digital_root_step(num)
  end

  num
end

def digital_root_step(num)
  root = 0
  while num > 0
    root += (num % 10)

    num /= 10
  end

  root
end

#recursive solution

def digital_root_recur num
  return num if num < 10
  digital_root_recur((num % 10) + (num / 10))
end

# caesar_cipher
# Write a function that takes a message and an increment amount and outputs the same letters shifted by that amount in the alphabet. Assume lowercase and no punctuation. Preserve spaces.

def caesar_cipher(str, shift)
  letters = ("a".."z").to_a

  encoded_str = ""
  str.each_char do |char|
    if char == " "
      encoded_str << " "
      next
    end

    old_idx = letters.find_index(char)
    new_idx = (old_idx + shift) % letters.count

    encoded_str << letters[new_idx]
  end

  encoded_str
end