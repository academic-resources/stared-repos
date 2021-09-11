require 'rails_helper'

RSpec.describe PostSub, type: :model do
  it { should validate_presence_of(:post) }
  it { should validate_presence_of(:sub) }

  it { should belong_to(:post) }
  it { should belong_to(:sub) }
end
