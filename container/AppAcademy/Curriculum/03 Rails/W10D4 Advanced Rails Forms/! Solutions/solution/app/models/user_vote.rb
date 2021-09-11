class UserVote < ApplicationRecord
  # don't let the user vote twice!
  validates :user_id, uniqueness: { scope: [:votable_id, :votable_type] }

  belongs_to :votable, polymorphic: true
  belongs_to :user, inverse_of: :user_votes
end
