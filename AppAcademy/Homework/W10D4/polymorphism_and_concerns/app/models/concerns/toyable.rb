# rubocop:disable all
module Toyable
  extend ActiveSupport::Concern

  included do
    has_many :toys, as: :toyable
  end

  def receive_toy(name)
    toy = Toy.find_or_create_by(name: name, toyable_id: self.id)
    self.toys << toy
  end
end