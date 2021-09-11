class User < ApplicationRecord
  attr_reader :password

  after_initialize :ensure_session_token

  validates :name, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :name, uniqueness: true

  has_many :subs,
    class_name: :Sub,
    foreign_key: :moderator_id,
    primary_key: :id,
    inverse_of: :moderator

  has_many :posts, inverse_of: :author
  has_many :comments, inverse_of: :author
  has_many :user_votes, inverse_of: :user

  def self.find_by_credentials(name, password)
    user = User.find_by(name: name)
    user.try(:is_password?, password) ? user : nil
  end

  def self.generate_session_token
    begin
      token = SecureRandom::urlsafe_base64(16)
    end while User.exists?(session_token: token)

    token
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def password=(unencrypted_password)
    if unencrypted_password.present?
      @password = unencrypted_password
      self.password_digest = BCrypt::Password.create(unencrypted_password)
    end
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
