# == Schema Information
#
# Table name: shares
#
#  id         :bigint           not null, primary key
#  board_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class Share < ApplicationRecord
  validates :board_id, uniqueness: { scope: [:user_id] }

  belongs_to :user
  belongs_to :board
end
