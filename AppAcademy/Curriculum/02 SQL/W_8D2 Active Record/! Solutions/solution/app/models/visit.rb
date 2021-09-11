# == Schema Information
#
# Table name: visits
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  shortened_url_id :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Visit < ApplicationRecord
  validates :visitor, :shortened_url, presence: true

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.

  # This is short hand syntax. Since the primary key, foreign key, and
  # class name all follow convention, Rails can guess their values
  # without you having to explicitly state them.
  belongs_to :shortened_url

  belongs_to :visitor,
    class_name: :User,
    foreign_key: :user_id,
    primary_key: :id

  def self.record_visit!(user, shortened_url)
    Visit.create!(user_id: user.id, shortened_url_id: shortened_url.id)
  end
end
