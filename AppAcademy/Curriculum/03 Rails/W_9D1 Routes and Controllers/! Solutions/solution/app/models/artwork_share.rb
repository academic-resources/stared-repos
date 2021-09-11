class ArtworkShare < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the validation of artwork
  # and viewer out here.
  validates :artwork_id, uniqueness: { scope: :viewer_id }

  belongs_to :artwork
  belongs_to :viewer, class_name: 'User'
end
