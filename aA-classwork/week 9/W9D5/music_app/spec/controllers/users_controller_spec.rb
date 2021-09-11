require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    describe "GET #new" do
        it "renders the new template" do
        get :new, {}
        expect(response).to render_template("new")
        end
    end

    describe "POST #create" do
        context "with invalid params" do
            it "validates the presence of the user's email and password" do
                post :create, params: { user: {email: "ijsidj"}}
                expect(response).to render_template(:new)
                expect(flash[:errors]).to be_present
            end

            it "validates that the password is at least 6 characters long" do
                post :create, params: { user: {email: "ijsidj", password: "blah"}}
                expect(response).to render_template(:new)
                expect(flash[:errors]).to be_present
            end
        end

        context "with valid params" do
            it "redirects user to bands index on success" do
                post :create, params: { user: {email: "sijfijs", password:"sidjisjdi"}}
                expect(response).to redirect_to(bands_url)
            end
        end
    end
end
