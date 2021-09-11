# == Schema Information
#
# Table name: shortened_urls
#
#  id         :bigint(8)        not null, primary key
#  long_url   :string           not null
#  short_url  :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'securerandom'

class ShortenedUrl < ApplicationRecord
    validates :long_url, :short_url, presence: true
    validates :short_url, uniqueness: true
    
    include SecureRandom

    def self.random_code
        short_url = SecureRandom.urlsafe_base64
        while ShortenedUrl.exists?(:short_url => short_url)
            short_url = SecureRandom.urlsafe_base64
        end
        short_url
    end

    def self.make_url(user, long_url)
        ShortenedUrl.new( long_url: long_url, short_url: ShortenedUrl.random_code, user_id: user.id )
    end

    def num_clicks
        visits.count
    end

    def num_uniques
        visitors.select(:visitor_id).count
    end

    def num_recent_uniques
        visitors.select(:visitor_id).where('visits.created_at > :ten_minutes_ago', ten_minutes_ago: 10.minutes.ago).count
    end

    belongs_to :submitter,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
 
    has_many :visits,
        primary_key: :id,
        foreign_key: :short_url_id,
        class_name: :Visit

    has_many :visitors,
        -> { distinct },
        through: :visits,
        source: :visitor
end
