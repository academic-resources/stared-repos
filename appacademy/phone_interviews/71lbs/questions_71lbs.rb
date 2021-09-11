# 1.- How do you calculate the power of a number?
# Answer:
#   You calculate the power of a number by multiplying it
#   by itself N times, where N is the power

# 2. - Write a ruby method that returns the even numbers from an
# array of float numbers. (Do not use the even ruby method)
# Answer:
def even_numbers(arr)
  as_int = arr.map do |el|
    el.to_i
  end
  as_int.select do |el|
    el % 2 == 0
  end
end

# 3.- What are collection and member routes?
# # Answer:
#   A member route acts on a single record and requires an id as
#   a parameter.  A collection route acts on a list of records
#   and does not require an id parameter

# 4.- What is polymorphism?
# # Answer:
# Its the ability of a method on a class or a function to
# behave differently based on the number of parameters its called
# with.
# You could also consider overwiting a method of
# a parent class on its various types of children as polymorphism
# as well Dog.makeSound() vs Cat.makeSound() where Dog < Animal
# and Cat < Animal and Animal.makeSound() also exists.

# 5.- What is the purpose of object private methods?
# # Answer:
# Sometimes you want to restrict certain methods to the object
# itself, usually because they serve some interim purpose but
# really shouldn't be called directly.  If made private, they
# can only be called from within the object instance.  If your
# class had the public method "kick", it could involve a call to
# "raise_leg" followed by "thrust_leg_forward".  Based on the
# application, it could lead to the wrong behavior if the user could
# call "thrust_leg_forward" all on its own, independent of "kick".
# So we'd make "thrust_leg_forward" private

# 6.- Write a web scraper that will generate a csv of all the
# 3 bedroom, 2 bathroom homes for rent in a given city on Craigslist.
# The csv should have the following columns: title, address
# (if available), monthly rent (if available), URL

require "nokogiri"
require "httparty"
require "csv"

def scrape(city)
  page = HTTParty.get("https://#{city}.craigslist.org/search/apa?min_bedrooms=3&max_bedrooms=3&min_bathrooms=2&max_bathrooms=2&availabilityMode=0&sale_date=all+dates")
  parsed_page = Nokogiri::HTML(page)
  paragraphs = parsed_page.css("p.result-info")
  output = paragraphs.map do |p|
    [
      p.css("a.result-title").map(&:text)[0],
      p.css("a.result-title").map { |link| link["href"] }[0],
      p.css("span.result-meta span.result-price").map(&:text)[0],
      p.css("span.result-meta span.result-hood").map(&:text)[0],
    ]
  end

  File.open("for_rent_#{city}.csv", "w") do |f|
    f.write(output.inject([]) do |csv, row|
      csv << CSV.generate_line(row)
    end.join(""))
  end
end

scrape("miami")
