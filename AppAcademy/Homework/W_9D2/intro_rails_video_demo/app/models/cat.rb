class Cat < ActiveRecord::Base
  COAT_COLORS = %w(black calico tabby)

  validates :coat_color, :description, :name, :skill, presence: true
  validates :coat_color, inclusion: COAT_COLORS

  has_many :toys
  has_many :taggings, dependent: :destroy, inverse_of: :cat
  has_many :tags, through: :taggings

  # Cat#tags <<<
  # Cat#tag_ids <<<
  # Cat#tag_ids=
  # * Creates/Destroys records in a join table.
  # * new_tags = [1, 2, 3]
  # * markov.tag_ids=(new_tags)
  # * First it queries markov.tag_ids to get the ids of markov's current tags.
  # * Any ids in new_tags not in markov.tag_ids yet, it builds and saves
  #   a new Tagging object with { cat_id: markov.id, tag_id: new_tag_id }
  # * Any ids in markov.tag_ids which are not in new_tags (e.g., tag #4)
  #   will have the Tagging destroyed.

  # def my_set_tag_ids(new_tag_ids)
  #   old_tag_ids = self.tag_ids
  #
  #   tag_ids_to_destroy = old_tag_ids - new_tag_ids
  #   tag_ids_to_create = new_tag_ids - old_tag_ids
  #
  #   ActiveRecord::Base.transaction do
  #     Tagging.where(cat_id: self.id, tag_id: tag_ids_to_destroy).each do |tagging|
  #       # I added this bit to make sure to raise an error if a tagging
  #       # couldn't be destroyed because a before_destroy callback prevented
  #       # it. Super safe. :-)
  #
  #       # raises an error if for any reason the tagging is not destroyed.
  #       tagging.destroy!
  #     end
  #     tag_ids_to_create.each do |tag_id|
  #       Tagging.create!(cat_id: self.id, tag_id: tag_id)
  #     end
  #   end
  # end
end
