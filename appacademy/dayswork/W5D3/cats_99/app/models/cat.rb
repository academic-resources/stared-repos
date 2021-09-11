# == Schema Information
#
# Table name: cats
#
#  id          :bigint(8)        not null, primary key
#  birth_date  :date             not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Cat < ApplicationRecord

    COLORS = %w( stripes white orange black brown grey ).map(&:capitalize)

    include ActionView::Helpers::DateHelper

    validates :birth_date, :name, :sex, :color, presence: true
    validates :color, 
    inclusion: {in: COLORS ,
                    message: "#{:color} is not a valid color" }
    validates :sex,
    inclusion: {in: %w( M F )}

    def self.colors
        COLORS
    end

    def age
      time_ago_in_words(self.birth_date)
    end


  has_many :rental_requests,
    foreign_key: :cat_id,
    class_name: :CatRentalRequest,
    dependent: :destroy

end
