module GoalFeaturesHelper
  def submit_new_goal(goal_title, privacy = {private: false})
    visit new_goal_url
    fill_in "Title", with: goal_title
    if privacy[:private]
      check "Private?"
    end
    click_button "New Goal"
  end

  def build_three_goals(user)
    FactoryBot.create(:goal, title: "pickle a pepper", author: user)
    FactoryBot.create(:goal, title: "get octocat's autograph", author: user)
    FactoryBot.create(:goal, title: "bake a cake", author: user)
  end

  def verify_three_goals
    visit goals_url
    expect(page).to have_content "pickle a pepper"
    expect(page).to have_content "get octocat's autograph"
    expect(page).to have_content "bake a cake"
  end
end
