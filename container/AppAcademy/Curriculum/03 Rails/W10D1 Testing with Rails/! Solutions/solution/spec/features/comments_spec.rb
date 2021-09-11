require 'rails_helper'

feature "commenting" do
  given!(:hello_world) { FactoryBot.create(:user_hw) }
  given!(:foo_bar) { FactoryBot.create(:user, username: "foo_bar") }
  given!(:foo_goal) do
    FactoryBot.create(:goal, author: foo_bar)
  end

  background(:each) do
    login_as(hello_world)
    visit user_url(foo_bar)
  end

  # shared examples are another way to DRY out your specs
  # have some docs:
  # https://www.relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples
  shared_examples "comment" do
    scenario "should have a form for adding a new comment" do
      expect(page).to have_content "New Comment"
      expect(page).to have_field "Comment"
    end

    scenario "should save the comment when a user submits one" do
      fill_in "Comment", with: "my magical comment!"
      click_on "Save Comment"
      expect(page).to have_content "my magical comment!"
    end
  end

  feature "user profile comment" do
    it_behaves_like "comment"
  end

  feature "goal comment" do
    background(:each) do
      click_on foo_goal.title
    end

    it_behaves_like "comment"
  end
end
