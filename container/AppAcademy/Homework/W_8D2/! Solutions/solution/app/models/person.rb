class Person < ApplicationRecord
  validates :name, :house, presence: true

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  belongs_to :house,
    primary_key: :id,
    foreign_key: :house_id,
    class_name: :House
end
