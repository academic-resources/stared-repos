require "rails_helper"

RSpec.describe Api::SessionsController, type: :controller do
  render_views

  let!(:user) {
    User.create({ name: "foo bar",
                  username: "foobar100",
                  email: "foo@example.com",
                  password: "abcdef" })
  }

  describe "POST #create" do
    context "with invalid credentials" do
      it "returns error message" do
        post :create, params: { user: { email: "bar@example.com", password: "abcdef" } }, format: :json
        expect(JSON.parse(response.body)[0]).to include("Invalid")
      end

      it "returns status code 401" do
        post :create, params: { user: { email: "bar@example.com", password: "abcdef" } }, format: :json
        expect(response).to have_http_status(401)
      end
    end

    context "with valid credentials" do
      it "returns user creds" do
        post :create, params: { user: { email: "foo@example.com", password: "abcdef" } }, format: :json
        expect(JSON.parse(response.body)["email"]).to eq("foo@example.com")
      end

      it "logs in the user" do
        post :create, params: { user: { email: "foo@example.com", password: "abcdef" } }, format: :json
        user = User.find_by_username("foobar100")

        expect(session[:session_token]).to eq(user.session_token)
      end
    end

    describe "DELETE #destroy" do
      before(:each) do
        post :create, params: { user: { email: "foo@example.com", password: "abcdef" } }, format: :json
        @session_token = User.find_by_username("foobar100").session_token
      end

      it "logs out the current user" do
        delete :destroy, format: :json
        expect(session[:session_token]).to be_nil

        jack = User.find_by_username("foobar100")
        expect(jack.session_token).not_to eq(@session_token)
      end
    end
  end
end
