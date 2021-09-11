require_relative '03_associatable'
require 'byebug'
# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options

  def has_one_through(name, through_name, source_name)
    # has_one :board,
    # foreign_key: :company_id,
    # primary_key: :id,
    # class_name: :Board
    #self = cat
    #through = human
    # source = house
    define_method(name) do 
      through_options = self.class.assoc_options[through_name]
      source_options = through_options.model_class.assoc_options[source_name]
      
      #HUMAN
      through_table_name = through_options.table_name
      through_primary = through_options.primary_key
      through_foreign = through_options.foreign_key
      
      #HOUSE
      source_table_name = source_options.table_name
      source_primary = source_options.primary_key
      source_foreign = source_options.foreign_key


      # debugger
      # foreign_value = self.send(through_options.foreign_key)
      # source_options.model_class.where(source_options.primary_key => foreign_value).first
      # debugger
      through_fk_value = self.send(through_foreign)
      results = DBConnection.execute(<<-SQL, "#{through_fk_value}" )
      SELECT 
        #{source_table_name}.*
      FROM
        #{through_table_name}
      JOIN
        #{source_table_name} ON #{through_table_name}.#{source_foreign} = #{source_table_name}.id
      WHERE
        #{through_table_name}.id = ?
      
      SQL
      source_options.model_class.parse_all(results).first

      # SELECT houses.*
      # FROM houses
      # JOIN humans ON houses.id = humans.house_id
      # WHERE humans.id = cats.owner_id
      

    end
  end
end
