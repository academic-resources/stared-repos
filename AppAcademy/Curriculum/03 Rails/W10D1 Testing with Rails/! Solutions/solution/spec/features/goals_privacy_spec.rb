require 'rails_helper'

feature "goal privacy" do
  given!(:hello_world) { FactoryBot.create(:user_hw) }
  given!(:foo_bar) { FactoryBot.create(:user_foo) }

  describe "public goals" do
    given!(:hw_goal) { FactoryBot.create(:goal, author: hello_world) }

    scenario "should create public goals by default" do
      login_as(hello_world)
      submit_new_goal("build a tesla coil")
      expect(page).to have_content "Public"
    end

    scenario "shows public goals when logged out" do
      visit user_url(hello_world)
      expect(page).to have_content hw_goal.title
    end

    scenario "allows other users to see public goals" do
      login_as(foo_bar)
      visit user_url(hello_world)
      expect(page).to have_content hw_goal.title
    end
  end

  describe "private goals" do
    given!(:private_goal) { FactoryBot.create(:hw_goal, private: true) }
    given!(:private_goal) do
      FactoryBot.create(:goal, author: hello_world, private: true)
    end

    scenario "allows creating private goals" do
      login_as(hello_world)
      visit goal_url(private_goal)
      expect(page).to have_content "Private"
    end

    scenario "hides private goals when logged out" do
      visit user_url(hello_world)
      expect(page).not_to have_content private_goal.title
    end

    scenario "hides private goals from other users" do
      login_as(foo_bar)
      visit user_url(hello_world)
      expect(page).not_to have_content private_goal.title
    end
  end
end
