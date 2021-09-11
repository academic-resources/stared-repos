# == Schema Information
#
# Table name: collections
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Collection < ApplicationRecord
  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  has_many :collection_items,
           foreign_key: :collection_id,
           class_name: :CollectionItem,
           dependent: :destroy

  has_many :artworks,
           through: :collection_items,
           source: :artwork

  def self.collections_for_user(user_id)
    user = User.find(user_id)
    user.collections
  end
end
