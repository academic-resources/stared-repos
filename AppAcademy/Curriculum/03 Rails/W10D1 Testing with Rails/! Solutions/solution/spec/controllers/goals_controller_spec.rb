require 'rails_helper'

RSpec.describe GoalsController, type: :controller do
  let(:jack) { User.create!(username: 'jack_bruce', password: 'abcdef') }

  before(:each) do
    allow_message_expectations_on_nil
  end

  describe 'GET #new' do
    context 'when logged in' do
      before do
        allow(controller).to receive(:current_user) { jack }
      end

      it 'renders the new Goals page' do
        get :new
        expect(response).to render_template('new')
      end
    end

    context 'when logged out' do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it 'redirects to the login page' do
        get :new
        expect(response).to redirect_to(new_user_url)
      end
    end
  end

  describe 'POST #create' do
    let(:jack_bruce) { User.create!(username: 'jack_bruce', password: 'abcdef') }

    context 'when logged out' do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it 'redirects to the login page' do
        post :create, params: { goal: {} }
        expect(response).to redirect_to(new_user_url)
      end
    end

    context 'when logged in' do
      before do
        allow(controller).to receive(:current_user) { jack_bruce }
      end

      context 'with invalid params' do
        it 'validates the presence of title and url' do
          post :create, params: { goal: { title: 'invld' } }
          expect(response).to render_template('new')
          expect(flash[:errors]).to be_present
        end
      end

      context 'with valid params' do
        it 'redirects to the goal show page' do
          post :create, params: { goal: { title: 'teehee', details: 'cats.com' } }
          expect(response).to redirect_to(goal_url(Goal.last))
        end
      end
    end
  end

end  