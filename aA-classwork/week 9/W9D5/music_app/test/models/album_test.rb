# == Schema Information
#
# Table name: albums
#
#  id           :bigint(8)        not null, primary key
#  band_id      :integer          not null
#  title        :string           not null
#  year         :integer
#  studio_album :boolean          default(TRUE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class AlbumTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
