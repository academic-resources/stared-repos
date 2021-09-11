class Array
    def my_each(&prc)
        i = 0
        while i < self.length
            prc.call(self[i])
            i += 1
        end
        self
    end

    def my_select(&prc)
        result = []
        self.my_each { |ele| result.push(ele) if prc.call(ele) }
        result
    end

    def my_reject(&prc)
        result = []
        self.my_each { |ele| result.push(ele) if !prc.call(ele) }
        result
    end

    def my_any?(&prc)
        self.my_each { |ele| return true if prc.call(ele) }
        false
    end

    def my_all?(&prc)
        self.my_each { |ele| return false if !prc.call(ele) }
        true
    end

    def my_flatten
        result = []
        self.my_each do |ele|
            if ele.kind_of?(Array)
                result += ele.my_flatten
            else
                result += [ele]
            end
        end
        result
    end

    def my_zip(*arr)
        result = []
        self.each_with_index do |ele_1, idx|
            array = []
            array << ele_1
            arr.my_each do |ele_2|
                array << ele_2[idx]
            end
            result << array 
        end
        result
    end

    def my_rotate(rotations = 1)
        if rotations > 0
            rotations.times do 
                self.push(self.shift)
            end
        else
            (-1 * rotations).times do 
                self.unshift(self.pop)
            end
        end
        self
    end

    def my_join(sep = '')
        result = ''
        self.my_each {|ele| result += ele + sep}
        if result.end_with?(sep) && sep != ''
            result = result[0...(-1 * sep.length)]
        end
        result
    end

    def my_reverse
        result = []
        (0...self.length).reverse_each do |i|
            result << self[i]
        end
        result
    end

    def bubble_sort!(&prc)
        sorted = false
        while !sorted
            sorted = true
            (0...self.length-1).each do |i|
                if prc.call(self[i], self[i+1]) == 1
                    self[i], self[i+1] = self[i+1], self[i]
                    sorted = false
                end
            end
        end
        self
    end

    def bubble_sort(&prc)
        output = [*self]
        sorted = false
        while !sorted
            sorted = true
            (0...output.length-1).each do |i|
                if prc.call(output[i], output[i+1]) == 1
                    output[i], output[i+1] = output[i+1], output[i]
                    sorted = false
                end
            end
        end
        output
    end

end

def factors(num)
    result = []
    (1..num).each { |divisor| result << divisor if num % divisor == 0 }
    result
end

def substrings(str)
    output = []
    (0...str.length).each do |idx1|
        (idx1...str.length).each do |idx2|
            output << str[idx1..idx2]
        end
    end

    output
end

def subwords(word, dict)
    output = []
    dict.each do |ok_word|
        output << ok_word if word.include?(ok_word)
    end
    output
end

