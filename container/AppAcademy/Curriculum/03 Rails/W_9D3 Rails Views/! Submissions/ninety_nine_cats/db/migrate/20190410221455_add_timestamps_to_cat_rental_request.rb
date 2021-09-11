class AddTimestampsToCatRentalRequest < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :cat_rental_requests
  end
end
