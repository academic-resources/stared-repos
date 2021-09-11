require "benchmark"

class Octopi
  FISH = [
    'fish',
    'fiiish',
    'fiiiiish',
    'fiiiish',
    'fffish',
    'ffiiiiisshh',
    'fsh',
    'fiiiissshhhhhh'
  ]
  @sample = (1..1000).to_a.map(&:to_s)
  def self.sample_array
    @sample
  end

  TILES = [
    "up",
    "double-up",
    "right-up",
    "double-right-up",
    "right",
    "double-right",
    "right-down",
    "double-right-down",
    "down",
    "double-down",
    "left-down",
    "double-left-down",
    "left",
    "double-left",
    "left-up",
    "double-left-up"
  ]
  
  def self.sluggish_octopus(fish)
    biggest_fish = fish.first
    (0...fish.length - 1).each do |i1|
      (0...fish.length).each do |i2|
        biggest_fish = fish[i2] if fish[i2] > fish[i1]
      end
    end
    biggest_fish
  end

  def self.dominant_octopus(fish)
    merge_sort(fish).first
  end

  def self.merge_sort(array)
    return array if array.length <= 1
    mid = array.length / 2
    left = merge_sort(array.take(mid))
    right = merge_sort(array.drop(mid))
    merge(left, right)
  end

  def self.merge(left, right)
    merged = []
    until left.empty? || right.empty?
      if left.first.length > right.first.length
        merged << left.shift
      else
        merged << right.shift
      end
    end
    merged + left + right
  end

  def self.clever_octopus(fish)
    longest = fish.first
    fish.each { |fish| longest = fish if fish.length > longest.length }
    longest
  end

  #Octopi are full.  Now to dance.
  def self.slow_dance(direction, tiles)
    tiles.each_with_index { |dir, i| return i if dir == direction }
  end

  def self.index_dance(direction, tiles)
    tiles.index(direction)
  end

  def self.tiles_to_hash
    tiles = {}
    @sample.each_with_index { |dir, i| tiles[dir] = i }
    tiles
  end

  def self.constant_dance(direction, tiles_hash)
    tiles_hash[direction]
  end

  def self.compare
    # tile = TILES.sample
    tile = @sample.sample
    tiles_hash = tiles_to_hash
    Benchmark.bmbm do |x|
      x.report("Sluggish Octopus") { sluggish_octopus(FISH.dup) }
      x.report("Dominant Octopus") { dominant_octopus(FISH.dup) }
      x.report("Clever Octopus")   { clever_octopus(FISH.dup) }
      x.report("Slow Dance")       { slow_dance(tile, TILES) }
      x.report("Index Dance")      { index_dance(tile, @sample) }
      x.report("Constant Dance")   { constant_dance(tile, tiles_hash) }
    end
  end

end

Octopi.compare