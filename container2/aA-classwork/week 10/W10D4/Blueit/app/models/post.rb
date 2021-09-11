# == Schema Information
#
# Table name: posts
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  url        :string
#  content    :string
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord

    validates :title, :author_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :post_subs
    has_many :subs, through: :post_subs, source: :sub
    
    has_many :comments

    def top_level_comments
        self.comments.where("parent_comment_id IS NULL")
    end
end
    

    
