class String
  def first_anagram?(str) #O(n!)
    anas = self.chars.permutation.map { |arr| arr.join("") }
    anas.include?(str)
  end
end

p "richard".first_anagram?("drahcir")

class String
  def second_anagram?(str) # O(n)
    str_array = str.chars
    self.each_char do |c|
      idx = str_array.find_index(c)
      return false if idx.nil?
      str_array.delete_at(idx)
    end
    return str_array.empty?
  end
end

p "richard".second_anagram?("drahcir")

class String
  def third_anagram?(str) #O(nlogn) - ruby uses merge sort
    self.chars.sort == str.chars.sort
  end
end

p "richard".third_anagram?("drahcir")

class String
  def fourth_anagram?(other_str) #O(n)
    hash = Hash.new { 0 }
    self.chars.each do |c|
      hash[c] += 1
    end
    other_str.chars.each do |c|
      hash[c] -= 1
    end
    hash.keys.all? { |k| hash[k] == 0 }
  end
end

p "richard".fourth_anagram?("drahcir")
