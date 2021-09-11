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

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'password encryption' do
    it 'does not save passwords to the database' do
      User.create!(username: 'jack_bruce', password: 'abcdef')
      user = User.find_by_username('jack_bruce')
      expect(user.password).not_to be('abcdef')
    end

    it 'encrypts the password using BCrypt' do
      expect(BCrypt::Password).to receive(:create)
      User.new(username: 'jack_bruce', password: 'abcdef')
    end
  end

  describe 'session token' do
    it 'assigns a session_token if one is not given' do
      jack = User.create(username: 'jack_bruce', password: 'abcdef')
      expect(jack.session_token).not_to be_nil
    end
  end

  it { should validate_length_of(:password).is_at_least(6) }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:password_digest) }
  it { should have_many(:links).class_name(:Link) }
  it { should have_many(:comments).class_name(:Comment) }
end
