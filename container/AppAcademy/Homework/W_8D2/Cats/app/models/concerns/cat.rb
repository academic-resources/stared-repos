
class Cat < ActiveRecord::Base

  # Validations
  validates :name, presence: true#, uniqueness: true
  # could've put in previous validates, but would check for uniqueness
  validates :color, presence: true

  # Maybe you need sophisticated/custom validation logic
  validate :no_green_cats
  def no_green_cats
    if self.color == "green"
      # to fail the validation, need to change the errors object
      self.errors[:color] << "can't be green"
    end
  end

  def self.how_long_to_find_sarahs_in_ms
    start = Time.now
    Cat.where(name: 'Sarah').to_a
    (Time.now - start) * 1000
  end

  # Macro
  belongs_to :house, {
    primary_key: :id,
    foreign_key: :house_id,
    class_name: 'House',
    optional: true
  }
  
  # Without Macro
  # def house
  #   House.find(self.house_id)jeff
  # end

  has_many :toys,
    primary_key: :id,
    foreign_key: :cat_id,
    class_name: 'Toy'
end