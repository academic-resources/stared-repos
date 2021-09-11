# CLASS INSTANCE VARIABLES
# ========================
class Dog
  def initialize(name)
    @name = name
  end

  # could also use `attr_reader :name` to generate this.
  attr_reader :name
end

class Dog
  def self.all
    @dogs ||= []
  end

  def initialize(name)
    @name = name

    self.class.all << self
  end
end

d1 = Dog.new('Fido')
d2 = Dog.new('Fido 2.0')

p Dog.all
# => [#<Dog:0x007fe140a23928 @name="Fido">,
# <Dog:0x007fe140a628d0 @name="Fido 2.0">]


# INHERITANCE
# ===========
class Corgi < Dog
end


class Dog
  def self.all
    @@dogs ||= []
  end
  
  def initialize(name)
    @name = name
    
    self.class.all << self
  end
end

class Husky < Dog
end

h = Husky.new("Rex")

Dog.all # => #<Husky:0x007f95421b5560 @name="Rex">


# GLOBAL VARIABLES
# ================
# this should have been a class variable though...
$all_dogs = []

class Dog
  def self.all
    $all_dogs
  end
  
  def initialize(name)
    @name = name
    
    $all_dogs << self
  end
end

# *AVOID GLOBAL VARIABLES*

def puts(*args)
  $stdout.puts(*args)
end

def gets(*args)
  $stdin.gets(*args)
end