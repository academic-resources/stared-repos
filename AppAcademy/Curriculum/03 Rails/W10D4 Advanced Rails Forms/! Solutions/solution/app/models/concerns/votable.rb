module Votable
  extend ActiveSupport::Concern

  included do
    has_many :user_votes,
      as: :votable,
      class_name: :UserVote,
      dependent: :destroy
  end

  def votes
    self.user_votes.sum(:value)
  end
end
