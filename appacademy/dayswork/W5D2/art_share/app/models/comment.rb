# == Schema Information
#
# Table name: comments
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  artwork_id :integer          not null
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  belongs_to :artwork,
             foreign_key: :artwork_id,
             class_name: :Artwork

  has_many :likes,
           as: :likeable

  has_many :users_liking,
           through: :likes,
           source: :user

  def self.comments_for_user_or_artwork(params)
    if params[:user_id]
      Comment.where(user_id: params[:user_id])
    else
      Comment.where(artwork_id: params[:artwork_id])
    end
  end
end
