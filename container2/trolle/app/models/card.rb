# == Schema Information
#
# Table name: cards
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :string
#  order       :integer          not null
#  list_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Card < ApplicationRecord
  validates :title, :order, presence: true

  belongs_to :list
end
