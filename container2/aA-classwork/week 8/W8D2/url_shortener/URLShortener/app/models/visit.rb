# == Schema Information
#
# Table name: visits
#
#  id           :bigint(8)        not null, primary key
#  short_url_id :integer          not null
#  visitor_id   :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Visit < ApplicationRecord
    validates :short_url_id, :visitor_id, presence: true

    def self.record_visit!(user, shortened_url)
        Visit.new(visitor_id: user.id, short_url_id: shortened_url.id)
    end

    belongs_to :short_url,
        primary_key: :id,
        foreign_key: :short_url_id,
        class_name: :ShortenedUrl

    belongs_to :visitor,
        primary_key: :id,
        foreign_key: :visitor_id,
        class_name: :User
end
