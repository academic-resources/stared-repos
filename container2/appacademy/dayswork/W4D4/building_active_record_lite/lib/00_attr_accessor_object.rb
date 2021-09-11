class AttrAccessorObject
  def self.my_attr_accessor(*names)
    names.each do |name|
      define_method(name) { self.instance_variable_get("@#{name}") }

      define_method("#{name}=") { |val| self.instance_variable_set("@#{name}", val) }
    end
  end
end
