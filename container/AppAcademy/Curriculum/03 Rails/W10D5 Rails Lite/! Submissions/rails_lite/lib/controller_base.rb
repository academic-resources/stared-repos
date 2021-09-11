# rubocop:disable all
require 'active_support'
require 'active_support/core_ext'
require 'active_support/inflector'
require 'erb'
require_relative './session'
require 'byebug'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res)
    @req = req
    @res = res
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    !!@already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    unless already_built_response?
      @res.status = 302
      @res.add_header('location', url)
      @already_built_response = true
      @session.store_session(@res)
    else
      raise RuntimeError
    end

  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    unless already_built_response?
      @res.add_header('content-type', content_type)
      @res.write content
      @already_built_response = true
      @session.store_session(@res)
    else
      raise RuntimeError
    end
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    template = template_name.to_s
    controller = ActiveSupport::Inflector.underscore(self.class.to_s)
    root = File.dirname(__FILE__)
    view = File.join(root, "..", "views", controller, "#{template}.html.erb")
    content = ERB.new(File.read(view)).result(binding)
    render_content(content, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
  end
end

