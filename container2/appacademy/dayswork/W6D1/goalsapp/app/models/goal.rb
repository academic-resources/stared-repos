class Goal < ApplicationRecord
  validates :title, presence: true
  validates :title, uniqueness: { scope: :user_id }

  belongs_to :user

  def self.excluding_other_privates(id)
    where("private = false OR (private = true AND user_id = #{id})")
  end
end
