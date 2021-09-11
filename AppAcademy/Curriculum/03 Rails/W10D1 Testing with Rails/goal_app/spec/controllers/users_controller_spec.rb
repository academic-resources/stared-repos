require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #new' do
    it 'renders the new template' do
      get :new
      expect(response).to render_template(:new)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      before(:each) do
        post :create, params: { user: { username: 'Stickman', password: 'marvel' } }
      end

      it 'should create a user' do
        expect(User.find_by_credentials('Stickman', 'marvel')).to be_present
      end
      it 'should render show' do
        expect(response).to render_template(:show)
      end
    end

    context 'with invalid params' do
      before(:each) do
        post :create, params: { user: { username: 'Stickman', password: 'dc' } }
      end

      it 'should generate errors' do
        expect(flash[:errors]).to be_present
      end

      it 'should redirect to new' do
        expect(response).to redirect_to(new_user_url)
      end
    end
  end
end
