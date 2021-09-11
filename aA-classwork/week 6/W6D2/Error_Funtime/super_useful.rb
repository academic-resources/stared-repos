# PHASE 2
def convert_to_int(str)
  Integer(str)
  rescue ArgumentError => error
    # puts 'invalid value
    return -1
end
 
# PHASE 3
FRUITS = ["apple", "banana", "orange"]

def reaction(maybe_fruit)
  if FRUITS.include? maybe_fruit
    puts "OMG, thanks so much for the #{maybe_fruit}!"
  else 
    raise StandardError
  end 
end

def feed_me_a_fruit
  begin
  puts "Hello, I am a friendly monster. :)"
  puts "Feed me a fruit! (Enter the name of a fruit:)"
  maybe_fruit = gets.chomp
    reaction(maybe_fruit)
  rescue StandardError => exception
    puts 'not a fruit I like, please feed me coffee.'
    gets_coffee = gets.chomp
    until gets_coffee == 'coffee'
      puts 'not a fruit I like, please feed me coffee.'
      gets_coffee = gets.chomp
    end
    retry if gets_coffee == 'coffee'
  end
   
end  

# PHASE 4
class YearsKnownError < RuntimeError 
  def message
    "You haven't known them for long enough"
  end
end

class EmptyStringError < RuntimeError
  def message
    "Need to enter name and favorite pasttime"
  end
end

class BestFriend


  def initialize(name, yrs_known, fav_pastime)
    raise YearsKnownError if yrs_known <= 5
    raise EmptyStringError if name.length <= 0 || fav_pastime.length <= 0
    @name = name
    @yrs_known = yrs_known
    @fav_pastime = fav_pastime
  end

  def talk_about_friendship
    puts "Wowza, we've been friends for #{@yrs_known}. Let's be friends for another #{1000 * @yrs_known}."
  end

  def do_friendstuff
    puts "Hey bestie, let's go #{@fav_pastime}. Wait, why don't you choose. 😄"
  end

  def give_friendship_bracelet
    puts "Hey bestie, I made you a friendship bracelet. It says my name, #{@name}, so you never forget me." 
  end
end


