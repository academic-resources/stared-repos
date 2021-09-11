# == Schema Information
#
# Table name: boards
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  image      :string           not null
#  visibility :string           default("private")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  team_id    :integer
#  personal   :boolean          default(TRUE)
#

class Board < ApplicationRecord
  attr_accessor :members

  validates :title, :image, :visibility, presence: true

  belongs_to :owner, class_name: "User", foreign_key: :user_id
  has_many :shares

  has_many :indv_members,
           through: :shares,
           source: :user

  belongs_to :team,
             optional: true

  has_many :members_via_team,
           through: :team,
           source: :members

  has_many :lists

  has_many :cards,
           through: :lists,
           source: :cards

  def members
    output = []
    output << self.owner
    self.indv_members.each do |m|
      output << m unless output.include?(m)
    end
    self.members_via_team.each do |m|
      output << m unless output.include?(m)
    end
    output
  end
end
