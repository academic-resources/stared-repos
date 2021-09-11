# == Schema Information
#
# Table name: albums
#
#  id      :bigint(8)        not null, primary key
#  band_id :integer          not null
#  title   :string           not null
#  year    :integer          not null
#  live    :boolean          default(FALSE), not null
#

class Album < ApplicationRecord
  validates :title, :year, presence: true
  validates :live, inclusion: [true, false]

  belongs_to :band,
             foreign_key: :band_id,
             class_name: :Band
end
