require_relative '02_searchable'
require 'active_support/inflector'
require 'byebug'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  # def self.assoc_options
  #   @assoc_options ||= {}
  # end

  def model_class
    # ...
    @class_name.constantize
  end

  def table_name
    # ...
    self.model_class.table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})

    # ...
    defaults = {foreign_key: "#{name}_id".to_sym, primary_key: :id, class_name: "#{name}".singularize.camelize}

    defaults.keys.each do |key|
      self.send("#{key}=", options[key] || defaults[key])
    end
    # self.foreign_key = options[:foreign_key] || "#{name}_id".to_sym
    # self.primary_key = options[:primary_key] || :id
    # self.class_name = options[:class_name] || "#{name}".singularize.camelize

  end
end

class HasManyOptions < AssocOptions   
  def initialize(name, self_class_name, options = {})
    # ...UserName
    #user_names_id
    #
    # debugger
    defaults = {foreign_key: "#{self_class_name}".foreign_key.to_sym, primary_key: :id, class_name: "#{name}".singularize.camelize}
    defaults.keys.each do |key|
      self.send("#{key}=", options[key] || defaults[key])
    end
  #   self.foreign_key = options[:foreign_key] || "#{self_class_name}".foreign_key.to_sym
  #   self.primary_key = options[:primary_key] || :id
  #   self.class_name = options[:class_name] || "#{name}".singularize.camelize
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    options = BelongsToOptions.new(name,options)
    # @options[name: options]
    self.assoc_options[name] = options
    define_method(name) do
      
       foreign_value = self.send(options.foreign_key)
       options.model_class.where(options.primary_key => foreign_value).first     
    end
  end
  
  def has_many(name, options = {})
    # debugger
    options = HasManyOptions.new(name, self, options)
    define_method(name) do
      # debugger
       primary_value = self.send(options.primary_key)
       options.model_class.where(options.foreign_key => primary_value)   
    end
  end

  def assoc_options
    @options ||= {}
  end
end

class SQLObject
  extend Associatable
  # Mixin Associatable here...
end
