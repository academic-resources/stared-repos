# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  content     :string
#  user_id     :integer          not null
#  notebook_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  plain_text  :string
#

class Note < ApplicationRecord
  validates :title, :user_id, :notebook_id, presence: true
  validates :title, uniqueness: {
    scope: :notebook_id,
    message: "already belongs to a note in this notebook."
  }

  belongs_to :user
  belongs_to :notebook
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
end
