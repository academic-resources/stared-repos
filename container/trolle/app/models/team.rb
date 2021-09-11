# == Schema Information
#
# Table name: teams
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string
#

class Team < ApplicationRecord
  validates :title, presence: true

  belongs_to :owner, class_name: "User", foreign_key: :user_id

  has_many :team_memberships
  has_many :members, through: :team_memberships, source: :user

  has_many :shares, through: :members, source: :shares

  has_many :boards
end
