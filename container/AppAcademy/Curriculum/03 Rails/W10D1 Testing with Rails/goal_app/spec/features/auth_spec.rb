require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
  before(:each) do
    visit users_url
    click_link('Sign Up')
  end
  scenario 'has a new user page' do
    expect(page).to have_content('Sign Up!')
  end

  feature 'signing up a user' do
    before(:each) do
      fill_in 'username', with: 'Mashu'
      fill_in 'password', with: 'password123'
      click_button 'Sign Up'
    end
    scenario 'shows username on the homepage after signup' do
      expect(page).to have_content("Mashu's Profile")
    end
  end
end

feature 'logging in' do
  before(:each) do
    @user = create(:user)
    login_user(@user)
  end
  scenario 'shows username on the homepage after login' do
    expect(page).to have_content("#{@user.username}'s Profile")
  end
end

feature 'logging out' do
  before(:each) do
    @user = create(:user)
    login_user(@user)
    click_button 'Log Out'
  end
  scenario 'begins with a logged out state' do
    expect(session[:session_token]).to be nil
  end
  scenario 'doesn\'t show username on the homepage after logout' do
    expect(page).to_not have_content("welcome #{@user.username}")
  end
end
