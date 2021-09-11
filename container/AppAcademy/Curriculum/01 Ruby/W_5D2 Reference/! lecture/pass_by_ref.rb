require 'byebug'

###################
#Pass By Reference#
###################

# immutable: integers, floats, booleans, nil
# mutable: strings, arrays, hash

ruby_love = ["I", "Love", "Ruby"]

# ruby_love.each do |word| 
#     # word = word + !
#     # creating a brand new variable
#     word += "!"
# end

# mapped_ruby_love = ruby_love.map { |word| word += "!" }

# ruby_love.each do |word| 
#     debugger
#     word << "!" 
#     debugger
# end
# debugger

# ruby_love.map { |word| word << "!" }
# puts ruby_love
# p ruby_love
# print ruby_love

#########################
#Hash and Array Defaults#
#########################

# Array defaults 

# arrays = Array.new(3, [])
# arrays[0] << 'something'
# puts arrays
# debugger
# what will arrays be?

# arrays = Array.new(3) { Array.new }
# arrays[0] << 'something else'
# puts arrays
# debugger
# what will arrays be?


# Hash defaults

# my_hash = Hash.new([])
# my_hash[:instructors] = my_hash[:instructors] + ['Carly']
# my_hash[:instructors] += ['Carly']
# my_hash[:instructors] += ['Mashu']
# my_hash[:not_instructors] << 'Someone else'
# debugger
# will my_hash have not_instructors?
# what will my_hash[:hello] return?

# my_hash = Hash.new { [] }
# my_hash[:me] = 'Mashu'
# my_hash[:instructors] << 'Carly'
# what keys will my_hash contain?
# debugger


# better solution here. to actually set the values.
# counter = Hash.new(0)
my_hash = Hash.new { |hash, key| hash[key] = [] } 
my_hash[:students]
my_hash[:instructors]
my_hash[:something] << 'toihsldjfg'
# debugger



##################
#Procs and Blocks#
##################

# block: 
    # a bit of code that we pass into a function
    # can take arguments, unlimited
    # scope of the arguments are local to the block
    # blocks always the last argument to the method call
# proc:
    # being able to store a block in memory
    # so we can call it later. 
    # can use procs to pass in block of code to a method
    # a Ruby class --- Proc.new { BLOCK }

def run_block(&prc) # ----> the ampersand here captures block and converts it to Proc
    # & convert a block to a Proc
    puts "hello from the run_block method"
    prc.call
end
# run_block do 
#   puts "inside the block, called from run_block method" 
# end

# def run_proc(proc)
#     # debugger
#     proc.call
# end
# run_proc(Proc.new { puts "hello from the proc!" })

def do_array_proc
    arr = [1,2,3]

    # Implement me!
    # create a Proc that puts to the terminal its argument 
    # iterate arr, calling the proc for each el
    some_proc = Proc.new { |argument| puts argument }

    # & ----> convert a proc to a block
    arr.each(&some_proc) #{ |num| some_proc.call(num) }
end
# do_array_proc

def run_proc_then_block(my_proc)
    my_proc.call
    run_proc(my_proc)
    run_block(&my_proc) # ---> & converting my_proc to a block
end

# run_proc_then_block(Proc.new { puts 'hi, from new proc' })

# &: block-ifies a proc when used in method call 
# &: proc-ifies a block when used in method signature

#################################
#attr_accessor and class methods#
#################################

class Fish

    def self.make_random_fish
        # self ----> the class Fish 
        name = ""
        5.times do
            name << ('a'..'z').to_a.sample
        end
        self.new(name, self.random_state_of_being)
    end

    def self.make_nemo
        Fish.new("nemo", self.random_state_of_being)
    end

    def self.random_state_of_being
        [true, false].sample
    end

    # self is the Class itself, so Fish
    def initialize(name, lost)
        @name = name
        @lost = lost
    end

    attr_accessor :lost
    attr_reader :name

    # getter name 
    # attr_reader :name
    # def name 
    #     @name
    # end

    # attr_writer :name 
    # setter name 
    # def name=(new_name)
    #     @name = new_name
    # end

    def find
        debugger
        self.lost = false
        debugger
    end

end