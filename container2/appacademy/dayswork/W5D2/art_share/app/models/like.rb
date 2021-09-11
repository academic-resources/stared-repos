# == Schema Information
#
# Table name: likes
#
#  id            :bigint(8)        not null, primary key
#  likeable_type :string
#  likeable_id   :bigint(8)
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Like < ApplicationRecord
  validates :likeable_type, presence: true

  def self.users_liking_artwork(artwork_id)
    Artwork.find(artwork_id).users_liking
  end

  def self.users_liking_comment(comment_id)
    Comment.find(comment_id).users_liking
  end

  def self.items_liked_by_user(user_id)
    liked_artworks = User.find(user_id).liked_artworks.to_a
    liked_comments = User.find(user_id).liked_comments.to_a
    liked_artworks += liked_comments
  end

  belongs_to :likeable,
    polymorphic: true

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User
end
