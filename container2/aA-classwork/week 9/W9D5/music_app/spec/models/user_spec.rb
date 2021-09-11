require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"

  subject(:user) {User.new(email: "blah", password: "pasta1")}

  describe "validations" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe "#is_password?" do
    it "checks to see if password is equal to password_digest" do
       expect(user.is_password?("pasta1")).to eq true   
    end
  end

  describe "#reset_session_token!" do
    it "successfully resets users session token" do
      session_token = user.session_token
      user.reset_session_token!
      expect(user.session_token).to_not eq(session_token)
    end
  end

  describe "::find_by_credentials" do
    it "checks for correct password based on given email" do
      user1 = User.create(email: "yoyo", password: "lasagna")
      expect(User.find_by_credentials("yoyo", "lasagna")).to eq(user1)
    end
  end
end
