class AttrAccessorObject
  def self.my_attr_accessor(*names)
    names.each do |name|
      
      define_method(name) do
        instance_variable_get("@#{name}")
      end

      define_method("#{name}=") do |param|
        instance_variable_set("@#{name}", param)
      end
    end
  end
end

