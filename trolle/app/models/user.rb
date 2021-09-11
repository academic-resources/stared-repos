# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  username        :string           not null
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  attr_reader :password

  after_initialize :ensure_session_token

  validates :name, :username, :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :username, :email, uniqueness: true

  has_many :teams_owned,
           class_name: "Team",
           foreign_key: :user_id

  has_many :owned_boards,
           class_name: "Board",
           foreign_key: :user_id

  has_many :shares
  has_many :boards,
           through: :shares,
           source: :board

  has_many :team_memberships
  has_many :teams, through: :team_memberships, source: :team

  has_many :board_views, -> { order(created_at: :desc) }

  has_many :recently_viewed_boards,
           through: :board_views,
           source: :board

  has_many :board_stars

  has_many :starred_boards,
           through: :board_stars,
           source: :board

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user.try(:is_password?, password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    if password.present?
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end
end
