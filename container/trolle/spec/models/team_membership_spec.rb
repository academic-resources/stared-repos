# == Schema Information
#
# Table name: team_memberships
#
#  id         :bigint           not null, primary key
#  team_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe TeamMembership, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
