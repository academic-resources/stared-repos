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

require 'rails_helper'

RSpec.describe Share, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
