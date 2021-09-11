class Toy < ActiveRecord::Base
  TYPES = [
    "string",
    "yarnball",
    "mouse"
  ]

  validates :cat, :name, :ttype, presence: true
  validates :ttype, inclusion: TYPES

  belongs_to :cat
end
