# == Schema Information
#
# Table name: polls
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  author_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poll < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  belongs_to :author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: :User

  has_many :questions,
    foreign_key: :poll_id,
    primary_key: :id,
    class_name: :Question
end
