# == Schema Information
#
# Table name: board_stars
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardStar < ApplicationRecord
  belongs_to :user
  belongs_to :board
end
