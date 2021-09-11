class Cheer < ApplicationRecord
  CHEER_LIMIT = 12
  ##
  # Don't let others change the limit!
  ##
  CHEER_LIMIT.freeze

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the presence validation of
  # giver and goal out here.
  validates :goal_id, uniqueness: { scope: :giver_id }

  belongs_to :giver, class_name: :User
  belongs_to :goal
end
