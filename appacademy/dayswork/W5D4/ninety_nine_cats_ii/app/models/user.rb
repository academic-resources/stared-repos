# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  user_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  attr_reader :password

  validates :user_name, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 7 }, allow_nil: true

  after_initialize :ensure_session_token

  has_many :cats,
           foreign_key: :user_id,
           class_name: :Cat

  has_many :requests,
           foreign_key: :user_id,
           class_name: :CatRentalRequest

  def self.find_by_credentials(username, password)
    user = User.find_by(user_name: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.base64(10)
  end

  def ensure_session_token
    self.session_token ||= self.reset_session_token!
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end
