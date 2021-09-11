# == Schema Information
#
# Table name: albums
#
#  id         :bigint(8)        not null, primary key
#  band_id    :integer          not null
#  title      :string           not null
#  year       :integer          not null
#  performed  :string           default("Studio")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Album < ApplicationRecord
  validates :band_id, :title, :year, :performed, presence: true
  validates :performed, inclusion: { in: %w[Studio live],
    message: "must be 'Studio' or 'Live'" }

  belongs_to :band
end
