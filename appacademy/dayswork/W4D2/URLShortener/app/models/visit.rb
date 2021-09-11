# == Schema Information
#
# Table name: visits
#
#  id       :bigint(8)        not null, primary key
#  short_id :integer          not null
#  user_id  :integer          not null
#

class Visit < ApplicationRecord
  def self.record_visit!(user, shortened_url)
    Visit.create!(user_id: user.id, short_id: shortened_url)
  end

  belongs_to :user,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :User

  belongs_to :shortened_url,
    foreign_key: :short_id,
    primary_key: :id,
    class_name: :ShortenedUrl
end
