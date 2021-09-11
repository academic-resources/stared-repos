# == Schema Information
#
# Table name: guests
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  age            :integer          not null
#  favorite_color :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Guest < ApplicationRecord
  validates :name, :age, :favorite_color, presence: true

  has_many :gifts
  has_many :invitations
  
  has_many :parties,
    through: :invitations,
    source: :party
end
