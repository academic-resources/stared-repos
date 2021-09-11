# == Schema Information
#
# Table name: questions
#
#  id         :bigint(8)        not null, primary key
#  text       :string
#  poll_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord
  validates :text, presence: true

  has_many :answer_choices,
           foreign_key: :question_id,
           primary_key: :id,
           class_name: :AnswerChoice

  belongs_to :poll,
             foreign_key: :poll_id,
             primary_key: :id,
             class_name: :Poll

  has_many :responses,
           through: :answer_choices,
           source: :responses

  def results
    results = {}
    ac = self.answer_choices
      .includes(:responses)
    ac.each { |c| results[c.text] = c.question_id }
    results
  end
end
