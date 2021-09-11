require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    @class_name.constantize
  end

  def table_name
    table_name = @class_name.downcase.pluralize
    table_name == "humen" ? "humans" : table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    single_name = name.to_s.singularize.underscore
    @foreign_key = options[:foreign_key] || "#{single_name}_id".to_sym
    @primary_key = options[:primary_key] || "id".to_sym
    @class_name = options[:class_name] || "#{name.to_s.singularize.camelcase}"
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    single_name = self_class_name.to_s.singularize.underscore
    @foreign_key = options[:foreign_key] || "#{single_name}_id".to_sym
    @primary_key = options[:primary_key] || "id".to_sym
    @class_name = options[:class_name] || "#{name.to_s.singularize.camelcase}"
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    options_obj = BelongsToOptions.new(name, options)
    define_method(name) do
      options_obj.model_class.where(options_obj.primary_key =>
        self.send(options_obj.foreign_key)).first
    end
    @options = {name => options_obj}
  end
  
  def has_many(name, options = {})
    options_obj = HasManyOptions.new(name, self, options)
    define_method(name) do
      options_obj.model_class.where(options_obj.foreign_key =>
        self.send(options_obj.primary_key))
    end
  end

    # Class level method?
  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
    @options ||= {}
  end
end

class SQLObject
  extend Associatable
end
