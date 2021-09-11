require 'rails_helper'

RSpec.describe UserVote, type: :model do
  it { should validate_presence_of(:user) }

  it { should belong_to(:user) }
  it { should belong_to(:votable) }
end
