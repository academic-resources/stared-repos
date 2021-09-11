# == Schema Information
#
# Table name: bands
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Band < ApplicationRecord
    validates :name, presence: true

    has_many :albums, foreign_key: :band_id, class_name: :Album
end
