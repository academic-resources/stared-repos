require 'timeout'

# Set a 2-second timeout to avoid infinite loops
RSpec.configure do |c|
  if ENV['grading'] == 'true'
    c.around(:each) do |example|
      Timeout::timeout(2) {
        example.run
      }
    end
  end
end
