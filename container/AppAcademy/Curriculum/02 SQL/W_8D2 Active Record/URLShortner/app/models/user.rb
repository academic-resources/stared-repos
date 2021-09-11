# == Schema Information
#
# Table name: users
#
#  id         :bigint(8)        not null, primary key
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class User < ApplicationRecord
  
  #validations
  validates :email, presence: true, uniqueness: true

  #associations
  has_many :submitted_urls,
    primary_key: :id,
    foreign_key: :submitted_id,
    class_name: :ShortenedUrl

  has_many :visits,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Visit
  
  has_many :visited_urls,
    through: :visits,
    source: :shortened_urls

end
