# == Schema Information
#
# Table name: toys
#
#  id           :bigint(8)        not null, primary key
#  name         :string           not null
#  toyable_id   :bigint(8)
#  toyable_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class ToyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
