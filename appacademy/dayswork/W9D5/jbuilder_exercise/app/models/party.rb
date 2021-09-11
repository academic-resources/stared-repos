# == Schema Information
#
# Table name: parties
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  location   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Party < ApplicationRecord
  validates :name, :location, presence: true

  has_many :invitations
  
  has_many :guests,
    through: :invitations,
    source: :guest
end
