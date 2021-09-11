# == Schema Information
#
# Table name: visits
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  url_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class Visit < ApplicationRecord

  def self.record_visit!(user, shortened_url)
    create!(user_id: user.id, url_id: shortened_url.id)
  end

  # Validations
  validates :user_id, :url_id, presence: true

  belongs_to :users,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :shortened_urls,
    primary_key: :id,
    foreign_key: :url_id,
    class_name: :ShortenedUrl
end
