# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
  validates :label, uniqueness: true, presence: true

  belongs_to :user

  has_many :taggings, dependent: :destroy

  has_many :notes, through: :taggings
end
