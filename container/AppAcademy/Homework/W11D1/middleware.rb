require 'rack'

class LoggerMiddleware
  attr_reader :app

  def initialize(app)
    p "Initializing logger"
    @app = app
  end

  def call(env)
    p "Calling logger"
    write_log(env)
    app.call(env)
  end

  private

  def write_log(env)
    req = Rack::Request.new(env)
    log_file = File.open('application.log', 'a')

    log_text = <<-LOG
    Time: #{Time.now}
    IP: #{req.ip}
    Path: #{req.path}
    User Agent: #{req.user_agent}
    LOG

    log_file.write(log_text)
    log_file.close
  end
end

class BrowserFilter
  attr_reader :app
  def initialize(app)
    @app = app
  end

  def call(env)
    req = Rack::Request.new(env)
    res = Rack::Response.new

    if req.user_agent.include?("MSIE")
      res.status = 302
      res['Location'] = 'https://www.google.com/chrome/'
      res.finish
    else
      app.call(env)
    end
  end
end

cool_app = Proc.new do |env|
  res = Rack::Response.new
  file = File.open('index.html', 'r')
  lines = file.read

  res['Content-Type'] = 'text/html'
  res.write(lines)

  res.finish
end

app = Rack::Builder.new do
  use BrowserFilter
  use LoggerMiddleware
  run cool_app
end.to_app

Rack::Server.start({
  app: app,
  Port: 3000
})