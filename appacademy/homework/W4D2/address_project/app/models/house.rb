class House < ApplicationRecord
  validates :address, presence: true, uniqueness: true
  has_many :residents,
           class_name: :Person,
           primary_key: :id,
           foreign_key: :house_id
end
