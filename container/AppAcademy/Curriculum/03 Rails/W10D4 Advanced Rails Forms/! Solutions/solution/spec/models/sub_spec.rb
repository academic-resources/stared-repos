require 'rails_helper'

RSpec.describe Sub, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:moderator) }
  it { should validate_presence_of(:description) }

  it { should belong_to(:moderator) }
  it { should have_many(:posts) }
  it { should have_many(:post_subs) }
end
