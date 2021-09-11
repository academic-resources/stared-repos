class Poll < ApplicationRecord
  validates :title, presence: true

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the validation of :author out here.

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'User'

  has_many :questions,
    primary_key: :id,
    foreign_key: :poll_id,
    class_name: 'Question'
end
