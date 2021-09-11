def first_anagram(str1, str2)
   subs = []
   perms = str1.chars.permutation.to_a
   perms.include?(str2.chars)
end

#p first_anagram('elvis', 'lives')
# time complexity = O(n!)

def second_anagram?(str1, str2)
  str1.each_char.with_index do |char, idx|
    idx2 = str2.index(char)
    str2[idx2] = "" unless idx2 == nil 
  end
  str2.empty? 
end

#second_anagram?("elvis", "lires")
# time complexity O(n)

def third_anagram?(str1, str2)
  str1.chars.sort == str2.chars.sort
end

#third_anagram?("elvis", "lives")
# .chars => n
# .sort => n log n 
# iterating through to find it's position in the alphabet 
#   reassigning it to the array in the new position 
# time complexity O(n log n)

def fourth_anagram(str1, str2)
    hash = Hash.new(0)
    str1.chars.each do |char|
        hash[char] += 1
    end
    str2.chars.each do |char2|
        hash[char2] -= 1 
    end
    hash.values.all? {|value| value == 0}
end

p fourth_anagram('elvis', 'lived')

# time complexity O(n)