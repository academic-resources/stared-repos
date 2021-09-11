class Bench < ApplicationRecord
  validates :description, :lat, :lng, presence: true

  def self.in_bounds(bounds)
    north = bounds['northEast']['lat'].to_f
    south = bounds['southWest']['lat'].to_f
    east = bounds['northEast']['lng'].to_f
    west = bounds['southWest']['lng'].to_f
    Bench.where(lat: south..north).where(lng: west..east)
  end
end

# google map bounds will be in the following format:
# { "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"}, "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"} }
# ... query logic goes here
