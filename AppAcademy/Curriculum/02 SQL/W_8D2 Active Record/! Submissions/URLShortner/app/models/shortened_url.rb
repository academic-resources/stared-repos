# == Schema Information
#
# Table name: shortened_urls
#
#  id           :bigint(8)        not null, primary key
#  long_url     :string           not null
#  short_url    :string           not null
#  submitted_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class ShortenedUrl < ApplicationRecord
  def self.random_code
    random_64 = SecureRandom.urlsafe_base64
    
    while exists?(short_url: random_64)
      random_64 = SecureRandom.urlsafe_base64
    end
    
    random_64
  end
  
  def self.submit(user, long_url_string)
    create!(long_url: long_url_string, short_url: random_code, submitted_id: user.id)
  end
  
  # validations
  validates :long_url, presence: true, uniqueness: true
  validates :short_url, :submitted_id, presence: true

  # associations
  belongs_to :submitter,
    primary_key: :id,
    foreign_key: :submitted_id,
    class_name: :User

  has_many :visits,
    primary_key: :id,
    foreign_key: :url_id,
    class_name: :Visit

  has_many :visitors,
    Proc.new { distinct },
    through: :visits,
    source: :users

  def num_clicks
    self.visits.count
  end

  def num_uniques
    self.visitors.count
  end

  def num_recent_uniques
    time_frame = 10.minutes.ago
    self.visits.where(created_at: time_frame..Time.now ).length
  end
  
end