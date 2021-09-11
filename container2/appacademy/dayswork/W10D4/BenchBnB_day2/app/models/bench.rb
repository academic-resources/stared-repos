# == Schema Information
#
# Table name: benches
#
#  id          :bigint           not null, primary key
#  description :string           not null
#  lat         :float            not null
#  lng         :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Bench < ApplicationRecord
  validates :description, :lat, :lng, presence: true

  def self.in_bounds(bounds)
    west_boundary = bounds.southWest.lng
    east_boundary = bounds.northEast.lng
    north_boundary = bounds.northEast.lat
    south_boundary = bounds.southWest.lat
    Bench.where("lat >= #{south_boundary}")
      .where("lat <= #{north_boundary}")
      .where("lng <= #{east_boundary}")
      .where("lng >= #{west_boundary}")
  end
end
