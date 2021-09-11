module Toyable
  extend ActiveSupport::Concern

  included do
    has_many :toys, as: :toyable
  end

  def receive_toy(name)
    toy = Toy.find_or_create_by({
      name: name,
      toyable_id: self.id,
      toyable_type: self.class.to_s,
    })

    my_toy_ids = self.toy_ids
    unless my_toy_ids.include?(toy.id)
      my_toy_ids << toy.id
      self.toy_ids = my_toy_ids
      self.save
    end
  end
end
