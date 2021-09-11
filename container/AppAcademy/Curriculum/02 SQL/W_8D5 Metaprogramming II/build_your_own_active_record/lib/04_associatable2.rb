require_relative '03_associatable'
require 'byebug'

# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options
  p self
  def has_one_through(name, through_name, source_name)
    # p self.class => Class
    # p self => Cat
    define_method(name) do
      # p self.class => Cat
      # p self => Cat instance
      through_options = self.class.assoc_options[through_name]
      source_options = through_options.model_class.assoc_options[source_name]

      through_table = through_options.table_name        # humans
      source_table = source_options.table_name          # houses

      primary_key = source_options.primary_key.to_s     # houses.id
      foreign_key = source_options.foreign_key.to_s     # humans.house_id
      match_key = through_options.primary_key.to_s      # humans.id

      parameter = send(through_options.foreign_key)

      results = DBConnection.execute(<<-SQL, parameter)
        SELECT
          #{source_table}.*
        FROM
          #{source_table}
        JOIN
          #{through_table}
          ON
          #{source_table}.#{primary_key} = #{through_table}.#{foreign_key}
          WHERE
          #{through_table}.#{match_key} = ?
      SQL
      source_options.model_class.parse_all(results).first
    end
  end
end

# has_one: :house, (method name)
#   through: :owners, (through method)
#   source: :house

# class Cat
# belongs_to :human,
#   class_name: :Human
#   primary_key: :id,       #(in humans)
#   foreign_key: :owner_id  #(in cats)
#
# ======target model=======
# has_one: :house,
#   through: owners,        #(method in Cat)
#   source: house           #(method in Human)
# ^^^^^^target model^^^^^^^

# class Human
# has_many :cats,
#   class_name: :Cat,
#   primary_key: :id,       #(in humans)
#   foreign_key: :owner_id  #(in cats)
#
# belongs_to :house,
#   class_name: :House,
#   primary_key: :id,       #(in houses)
#   foreign_key: :house_id  #(in humans)

# class House
# has_many :residents,
#   class_name: Human,
#   primary_key: :id,       #(in houses)
#   foreign_key: :house_id  #(in humans)
