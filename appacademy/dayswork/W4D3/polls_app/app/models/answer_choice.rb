# == Schema Information
#
# Table name: answer_choices
#
#  id          :bigint(8)        not null, primary key
#  text        :string
#  question_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class AnswerChoice < ApplicationRecord
  validates :text, presence: true

  belongs_to :question,
             foreign_key: :question_id,
             primary_key: :id,
             class_name: :Question

  has_many :responses,
           foreign_key: :answer_choice_id,
           primary_key: :id,
           class_name: :Response
end
