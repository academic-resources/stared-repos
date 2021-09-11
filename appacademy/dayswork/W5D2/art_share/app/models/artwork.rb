# == Schema Information
#
# Table name: artworks
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  image_url  :string           not null
#  artist_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Artwork < ApplicationRecord
  validates :title, presence: true, uniqueness: { scope: :artist_id }
  validates :image_url, presence: true

  def self.artworks_related_to_user(user_id)
    Artwork.joins(:shares).where("artworks.artist_id = ? OR artwork_shares.viewer_id = ?", user_id, user_id)
  end

  def self.artworks_related_to_collection(collection_id)
    Collection.find(:collection_id).artworks
  end

  belongs_to :artist,
             foreign_key: :artist_id,
             class_name: "User"

  has_many :shares,
           dependent: :destroy,
           foreign_key: :artwork_id,
           class_name: :ArtworkShare

  has_many :shared_viewers,
           through: :shares,
           source: :viewer

  has_many :comments,
           foreign_key: :artwork_id,
           class_name: :Comment,
           dependent: :destroy

  has_many :likes,
           as: :likeable

  has_many :users_liking,
           through: :likes,
           source: :user

  has_many :collection_items,
    foreign_key: :artwork_id,
    class_name: :CollectionItem

  has_many :collections,
    through: :collection_items,
    source: :collection
end

# class Shirt < ActiveRecord::Base
#   scope :red, -> { where(color: 'red') }
#   scope :dry_clean_only, -> { joins(:washing_instructions).where('washing_instructions.dry_clean_only = ?', true) }
# end

# class Shirt < ActiveRecord::Base
#   def self.red
#     where(color: 'red')
#   end
# end
