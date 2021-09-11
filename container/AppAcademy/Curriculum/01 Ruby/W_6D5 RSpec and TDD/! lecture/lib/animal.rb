# class NoSuchThingAsFriendlyCats < NoMethodError; end

class Dog
  
  attr_reader :name, :puppies
  # attr_writer name

  def initialize(name)
    @name = name
    @puppies = []
  end

  def name=(new_name)

  end

  def encounter_cat(cat)
    cat.friendly ? play : run
  end

  def add_puppy(pup)
    puppies.push(pup)
  end

  def unfriendly_encounter
    raise NoSuchThingAsFriendlyCats.new('Woof Woof!')
  end


  private

  def play
    "I'm playing"
  end

  def run
  end
  
end

class Cat
  def initialize(friendly)
    friendly = true
  end
end