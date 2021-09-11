# == Schema Information
#
# Table name: notebooks
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notebook < ApplicationRecord
  validates :title, :user_id, presence: true
  validates :title, uniqueness: {
    scope: :user_id,
    message: "already belongs to one of your notebooks."
  }

  belongs_to :user

  has_many :notes, dependent: :destroy

end
