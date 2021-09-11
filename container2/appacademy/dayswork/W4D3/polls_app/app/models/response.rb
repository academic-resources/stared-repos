# == Schema Information
#
# Table name: responses
#
#  id               :bigint(8)        not null, primary key
#  answer_choice_id :integer
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Response < ApplicationRecord
  belongs_to :answer_choice,
             foreign_key: :answer_choice_id,
             primary_key: :id,
             class_name: :AnswerChoice

  belongs_to :respondent,
             foreign_key: :user_id,
             primary_key: :id,
             class_name: :User

  has_one :question,
          through: :answer_choice,
          source: :question

  def sibling_responses
    self.question.responses.where.not("responses.id = #{self.id}")
  end

  def respondent_already_answered?
    self.sibling_responses.exists?(user_id: self.user_id)
    #['user_id = ?', self.user_id]
  end

  def is_author_of_poll?
    question.poll.author_id == self.user_id
  end
end
