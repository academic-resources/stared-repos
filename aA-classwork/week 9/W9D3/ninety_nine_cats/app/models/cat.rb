# == Schema Information
#
# Table name: cats
#
#  id          :bigint(8)        not null, primary key
#  birth_date  :date             not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Cat < ApplicationRecord
    include ActionView::Helpers::DateHelper
    CAT_COLORS = %w(black white tabby orange brown yellow blue gray striped spotted)

    validates :birth_date, :color, :name, :sex, presence: true
    validates :sex, inclusion: {in: %w(M F)}
    validates :color, inclusion: {in: CAT_COLORS}

    def age
        time_ago_in_words(birth_date)
    end

    has_many :
end
