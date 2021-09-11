require "rails_helper"

RSpec.describe User, type: :model do
  describe("User validations") do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password) }
  end

  describe("User #is_password?") do
    context("with invalid password") do
      it("it returns false for an invalid password") do
        user = User.new(email: "foo1", password: "123456")
        user.save!
        result = user.is_password?("wrong")
        expect(result).to be(false)
      end
    end

    context("with valid password") do
      it("it returns true for a valid password") do
        user = User.new(email: "foo2", password: "123456")
        user.save!
        result = user.is_password?("123456")
        expect(result).to be(true)
      end
    end
  end

  describe("User #reset_session_token") do
    it("it resets the users session token") do
      user = User.new(email: "foo1", password: "123456")
      user.save!
      old_session = user.session_token
      user.reset_session_token!
      expect(user.session_token).not_to eq(old_session)
    end
  end

  describe("User ::find_by_credentials") do
    it("it finds a valid user by username") do
      user = User.new(email: "foo1", password: "123456")
      user.save!
      found_user = User.find_by_credentials("foo1", "123456")
      expect(found_user.id).to eq(user.id)
    end
    it("it returns nil for invalid password") do
      user = User.new(email: "foo1", password: "123456")
      user.save!
      found_user = User.find_by_credentials("foo1", "wrong")
      expect(found_user).to eq(nil)
    end
  end
end
