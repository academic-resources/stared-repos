
# Phase I
# O(n!)
def first_anagram?(word_1, word_2)
  anagrams = word_1.split("").permutation.map(&:join).to_a
  anagrams.include?(word_2)
end

# Phase II
# O(n**2)
def second_anagram?(word_1, word_2)
  word = word_2.chars
  word_1.each_char do |char|
    word[word.find_index(char)] = "" if word.find_index(char)
  end
  word.join.empty?
end

# Phase III
# O(n Log(n))
def third_anagram?(word_1, word_2)
  word_1.chars.sort == word_2.chars.sort
end

# Phase IV
# O(n)
def fourth_anagram?(word_1, word_2)
  word_1_chars = Hash.new(0)
  word_1.chars.each { |char| word_1_chars[char] += 1 }
  word_2.chars.each { |char| word_1_chars[char] -= 1 }
  word_1_chars.values.all?(&:zero?)
end