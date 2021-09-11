require 'rails_helper'

feature "goal completeness tracking" do
  given!(:hello_world) { FactoryBot.create(:user_hw) }
  given(:foo_bar) { FactoryBot.create(:user_foo) }
  given!(:hw_goal) { FactoryBot.create(:goal, author: hello_world) }

  background(:each) do
    login_as(hello_world)
  end

  describe "goals start out uncompleted" do
    context "on the goal show page" do
      scenario "starts as not completed" do
        visit goal_url(hw_goal)
        expect(page).to have_content("Ongoing")
      end
    end

    context "on the goal index page" do
      scenario "starts as not completed" do
        visit goals_url
        expect(page).to have_content("Ongoing")
      end
    end

    context "on the user's profile page" do
      scenario "starts as not completed" do
        visit user_url(hello_world)
        expect(page).to have_content("Ongoing")
      end
    end
  end

  describe "marking a goal as completed" do
    context "on the goal show page" do
      scenario "allows user to change goal to completed" do
        visit goal_url(hw_goal)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
      end

      scenario "redirects to the same page after updating goal" do
        visit goal_url(hw_goal)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Goal:")
        expect(page).to have_content("Title:")
        expect(page).to have_content(hw_goal.title)
      end

      scenario "disallows editing completeness when it is not your goal" do
        click_button "Log Out"
        login_as(foo_bar)
        visit goal_url(hw_goal)
        expect(page).not_to have_button("Complete")
      end
    end

    context "on the goal index page" do
      scenario "allows user to change goal to completed" do
        visit goals_url
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
      end

      scenario "redirects to the same page after updating goal" do
        visit goals_url
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Your Goals")
      end
    end

    context "on the user's profile page" do
      scenario "allows user to change goal to completed" do
        visit user_url(hello_world)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
      end

      scenario "redirects to the same page after updating goal" do
        visit user_url(hello_world)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
        expect(page).to have_content("Hello_world's Profile")
        expect(page).to have_content("Hello_world's Goals:")
      end

      scenario "disallows editing completeness when it is not your goal" do
        click_button "Log Out"
        login_as(foo_bar)
        visit user_url(hello_world)
        expect(page).not_to have_button("Complete")
      end
    end
  end
end
