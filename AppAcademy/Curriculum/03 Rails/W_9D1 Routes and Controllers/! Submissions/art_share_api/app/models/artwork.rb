class Artwork < ApplicationRecord
  validates :title, :image_url, presence: true
  validates :image_url, uniqueness: true
  validates :title, presence: true, uniqueness: { scope: :artist_id,
    message: 'User cannot have two artworks with the same title' }

  has_many :artwork_shares,
    foreign_key: :artwork_id,
    class_name: :ArtworkShare

  has_many :shared_viewers,
    through: :artwork_shares,
    source: :viewer
end
