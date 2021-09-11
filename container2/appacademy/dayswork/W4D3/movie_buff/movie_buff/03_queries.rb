def what_was_that_one_with(those_actors)
  # Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.
  Movie.select(:id, :title)
    .joins(:actors)
    .where("actors.name IN (?) ", those_actors)
    .group(:id)
    .having("COUNT(actors.id) = #{those_actors.length}")
    .distinct
end

def golden_age
  # Find the decade with the highest average movie score.
  Movie.select("yr/10 as decade")
    .group("yr/10")
    .order("AVG(score) DESC")
    .map { |e| e.decade * 10 }.first
end

def costars(name)
  # List the names of the actors that the named actor has ever
  # appeared with.
  # Hint: use a subquery
  movies = Movie.select("movies.id").joins(:actors).where("actors.name = (?)", name)
  Actor.select(:name)
    .joins(:movies)
    .where("movies.id IN (?)", movies)
    .distinct
    .map { |a| a.name }
    .reject { |n| n == name }
end

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie
  Actor.select("COUNT(*) as no_work")
    .left_outer_joins(:movies)
    .where("movies.id IS NULL")
    .map { |a| a.no_work }
    .first
end

def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the
  # letters in whazzername, ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but
  # not like "stallone sylvester" or "zylvester ztallone"
  whaz_char = "%" + whazzername.chars.map { |c| c + "%" }.join("")
  Movie.joins(:actors).where("actors.name ilike '#{whaz_char}'")
end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names. Show each actor's id, name, and the length of
  # their career.

  Actor.select(:id, :name, "MAX(movies.yr) - MIN(movies.yr) as career")
    .joins(:movies)
    .group("actors.id")
    .order("career DESC")
    .limit(3)
end
