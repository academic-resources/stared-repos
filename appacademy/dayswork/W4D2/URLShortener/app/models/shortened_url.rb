# == Schema Information
#
# Table name: shortened_urls
#
#  id        :bigint(8)        not null, primary key
#  long_url  :string           not null
#  short_url :string           not null
#  user_id   :integer          not null
#

class ShortenedUrl < ApplicationRecord
  validates :short_url, presence: true, uniqueness: true
  validates :long_url, presence: true, uniqueness: true

  belongs_to :submitter,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :visits,
           primary_key: :id,
           foreign_key: :short_id,
           class_name: :Visit

  has_many :visitors,
    -> { distinct },
    through: :visits,
    source: :user

  def self.create_shortened(user, long_url)
    ShortenedUrl.create!(user_id: user.id,
                         short_url: ShortenedUrl.random_code,
                         long_url: long_url)
  end

  def self.random_code
    while true
      temp = SecureRandom.urlsafe_base64
      dupe = ShortenedUrl.exists?(short_url: temp)
      if !dupe
        return temp
      end
    end
  end

  def num_clicks
    self.visits.count
  end

  def num_uniques
    self.visitors.count
  end

  def num_recent_uniques
    self.visits.select(:user_id)
      .where("created_at <= '#{10.minutes.ago}'")
      .distinct
      .count
  end
end
