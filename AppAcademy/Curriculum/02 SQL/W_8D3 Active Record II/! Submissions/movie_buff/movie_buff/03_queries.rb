def what_was_that_one_with(those_actors)
  # Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.
  
  Movie
    .select("movies.id, movies.title")
    .joins(:actors)
    .where(actors: {name: those_actors})
    .group("movies.id")
    .having("COUNT(castings.actor_id) >= ?", those_actors.length)

end

def golden_age
  # Find the decade with the highest average movie score.
  movies_by_year = Movie
  .select("movies.yr, SUM(score) as sum, count(score) as movie_count")
  .group(:yr)
  .order(:yr)
  .map { |movie| [movie.yr, movie.sum, movie.movie_count]}

  score_by_decade = {}
  
  movies_by_year.each do |movie|
    decade = movie.first / 10 * 10
    score_by_decade[decade][sum] += movie[1]
    score_by_decade[decade][count] += movie[1]
    # what decade is it?
    # score_by_decade[decade] = [movie.sum, movie.movie_count]
    # {1920: {total_score: ??, movie_count: ??} }


    # movies = Movies.include()
    # (191..201).each do |year|
    #   start = year * 10
    #   finish = year * 10 + 9
    #   highest_score = 0
    # Movie.where(yr: start..finish).select("SUM(score) / COUNT(movies) as average").map(&:average)
    # Movie.where(yr: 1920..1929).select("SUM(score) / COUNT(movies) as average").map(&:average)

end

def costars(name)
  # List the names of the actors that the named actor has ever
  # appeared with.
  # Hint: use a subquery

end

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie

end

def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the
  # letters in whazzername, ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but
  # not like "stallone sylvester" or "zylvester ztallone"

end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names. Show each actor's id, name, and the length of
  # their career.

end
