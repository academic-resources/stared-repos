require 'rails_helper'

RSpec.describe Post, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:author) }

  it { should have_many(:post_subs) }
  it { should have_many(:subs).through(:post_subs) }
  it { should have_many(:user_votes) }
  it { should have_many(:comments) }
  it { should belong_to(:author) }

  describe '#comments_by_parent' do
    def build_comment(post, moderator, parent_comment = nil)
      comment = post.comments.new
      comment.parent_comment = parent_comment
      comment.author = moderator
      comment.body = 'Lorem ipsum'
      comment.save
      comment
    end

    it 'builds a nested comments hash' do
      moderator = FactoryBot.create(:user)
      sub = moderator.subs.create!(name: 'A sub!', description: 'Something!')

      post = Post.new(url: 'URL', title: 'TITLE')
      post.author = moderator
      post.sub_ids = [sub.id]
      post.save!

      comment = build_comment(post, moderator)
      child_comment = build_comment(post, moderator, comment)
      grand_child_comment = build_comment(post, moderator, child_comment)

      expect(post.comments_by_parent).to eq({
        nil => [comment],
        comment.id => [child_comment],
        child_comment.id => [grand_child_comment]
      })
    end
  end
end
