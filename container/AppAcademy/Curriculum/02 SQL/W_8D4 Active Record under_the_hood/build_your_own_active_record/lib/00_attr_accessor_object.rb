class AttrAccessorObject
  def self.my_attr_accessor(*attributes)
    # attributes are symbols
    attributes.each do |attr|
      attr = attr.to_s
      define_method("#{attr}") do
        instance_variable_get("@#{attr}")
      end

      define_method("#{attr}=") do |set_attr|
        instance_variable_set("@#{attr}", set_attr)
      end
    end
  end
end