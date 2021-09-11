require "rails_helper"

RSpec.describe Api::UsersController, type: :controller do
  render_views

  describe "POST #create" do
    context "with invalid params" do
      it 'validates the presence of the user\'s name, username, email and password' do
        post :create, params: { user: { name: "",
                                        username: "",
                                        email: "",
                                        password: "a" } }, format: :json
        expect(JSON.parse(response.body).size).to eq(4)
      end
    end

    context "with valid params" do
      it "returns user creds" do
        post :create, params: { user: { name: "foo bar",
                                        username: "foobar100",
                                        email: "foo@example.com",
                                        password: "abcdef" } }, format: :json

        expect(JSON.parse(response.body)["email"]).to eq("foo@example.com")
      end

      it "logs in the user" do
        post :create, params: { user: { name: "",
                                        username: "",
                                        email: "",
                                        password: "a" } }, format: :json
        user = User.find_by_username("foobar100")

        expect(session[:session_token]).to eq(user.session_token)
      end

      #   it "redirects user to links index on success" do
      #     post :create, params: { user: { username: "jack_bruce", password: "password" } }
      #     expect(response).to redirect_to(links_url)
      #   end

      #   it "logs in the user" do
      #     post :create, params: { user: { username: "jack_bruce", password: "password" } }
      #     user = User.find_by_username("jack_bruce")

      #     expect(session[:session_token]).to eq(user.session_token)
      #   end
    end
  end
end
