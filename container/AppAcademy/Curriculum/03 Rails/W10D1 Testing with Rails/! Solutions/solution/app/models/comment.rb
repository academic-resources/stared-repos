class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :commentable, polymorphic: true
end
