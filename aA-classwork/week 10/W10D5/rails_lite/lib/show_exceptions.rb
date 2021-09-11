require 'erb'

class ShowExceptions

  attr_reader :app
  
  def initialize(app)
    @app = app
  end

  def call(env)
    begin 
      @app.call(env)
    rescue RuntimeError => e
      render_exception(e)
    end
  end

  private

  def render_exception(e)
    path = "lib/templates/rescue.html.erb"
    file = ERB.new(File.read(path)).result(binding)
    ['500', {'Content-type' => 'text/html'}, file]
  end

end
