class Sub < ApplicationRecord
  validates :description, :name, presence: true
  validates :name, uniqueness: true

  has_many :post_subs, inverse_of: :sub, dependent: :destroy
  has_many :posts, through: :post_subs, source: :post

  belongs_to :moderator,
    class_name: :User,
    foreign_key: :moderator_id,
    primary_key: :id,
    inverse_of: :subs
end
