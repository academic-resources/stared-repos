class Book < ActiveRecord::Base
  validates :title, :author, presence: true
  validate :year_not_in_future

  def year_not_in_future
    errors[:year] << "cannot be in the future" unless year < 2016
  end

end
