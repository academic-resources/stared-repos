class AnswerChoice < ApplicationRecord
  validates :text, presence: true

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the validation of :question out here.

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  belongs_to :question,
    primary_key: :id,
    foreign_key: :question_id,
    class_name: 'Question'

  has_many :responses,
    primary_key: :id,
    foreign_key: :answer_choice_id,
    class_name: 'Response'
end
