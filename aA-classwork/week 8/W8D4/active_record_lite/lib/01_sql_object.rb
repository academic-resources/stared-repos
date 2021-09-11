require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
  return @col_names unless @col_names.nil?
  column_names = DBConnection.execute2(<<-SQL)
      SELECT *
      FROM #{table_name}
  SQL
  
  @col_names = column_names.first.map {|col| col.to_sym}
  end

  def self.finalize!
    self.columns.each do |col|
      define_method(col) do 
        self.attributes[col] 
      end
      define_method("#{col}=") do |param|
        self.attributes[col] = param
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name ||= self.to_s.tableize
  end

  def self.all
    # ...
    results = DBConnection.execute(<<-SQL)
      SELECT *
      FROM #{table_name}
    SQL
    self.parse_all(results)
  end

  def self.parse_all(results)
    # ...
    results.map {|result| self.new(result)}
  end

  def self.find(id)
    # ...
    item = DBConnection.execute(<<-SQL, id)
      SELECT *
      FROM #{table_name}
      WHERE #{table_name}.id = ?
      LIMIT 1
      SQL
      self.parse_all(item).first
  end

  def initialize(params = {})
    
    params.each do |key, value|
      attr_name = key.to_sym
      if self.class.columns.include?(attr_name)
        self.send("#{attr_name}=", value)
      else
        raise "unknown attribute '#{attr_name}'"
      end
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    # ...
    self.attributes.values
  end

  def insert
    # ...
    col_names = self.class.columns.drop(1).join(",")
    question_marks = (["?"] * col_names.split(",").length).join(",")
    to_insert = DBConnection.execute(<<-SQL, *self.attribute_values)
      INSERT INTO 
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{question_marks})
    SQL

    self.id = DBConnection.last_insert_row_id
  end

  def update
    # ...
    col = self.class.columns
    values = self.attribute_values
    set_string = col.map {|attr_name| "#{attr_name}= ?"}.join(",")
    DBConnection.execute(<<-SQL, *values, self.id)
    UPDATE
      #{self.class.table_name} 
    SET
      #{set_string}
    WHERE
      id = ?
    SQL
  end

  def save
    # ...
    id.nil? ? self.insert : self.update
  end
end
