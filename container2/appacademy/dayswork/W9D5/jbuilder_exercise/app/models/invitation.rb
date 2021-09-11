# == Schema Information
#
# Table name: invitations
#
#  id         :bigint           not null, primary key
#  guest_id   :integer
#  party_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Invitation < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the presence validation of
  # party and guest out here.
  belongs_to :party
  belongs_to :guest
end
