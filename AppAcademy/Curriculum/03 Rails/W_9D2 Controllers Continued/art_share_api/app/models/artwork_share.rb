class ArtworkShare < ApplicationRecord
  validates :viewer, :artwork, presence: true
  validates :artwork_id, uniqueness: { scope: :viewer_id,
    message: 'User cannot have artwork shared with more than once' }

  belongs_to :viewer,
    foreign_key: :viewer_id,
    class_name: :User

  belongs_to :artwork,
    foreign_key: :artwork_id,
    class_name: :Artwork
end
