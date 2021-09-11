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

require 'rails_helper'

RSpec.describe BoardView, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
