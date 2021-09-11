require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  subject(:user) { User.new(email: 'music_user', password: 'music!') }

  # validations
  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe 'email/session_token uniqueness' do
    before(:each) { create(:user) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_uniqueness_of(:session_token) }
  end

  describe '#is_password?' do
    # it 'should call the password_digest of a user' do
    #   user = User.create(email: 'music_user', password: 'music!')
    #   expect(user).to receive(:password_digest)
    #   user.is_password?('music')
    # end
    it 'should check if a correct password matches' do
      expect(user.is_password?('music!')).to be(true)
    end

    it 'should check if an incorrect password fails' do
      expect(user.is_password?('musak!')).to be(false)
    end
  end

  describe '#reset_session_token!' do
    it 'should generate a new session token' do
      expect(user.session_token).to_not eq(user.reset_session_token!)
    end

    it 'should save to the database!' do
      expect(user.reset_session_token!).to eq(user.session_token)
    end
  end

  describe '::find_by_credentials' do
    it 'should find a user by email and password' do
      user = User.create(email: 'music_user', password: 'music!')
      expect(User.find_by_credentials('music_user', 'music!')).to eq(user)
    end
    # it 'should call #is_password' do
    #   expect(User.find_by_credentials).to receive(:is_password?)
    # end
    it 'should return nil if no user is found' do
      expect(User.find_by_credentials('music_user', 'music!')).to eq(nil)
    end
  end
end
