# == Schema Information
#
# Table name: collection_items
#
#  id            :bigint(8)        not null, primary key
#  collection_id :integer          not null
#  artwork_id    :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class CollectionItem < ApplicationRecord
  belongs_to :collection,
             foreign_key: :collection_id,
             class_name: :Collection

  belongs_to :artwork,
             foreign_key: :artwork_id,
             class_name: :Artwork

  def self.items_in_collection(collection_id)
    collection = Collection.find(collection_id)
    collection.artworks
  end
end
