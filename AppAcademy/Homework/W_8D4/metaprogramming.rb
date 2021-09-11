
# SEND AND DEFINE METHODS
# =======================
obj = Object.new
obj.methods

[].send(:count) # => 0

def do_three_times(object, method_name)
  3.times { object.send(method_name) }
end

class Dog
  def bark
    puts "Woof"
  end
end

dog = Dog.new
do_three_times(dog, :bark)


class Dog
  # defines a class method that will define more methods; this is
  # called a **macro**.

  def self.makes_sound(name)
    define_method(name) { puts "#{name}!" }
  end

  makes_sound(:woof)
  makes_sound(:bark)
  makes_sound(:grr)
end

dog = Dog.new
dog.woof
dog.bark
dog.grr


# METHOD_MISSING
# ==============

class T
  def method_missing(*args)
    p args
  end
end

T.new.adfasdfa(:a, :b, :c) # => [:adfasdfa, :a, :b, :c]


class Cat
  def say(anything)
    puts anything
  end

  def method_missing(method_name)
    method_name = method_name.to_s
    if method_name.start_with?("say_")
      text = method_name[("say_".length)..-1]

      say(text)
    else
      # do the usual thing when a method is missing (i.e., raise an
      # error)
      super
    end
  end
end

earl = Cat.new
earl.say_hello # puts "hello"
earl.say_goodbye # puts "goodbye"


# TYPE INTROSPECTION
# ==================
"who am i".class # => String
"who am i".is_a?(String) # => true

Object.is_a?(Object) # => true
# such meta, wow

Object.class # => Class

Class.superclass # => Module
Class.superclass.superclass # => Object


# METHODS WITH VARYING ARGUMENT TYPES
# ===================================
def perform_get(url)
  if url.is_a?(Hash)
    # url is actually a hash of url options, call another method
    # to turn it into a string representation.
    url = make_url(url)
  end

  # ...
end

perform_get("http://www.google.com/+")
perform_get(
  :scheme => :http,
  :host => "www.google.com",
  :path => "/+"
)