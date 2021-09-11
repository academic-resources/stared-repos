require_relative 'db_connection'
require 'active_support/inflector'
require 'byebug'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject

  def self.columns
    @columns ||= DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        #{table_name}
      ;
    SQL
    .first.map(&:to_sym)
  end

  def self.finalize!
    columns.each do |column|
      define_method("#{column}") do
        attributes[column]
      end

      define_method("#{column}=") do |name|
        attributes[column] = name
      end

    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    name_array = self.to_s.split(/(?=[A-Z])/)
    snake_case = name_array.map(&:downcase).join("_")
    table_name = "#{snake_case}s"
    @table_name ||= table_name
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
      ;
    SQL
    self.parse_all(results)
  end

  def self.parse_all(results)
    results.map { |result| self.new(result) }
  end

  def self.find(id)
    result = DBConnection.execute(<<-SQL, id)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
      WHERE
        #{table_name}.id = ?
      ;
    SQL
    self.parse_all(result).first
  end

  def initialize(params = {})
    params.each do |name, value|
      name = name.to_sym
      if self.class.columns.include?(name)
        self.send("#{name}=", value)
      else
        raise "unknown attribute '#{name.to_s}'"
      end
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map { |col| self.send("#{col}") }
  end

  def insert
    table_name = self.class.table_name
    col_names = self.class.columns
    columns = col_names.join(", ")
    question_marks = Array.new(col_names.to_a.length, "?").join(", ")
    DBConnection.execute(<<-SQL, *attribute_values)
      INSERT INTO
        #{table_name}
        (#{columns})
      VALUES
        (#{question_marks})
      ;
    SQL
    self.id = DBConnection.last_insert_row_id
  end

  def update
    table_name = self.class.table_name
    col_names = self.class.columns.map { |column| "#{column} = ?"}
    columns = col_names.join(", ")
    DBConnection.execute(<<-SQL, *attribute_values, self.id)
      UPDATE
        #{table_name}
      SET
        #{columns}
      WHERE
        id = ?
      ;
    SQL
  end

  def save
    if id
      update
    else
      insert
    end
  end
  
end
