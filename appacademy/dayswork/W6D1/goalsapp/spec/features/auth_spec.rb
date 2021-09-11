require "spec_helper"
require "rails_helper"

feature "the signup process" do
  scenario "has a new user page" do
    visit new_user_url
    expect(page).to have_content("Sign Up")
    expect(page).to have_content("username")
    expect(page).to have_content("password")
  end

  feature "signing up a user" do
    scenario "shows username on the homepage after signup" do
      visit new_user_url
      fill_in("username", with: "somebody")
      fill_in("password", with: "password")
      click_button("Create Account")
      expect(page).to have_content("somebody")
    end
  end
end

feature "logging in" do
  scenario "shows username on the homepage after login" do
    create(:user)
    visit new_session_url
    fill_in("username", with: "anyone")
    fill_in("password", with: "password")
    click_button("Sign In")
    expect(page).to have_content("anyone")
  end
end

feature "logging out" do
  scenario "begins with a logged out state" do
    create(:user)
    user = User.last
    visit user_goals_url(user.id)
    expect(page).to have_content("Sign In")
  end

  scenario 'doesn\'t show username on the homepage after logout' do
    create(:user)
    visit new_session_url
    fill_in("username", with: "anyone")
    fill_in("password", with: "password")
    click_button("Sign In")
    click_button("Sign Out")
    expect(page).to_not have_content("anyone")
  end
end
