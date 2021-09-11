require "rails_helper"

feature "loads homepage" do
  scenario "displays the homepage" do
    log_in_test_user
    expect(page).to have_content("All Goals")
  end

  scenario "shows not show others' private goals" do
    other_user = User.create(username: "other_user", password: "password")
    other_user.goals.create({
      title: "test_private",
      user_id: other_user.id,
      private: true,
    })
    other_user.goals.create({
      title: "test_public",
      user_id: other_user.id,
      private: false,
    })
    log_in_test_user
    expect(page).to_not have_content("test_private")
    expect(page).to have_content("test_public")
  end

  scenario "shows current users' goals" do
    log_in_test_user
    current_user = User.last
    current_user.goals.create({
      title: "own_goal",
      user_id: current_user.id,
      private: true,
    })
    current_user.goals.create({
      title: "own_goal_public",
      user_id: current_user.id,
      private: false,
    })
    visit user_goals_url(current_user.id)
    expect(page).to have_content("own_goal")
    expect(page).to have_content("own_goal_public")
  end
end

feature "goes to edit page" do
  scenario "edits a goal" do
    log_in_test_user
    current_user = User.last
    current_user.goals.create({
      title: "own_goal",
      user_id: current_user.id,
      private: true,
    })
    visit user_goals_url(current_user.id)
    click_link("Edit")
    fill_in("goal[title]", with: "edited goal")
    click_button("Save")
    expect(page).to have_content("edited goal")
  end
end
