require 'sqlite3'
require 'singleton'

# Our ORM - Object Relational Mapping

class PlayDBConnection < SQLite3::Database
  include Singleton

  def initialize
    super('plays.db')
    self.type_translation = true
    self.results_as_hash = true
  end
end

class Play
  # allows our methods to access the title, year, and playwright_id
  attr_accessor :title, :year, :playwright_id

  # shows us every entry we have in our play_db
  def self.all
    data = PlayDBConnection.instance.execute('SELECT * FROM plays')
    # returns an array of hashes where each hash represents a row in database
    # but we want an instance of the play class
    data.map { |datum| Play.new(datum) }
    # converts the array into an object instance
  end

  # creates a new instance of the Play class
  # receives an options hash which comes in one of two ways:
  #   - comes from the factory ::all method
  #   - comes from a user
  # id will be nil if user doesn't define
  def initialize(options)
    @id = options['id']
    @title = options['title']
    @year = options['year']
    @playwright_id = options['playwright_id']
  end

  # saves the instance to the data base
  def create
    raise "#{self} already in database" if @id

    # use heredoc syntax - everything read in as a string
    # execute from SQLite3 gem allows us to pass/bind args
    PlayDBConnection.instance.execute(<<-SQL, @title, @year, @playwright_id)
      INSERT INTO
        plays (title, year, playwright_id)
      VALUES
        (?, ?, ?)
    SQL
    # So why use '?'s -- Prevents SQL injection attacks
    # A melicious user could inject extra data into the string
    # i.e playwright_id = "3; DROP TABLE plays" - the ';' allows for next line
    # Basically, by binding using the '?' sanitizes the input and
    #   escapes any potentially dangerous characters like ';' to '\;'
    @id = PlayDBConnection.instance.last_insert_row_id
  end

  # allows us to update the database in case of errors
  def update
    raise "#{self} not in database" unless @id

    # another heredoc
    PlayDBConnection.instance.execute(<<-SQL, @title, @year, @playwright_id, @id)
      UPDATE
        plays
      SET
        title = ?, year = ?, playwright_id = ?
      WHERE
      id = ?
    SQL
  end
end
