require 'socket'
require 'thread'
require 'json'

# TCP (Transmission Control Protocol) to transfer data back and forth
# from client and server.
# Bespoke protocol. Replace with HTTP (HyperText Transfer Protocol).
# HTML (HyperText Markup Language).


# We would send, to www.google.com port 80:
# GET / HTTP/1.1
# Host: www.google.com

# METHOD PATH PROTOCOL_VERSION
# HEADER_NAME: HEADER_VALUE

# * GET
# * POST
# * PATCH
# * DELETE

Thread.abort_on_exception = true

$id = 2
$cats = [
    { "id" => 1, "name" => "Markov" },
    { "id" => 2, "name" => "Curie" }
]

server = TCPServer.new(3000)

# CRUD: Create/Read/Update/Destroy
def handle_request(socket)
  Thread.new do
    # METHOD PATH PROTOCOL_VERSION
    line1 = socket.gets.chomp

    re = /^([^ ]+) ([^ ]+) HTTP\/1.1$/
    match_data = re.match(line1)
    verb = match_data[1]
    path = match_data[2]

    # "Resource" is "cats": "/cats", "/cats/123"
    cat_regex = /\/cats\/(\d+)/
    if [verb, path] == ["GET", "/cats"]
      # GET /cats
      # Index action
      socket.gets

      socket.puts "HTTP/1.1 200 OK"
      socket.puts
      socket.puts $cats.to_json
    elsif verb == "GET" && cat_regex =~ path
      # GET /cats/123
      # Show action
      socket.gets

      match_data2 = cat_regex.match(path)
      cat_id = Integer(match_data2[1])

      cat = $cats.find { |cat| cat["id"] == cat_id }

      socket.puts "HTTP/1.1 200 OK"
      socket.puts
      socket.puts cat.to_json
    elsif verb == "DELETE" && cat_regex =~ path
      # DELETE /cats/123
      # Destroy action
      socket.gets

      match_data2 = cat_regex.match(path)
      cat_id = Integer(match_data2[1])
      cat = $cats.find { |cat| cat["id"] == cat_id }

      if cat
        $cats.delete(cat)
        socket.puts "HTTP/1.1 200 OK"
        socket.puts
        socket.puts true.to_json
      else
        socket.puts "HTTP/1.1 404 Not Found"
      end
    elsif [verb, path] == ["POST", "/cats"]
      # POST /cats
      # Create action
      header1 = socket.gets.chomp
      match_data2 = /Content-Length: (\d+)/.match(header1)
      content_length = Integer(match_data2[1])
      socket.gets.chomp # reads a blank line

      body_data = socket.gets.chomp
      # body_data.length == content_length else error!

      cat = JSON.parse(body_data)
      cat[:id] = ($id += 1)
      $cats << cat

      # Doesn't actually create anything!
      socket.puts cat.to_json
    elsif verb == "PATCH" && path =~ cat_regex
      # PATCH /cats/123
      # Update action
      header1 = socket.gets.chomp
      match_data2 = /Content-Length: (\d+)/.match(header1)
      content_length = Integer(match_data2[1])
      socket.gets.chomp # reads a blank line

      body_data = socket.gets.chomp
      parsed_body_data = JSON.parse(body_data)

      match_data2 = cat_regex.match(path)
      cat_id = Integer(match_data2[1])

      cat = $cats.find { |cat| cat["id"] == cat_id }
      parsed_body_data.each do |(key, value)|
        cat[key] = value
      end

      socket.puts cat.to_json
    else
      socket.puts "HTTP/1.1 404 Not Found"
    end

    socket.close
  end

  puts "Spawned worker thread"
end

while true
  socket = server.accept
  handle_request(socket)
end
