# == Schema Information
#
# Table name: gifts
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :string           not null
#  guest_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Gift < ApplicationRecord
  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the presence validation of
  # guest out here.
  validates :description, :title, presence: true

  belongs_to :guest
end
