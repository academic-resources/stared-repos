require 'rack'

app = Proc.new do |env|
    req = Rack::Request.new(env)
    res = Rack::Response.new
    res['Content-Type'] = 'text/html'
    res.write("Hello World")
    res.finish
end

app_academy = Proc.new do |env|
    req = Rack::Request.new(env)
    res = Rack::Response.new
    res['Content-Type'] = 'text/html'
    if req.path == '/i/love/app/academy'
        res.write("<h1>/i/love/app/academy</h1>")
    end
    res.finish
end




Rack::Server.start(
    app: app_academy,
    Port: 3000
)
