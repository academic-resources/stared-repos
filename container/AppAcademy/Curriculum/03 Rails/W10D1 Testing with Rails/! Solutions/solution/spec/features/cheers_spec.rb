require 'rails_helper'

feature "giving cheers" do
  given!(:hello_world) { FactoryBot.create(:user_hw) }
  given!(:foo_bar) { FactoryBot.create(:user_foo) }

  given!(:hw_goal) { FactoryBot.create(:goal, author: hello_world) }
  given!(:foo_goal) { FactoryBot.create(:goal, author: foo_bar) }

  background(:each) do
    login_as(foo_bar)
  end

  scenario "lets a user give a cheer for another user's goal" do
    give_cheer_to(hello_world)
    expect(page).to have_content("You cheered hello_world's goal!")
    expect(page).not_to have_button "Cheer!"
  end

  scenario "does not let a user cheer their own goals" do
    visit goal_url(foo_goal)
    expect(page).not_to have_button "Cheer!"
    visit user_url(foo_bar)
    expect(page).not_to have_button "Cheer!"
  end

  scenario "does not let the user cheer the same goal twice" do
    give_cheer_to(hello_world)
    expect(page).not_to have_button "Cheer!"
  end
end

feature "viewing my cheers" do
  given!(:hello_world) { FactoryBot.create(:user_hw) }
  given!(:foo_bar) { FactoryBot.create(:user_foo) }
  given!(:hw_goal) { FactoryBot.create(:goal, author: hello_world) }

  background(:each) do
    FactoryBot.create(:cheer, giver: foo_bar, goal: hw_goal)
    login_as(hello_world)
  end

  scenario "lets a user see the number of cheers given for their goal" do
    visit goal_url(hw_goal)
    expect(page).to have_content "Cheers: 1"
  end

  scenario "has a cheer index that shows the cheers with their info" do
    visit cheers_url
    expect(page).to have_content "Cheer given by:"
    expect(page).to have_content foo_bar.username
    expect(page).to have_content "For goal of:"
    expect(page).to have_content hw_goal.title
  end
end

feature "limit on cheers" do
  given!(:hello_world) { FactoryBot.create(:user_hw) }
  given!(:foo_bar) { FactoryBot.create(:user_foo) }
  given!(:hw_goal) { FactoryBot.create(:goal, author: hello_world) }

  background(:each) do
    login_as(foo_bar)
    visit user_url(hello_world)
    @limit = page.find("#cheer-limit").text.to_i
  end

  scenario "displays remaining cheers for the day to logged in user on profile" do
    expect((@limit > 0)).to be_truthy
  end

  scenario "does not allow giving more cheers than the limit" do
    until @limit == 0
      give_another_cheer
      @limit = page.find("#cheer-limit").text.to_i
    end
    # attempt going over the cheer limit
    expect(page).not_to have_button "Cheer!"
  end
end

# More great ideas for specs:
# Each goal should have its own cheer button
# pushing the 'Cheer' button for one goal should not change other goals
# pushing the button only decreases cheer count by 1
# and removing cheers should be allowed
