class Comment < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the validation of author
  # and artwork out here.
  validates :body, presence: true

  belongs_to :author, foreign_key: :user_id, class_name: 'User'
  belongs_to :artwork, foreign_key: :artwork_id, class_name: 'Artwork'
  has_many :likes, as: :likeable
end
