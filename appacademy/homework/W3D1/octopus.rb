fish_array = ["fish", "fiiish", "fiiiiish", "fiiiish", "fffish", "ffiiiiisshh", "fsh", "fiiiissshhhhhh"]

def sluggish_octopus(arr)
  longest = nil
  (0...arr.length - 1).each do |i|
    (i...arr.length).each do |j|
      longest = arr[j] if arr[j].length > arr[i].length
    end
  end
  longest
end

def dominant_octopus(arr)
  sorted = arr.sort { |a, b| a.length <=> b.length }
  sorted.last
end

def clever_octopus(arr)
  longest = ""
  arr.each { |f| longest = f if f.length > longest.length }
  longest
end

def test_sluggish_octopus(arr)
  start_time = Time.now.nsec
  100.times { sluggish_octopus(arr) }
  end_time = Time.now.nsec
  puts "Sluggish took average #{(end_time - start_time) / 100000.0} ms"
end

def test_dominant_octopus(arr)
  start_time = Time.now.nsec
  100.times { dominant_octopus(arr) }
  end_time = Time.now.nsec
  puts "Dominant took average #{(end_time - start_time) / 100000.0} ms"
end

def test_clever_octopus(arr)
  start_time = Time.now.nsec
  100.times { clever_octopus(arr) }
  end_time = Time.now.nsec
  puts "Clever took average #{(end_time - start_time) / 100000.0} ms"
end

test_sluggish_octopus(fish_array)
test_dominant_octopus(fish_array)
test_clever_octopus(fish_array)

tiles_array = ["up", "right-up", "right", "right-down", "down", "left-down", "left", "left-up"]

def slow_dance(tile, tiles_array)
  tiles_array.each_with_index do |t, i|
    return i if t == tile
  end
end

def test_slow_dance(arr)
  start_time = Time.now.nsec
  100.times do
    slow_dance("up", arr)
    slow_dance("right-down", arr)
  end
  end_time = Time.now.nsec
  puts "Slow Dance took average #{(end_time - start_time) / 100000.0} ms"
end

tiles_hash = {
  "up" => 0,
  "right-up" => 1,
  "right" => 2,
  "right-down" => 3,
  "down" => 4,
  "left-down" => 5,
  "left" => 6,
  "left-up" => 7,
}

def fast_dance(tile, hash)
  hash[tile]
end

def test_fast_dance(hash)
  start_time = Time.now.nsec
  100.times do
    fast_dance("up", hash)
    fast_dance("right-down", hash)
  end
  end_time = Time.now.nsec
  puts "Fast Dance took average #{(end_time - start_time) / 100000.0} ms"
end

test_slow_dance(tiles_array)
test_fast_dance(tiles_hash)
