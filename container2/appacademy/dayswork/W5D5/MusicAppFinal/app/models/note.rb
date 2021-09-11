class Note < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the validation of user and
  # track out here.
  validates :content, presence: true

  belongs_to :user
  belongs_to :track
end
