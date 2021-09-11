class Like < ApplicationRecord
  belongs_to :likable, polymorphic: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
end
