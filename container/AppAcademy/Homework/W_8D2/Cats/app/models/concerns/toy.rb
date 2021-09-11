
class Toy < ActiveRecord::Base
  belongs_to :cat,
    primary_key: :id,
    foreign_key: :cat_id,
    class_name: 'Cat'

  has_one :house,
    through: :cat,
    source: :house

  # Active Record will do something like this:
  # def house
  #   <<-SQL
  #   SELECT *
  #   FROM cats
  #   JOIN houses
  #   ON cats.house_id = houses.id
  #   WHERE id = #{self.cat_id}
  #   SQL
  #   .first
  # end
end
