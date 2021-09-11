# == Schema Information
#
# Table name: cats
#
#  id          :bigint(8)        not null, primary key
#  birth_date  :date             not null
#  color       :string
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Cat < ApplicationRecord
  include ActionView::Helpers::DateHelper

  validates :birth_date, :name, :sex, :color, :description, presence: true
  validates :color, inclusion: { in: %w(calico white brown persian-blue orange black),
                                 message: "%{value} is not a valid color" }
  validates :sex, inclusion: { in: %w(M F), message: "%{value} is not a valid sex" }
  validate :valid_birth_date?

  def valid_birth_date?
    if self.birth_date > Time.now.to_date
      errors[:birth_date] << "must be in the past"
    end
  end

  has_many :cat_rental_requests,
    dependent: :destroy
end
