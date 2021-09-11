class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  ##
  # An awesome method that could be used to create uniqueness for both
  # the session_token and the activation_token!
  ##
  
  def generate_unique_token_for_field(field)
    token = SecureRandom.urlsafe_base64(16)

    while self.class.exists?(field => token)
      token = SecureRandom.urlsafe_base64(16)
    end

    token
  end
end
