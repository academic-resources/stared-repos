# == Schema Information
#
# Table name: steps
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  body       :string
#  todo_id    :integer
#  done       :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Step < ApplicationRecord
  validates :title, presence: true
  validates :done, inclusion: { in: [true, false] }

  belongs_to :todo
end
