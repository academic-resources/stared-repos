FactoryBot.define do
  factory :comment do
    body "MyText"
    parent_comment_id 1
    post_id 1
    user_id 1
  end
end
