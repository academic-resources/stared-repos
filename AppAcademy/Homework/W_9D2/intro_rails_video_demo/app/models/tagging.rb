class Tagging < ActiveRecord::Base
  belongs_to :cat
  belongs_to :tag

  validates :cat, :tag, presence: true
  validates :tag_id, uniqueness: { scope: :cat_id }
end
