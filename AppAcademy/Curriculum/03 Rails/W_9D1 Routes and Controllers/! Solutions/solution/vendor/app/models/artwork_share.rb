class ArtworkShare < ApplicationRecord
  validates :artwork, :viewer, presence: true
  validates :artwork_id, uniqueness: { scope: :viewer_id }

  belongs_to :artwork
  belongs_to :viewer, class_name: "User"
end
