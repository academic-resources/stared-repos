require 'byebug'
require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    return @columns if @columns
    output = DBConnection.execute2(<<-SQL)
    SELECT * 
    FROM #{table_name}
    SQL
    @columns = output.first.map { |c| c.to_sym }
  end

  def self.finalize!
    self.columns.each do |col|
      define_method(col) { self.attributes[col] }
      define_method("#{col}=") { |val| self.attributes[col] = val} #Q: JJ would col += work instead of interpolation
    end
  end

  def self.table_name=(table_name)
    @table_name =  table_name || self.name.tableize
  end
  
  def self.table_name
    # @table_name.nil? ? self.name.tableize : @table_name #also works
    @table_name =  @table_name || self.name.tableize
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
    SELECT * FROM #{self.table_name}
    SQL

    self.parse_all(results)
  end

  def self.parse_all(results)
    results.map { |h| self.new(h) } # .new is built-in and calls initialize
  end

  def self.find(id)
    results = DBConnection.execute(<<-SQL, id)
    SELECT * FROM #{self.table_name}
    WHERE id = ? 
    SQL

    self.parse_all(results).first
  end

  def initialize(params = {})
    params.each do |attr_name, value|
      raise "unknown attribute '#{attr_name}'" unless self.class.columns.include?(attr_name.to_sym) #Q: JJ self.class v. SQLObjects.class clarification
      method_name = "#{attr_name}="
      method = self.methods.select { |m| m.to_s == method_name }.first #Q: JJ
      self.send(method,value) #Q: calling method is ok here b/c line 46 guarantees it is there. 
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map { |c| self.send(c) } #Q: JJ self.attributes?
  end

  def insert
    col_names = self.class.columns.join(",")
    question_marks = "(" + Array.new(self.class.columns.count, "?").join(",") + ")"
    results = DBConnection.execute(<<-SQL, *attribute_values)
    INSERT INTO #{self.class.table_name} (#{col_names})
    VALUES #{question_marks}
    SQL
    foo = DBConnection.insert_id
    puts foo
  end

  def update
    # ...
  end

  def save
    # ...
  end
end
