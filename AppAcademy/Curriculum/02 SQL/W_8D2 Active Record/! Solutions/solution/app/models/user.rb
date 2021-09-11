# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  email      :string           not null
#  premium    :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  validates :email, uniqueness: true, presence: true

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  # TA: I'm being explicit about foreign_/primary_ keys and class_name
  has_many :submitted_urls,
    class_name: :ShortenedUrl,
    foreign_key: :submitter_id,
    primary_key: :id

  has_many :visits,
    class_name: :Visit,
    foreign_key: :user_id,
    primary_key: :id

  # TA: This will repeat the same Shortened URL if it is visited multiple times.
  # To de-duplicate the results, uncomment the lambda below.
  has_many :visited_urls,
    # -> { distinct },
    through: :visits,
    source: :shortened_url
end
