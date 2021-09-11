require_relative "02_searchable"
require "active_support/inflector"

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    # ...
  end

  def table_name
    # ...
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    @class_name = options[:class_name] || name.to_s.camelcase
    @foreign_key = options[:foreign_key] || (name.to_s + "_id").underscore.to_sym
    @primary_key = options[:primary_key] || "id".to_sym
    # defaults = {
    #   :class_name => name.to_s.camelcase,
    #   :primary_key => :id,
    #   :foreign_key => (name.to_s + "_id").to_sym
    # }

    # defaults.keys.each do |key|
    #   self.send("#{key}=", options[key] || defaults[key])
    # end
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    # ...
  end

  def has_many(name, options = {})
    # ...
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
  end
end

class SQLObject
  # Mixin Associatable here...
end
