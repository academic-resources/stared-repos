class Like < ApplicationRecord
  validates :user_id, :likeable_id, :likeable_type, presence: true
  validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type]}

  belongs_to :likeable, polymorphic: true
  belongs_to :user
end
