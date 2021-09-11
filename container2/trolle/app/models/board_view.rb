# == Schema Information
#
# Table name: board_views
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardView < ApplicationRecord
  belongs_to :user
  belongs_to :board
end
