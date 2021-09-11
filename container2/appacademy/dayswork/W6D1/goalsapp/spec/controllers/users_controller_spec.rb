require "rails_helper"

RSpec.describe UsersController, type: :controller do
  describe "GET #new" do
    it "should render the new template" do
      get :new
      expect(response).to render_template(:new)
    end
  end

  describe "POST #create" do
    let(:valid_params) { { user: { username: "somebody", password: "password " } } }
    let(:invalid_params) { { user: { username: "somebody" } } }
    context "with valid params" do
      it "should successfully create the user" do
        post :create, params: valid_params
        user = User.last
        expect(user.username).to eq("somebody")
      end
    end
    context "with invalid params" do
      it "should not create the user" do
        post :create, params: invalid_params
        user = User.find_by(username: "somebody")
        expect(user).to be_nil
      end
      it "should redirect to :new" do
        post :create, params: invalid_params
        expect(response).to render_template(:new)
      end
    end
  end

end
