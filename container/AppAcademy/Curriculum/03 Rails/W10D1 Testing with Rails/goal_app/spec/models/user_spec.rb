# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  subject(:user) { create :user }
  # validate presence and uniqueness
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_presence_of(:session_token) }

  describe 'username and session_token uniqueness' do
    before(:each) { create :user }

    it { should validate_uniqueness_of(:username) }
    it { should validate_uniqueness_of(:session_token) }
  end

  describe 'password must have minimum length: 6' do
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe '::find_by_credentials' do
    context 'with valid params' do
      it 'should return user' do
        expect(User.find_by_credentials(user.username, 'marvel')).to eq(user)
      end
    end
    context 'with invalid params' do
      it 'should return nil' do
        expect(User.find_by_credentials(user.username, 'dc')).to be nil
      end
    end
  end

  describe '::generation_session_token' do
    it 'should generate a unique session token' do
      first_token = User.generate_session_token
      expect(User.generate_session_token).to_not eq(first_token)
    end
  end

  describe '#reset_session_token!' do
    it 'should create a new session token for user' do
      original_token = user.session_token
      expect(user.reset_session_token!).to_not eq(original_token)
    end
  end
end
