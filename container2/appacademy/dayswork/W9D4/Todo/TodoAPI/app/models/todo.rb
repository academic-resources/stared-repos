# == Schema Information
#
# Table name: todos
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  body       :string           not null
#  done       :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Todo < ApplicationRecord
  validates :title, :body, presence: true
  validates :done, inclusion: { in: [true, false] }

  has_many :steps
end
