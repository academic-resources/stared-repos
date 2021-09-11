require "active_support"
require "active_support/inflector"
require "active_support/core_ext"
require "erb"
require_relative "./session"
require "byebug"

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, params = {})
    @req = req
    @res = res
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  def set_already_built
    raise if already_built_response?
    @already_built_response = true
  end

  # Set the response status code and header
  def redirect_to(url)
    set_already_built
    res.status = 302
    res.set_header("Location", url)
    @session.store_session(@res)
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    set_already_built
    @res.set_header("Content-Type", content_type)
    @res.write(content)
    @session.store_session(@res)
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    folder = self.class.to_s.underscore
    path = File.join("views", folder, template_name.to_s)
    full_path = File.dirname("views") + "/#{path}.html.erb"
    file = File.read(full_path)
    template = ERB.new(file).result(binding)
    render_content(template, "text/html")
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    self.send(name)
    render(name) unless already_built_response?
  end
end
