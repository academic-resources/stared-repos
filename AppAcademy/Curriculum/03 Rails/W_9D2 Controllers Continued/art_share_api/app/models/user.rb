# == Schema Information
#
# Table name: users
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true

  has_many :artworks,
    foreign_key: :artist_id,
    class_name: :Artwork,
    dependent: :destroy

  has_many :artwork_shares,
    foreign_key: :viewer_id,
    class_name: :ArtworkShare,
    dependent: :destroy

  has_many :shared_artworks,
    through: :artwork_shares,
    source: :artwork

  has_many :comments,
    foreign_key: :user_id,
    class_name: :Comment,
    dependent: :destroy

  has_many :likes,
    foreign_key: :user_id,
    class_name: :Like
  end
