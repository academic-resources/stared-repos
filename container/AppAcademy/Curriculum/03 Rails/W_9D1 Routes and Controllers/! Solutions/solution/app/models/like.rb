class Like < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the presence validation of
  # likeable and user out here.
  validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type] }

  belongs_to :likeable, polymorphic: true
  belongs_to :user
end
