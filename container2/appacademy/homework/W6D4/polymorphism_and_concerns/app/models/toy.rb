# == Schema Information
#
# Table name: toys
#
#  id           :bigint(8)        not null, primary key
#  name         :string           not null
#  toyable_type :string
#  toyable_id   :bigint(8)
#

class Toy < ApplicationRecord
  validates :name, uniqueness: { scope: [:toyable] }
  belongs_to :toyable, polymorphic: true
end
