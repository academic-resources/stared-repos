
class House < ActiveRecord::Base
  has_many :cats, {
    primary_key: :id,
    foreign_key: :house_id,
    class_name: 'Cat'
  }
  # Without Macro
  # def cats
  #   Cat.where(house_id: self.id)
  # end

  has_many :toys,
    through: :cats, #name of association IN THIS CLASS
    source: :toys

  # Without Macro
  # def toys
  #   toys = []
  #   self.cats.each do |cat|
  #     toys += cat.toys
  #   end
  #   toys
  # end
end