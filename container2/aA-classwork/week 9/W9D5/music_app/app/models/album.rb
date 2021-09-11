# == Schema Information
#
# Table name: albums
#
#  id           :bigint(8)        not null, primary key
#  band_id      :integer          not null
#  title        :string           not null
#  year         :integer
#  studio_album :boolean          default(TRUE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Album < ApplicationRecord
    validates :title, presence: true

    belongs_to :band

    has_many :tracks, foreign_key: :album_id, class_name: :Track
end
