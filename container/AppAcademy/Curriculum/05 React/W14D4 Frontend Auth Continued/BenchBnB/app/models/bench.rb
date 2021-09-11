class Bench < ApplicationRecord
  validates :description, :lat, :lng, presence: true
end
