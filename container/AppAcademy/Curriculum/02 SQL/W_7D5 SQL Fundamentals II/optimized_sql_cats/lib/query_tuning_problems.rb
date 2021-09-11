# == Schema Information
#
# Table name: cats
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  breed       :string
#
# Table name: toys
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  price       :integer
#
# Table name: cattoys
#
#  id          :integer      not null, primary key
#  cat_id      :integer      not null, foriegn key
#  toy_id      :integer      not null, foreign key

require_relative '../data/query_tuning_setup.rb'

# Run the specs and make sure to make the query plans for the following 
# questions as efficient as possible.

# Experiment with adding and dropping indexes, and using subqueries vs. other 
# methods to see which are more efficient.

def example_find_jet
# Find the breed and color for the cat named 'Jet'.

# Get cost within the range of: 4..15

#  CREATE INDEX cats_name ON cats(name)

execute(<<-SQL)
  SELECT
    cats.name
  FROM
    cats
  WHERE 
    cats.name = 'Jet'
  SQL
end


def cats_and_toys_alike
  # Find all the cat names where the cat and the toy they own are both the color 'Blue'.

  # Order alphabetically by cat name
  # Get your overall cost lower than: 590
  execute(<<-SQL)
    SELECT DISTINCT
      cats.name
    FROM
      cats
    JOIN
      cattoys
      ON cats.id = cattoys.cat_id
    JOIN
      toys
      ON toys.id = cattoys.toy_id
    WHERE
      cats.color = 'Blue'
    AND
      toys.color = 'Blue'
    ORDER BY
      cats.name
    ;
  SQL
end

def toyless_blue_cats
  # Use a type of JOIN that will list the names of all the cats that are 'Navy Blue' and have no toys. 

  # Get your overall cost lower than: 95
  execute(<<-SQL)
    SELECT
      cats.name
    FROM
      cats
    LEFT JOIN
      cattoys
      ON cats.id = cattoys.cat_id
    WHERE
      cats.color = 'Navy Blue'
    AND
      cattoys.toy_id IS NULL
    ;
  SQL
end

def find_unknown
  # Find all the toys names that belong to the cat who's breed is 'Unknown'.

  # Order alphabetically by toy name

  # Get your overall cost lower than: 406
  execute(<<-SQL)
    SELECT
      toys.name
    FROM
      toys
    JOIN
      cattoys
      ON cattoys.toy_id = toys.id
    JOIN
      cats
      ON cattoys.toy_id = cats.id
    WHERE
      toys.id IN (
        SELECT
          toy_id
        FROM
          cattoys
        JOIN
          cats
          ON cattoys.cat_id = cats.id
        WHERE
          cats.breed = 'Unknown'
      )
    GROUP BY
      toys.name
    ORDER BY
      toys.name
    ;
  SQL
end

def cats_like_johnson
  # Find the breed of the 'Lavender' colored cat named 'Johnson'. 
  # Then find all the name of the other cats that belong to that breed. 
  # Include the original Lavendar colored cat name Johnson in your results.

  # Order alphabetically by cat name

  # Get your overall cost lower than: 100
  execute(<<-SQL)
    SELECT
      name
    FROM
      cats
    WHERE
      breed = (
          SELECT
            breed
          FROM
            cats
          WHERE
            color = 'Lavender'
            AND
            name = 'Johnson'
          )
    ORDER BY
      name
    ;
  SQL
end


def cheap_toys_and_their_cats
  # Find the cheapest toy. Then list the name of all the cats that own that toy.

  # Order alphabetically by cats name
  # Get your overall cost lower than: 230
  execute(<<-SQL)
  
  SQL
end

def cats_with_a_lot
  # Find the names of all cats with more than 7 toys.
  
  # Order alphabetically by cat name
  # Get your overall cost lower than: 730
  execute(<<-SQL)

  SQL
end


def expensive_tastes
  # Find the most expensive toy then list the toys's name, toy's color, and the name of each cat that owns that toy.

  # Order alphabetically by cat name
  # Get your overall cost lower than: 720
  execute(<<-SQL)

  SQL
end


def five_cheap_toys
  # Find the name and prices for the five cheapest toys.

  # Order alphabetically by toy name.
  # Get your overall cost lower than: 425
  execute(<<-SQL)


  SQL
end

def top_cat
  # Finds the name of the single cat who has the most toys and the number of toys.

  # Get your overall cost lower than: 1050
  execute(<<-SQL)

  SQL
end


