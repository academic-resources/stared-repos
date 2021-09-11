require 'rails_helper'

feature "CRUD of goals" do
  given!(:hello_world) { FactoryBot.create(:user_hw) }

  background(:each) do
    login_as(hello_world)
  end

  feature "creating goals" do
    scenario "should have a page for creating a new goal" do
      visit new_goal_url
      expect(page).to have_content "New Goal"
    end

    scenario "should show the new goal after creation" do
      submit_new_goal("have some toes")
      expect(page).to have_content "have some toes"
      expect(page).to have_content "Goal saved!"
    end
  end

  feature "reading goals" do
    scenario "should list goals" do
      build_three_goals(hello_world)
      verify_three_goals
    end
  end

  feature "updating goals" do
    given(:goal) { FactoryBot.create(:goal, author: hello_world) }

    scenario "should have a page for updating an existing goal" do
      visit edit_goal_url(goal)
      expect(page).to have_content "Edit Goal"
      expect(find_field('Title').value).to eq(goal.title)
    end

    scenario "should show the updated goal after changes are saved" do
      visit edit_goal_url(goal)
      fill_in "Title", with: "visit the sun"
      click_button "Update Goal"
      expect(page).not_to have_content "Edit Goal"
      expect(page).to have_content "Goal updated!"
      expect(page).to have_content "visit the sun"
    end
  end

  feature "deleting goals" do
    scenario "should allow the deletion of a goal" do
      build_three_goals(hello_world)
      visit goals_url
      click_button "delete 'pickle a pepper' goal"
      expect(page).not_to have_content "pickle a pepper"
      expect(page).to have_content "Goal deleted!"
    end
  end
end
