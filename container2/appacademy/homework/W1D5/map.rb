require "byebug"

class Map
  def initialize
    @my_map = Array.new { Array.new(2) }
  end

  def get(key)
    ele = find_ele(key)
    ele ? ele[1] : nil
  end

  def set(key, value)
    ele = find_ele(key)
    if ele.nil?
      @my_map << [key, value]
    else
      ele[1] = value
    end
    self
  end

  def delete(key)
    ele = find_ele(key)
    if ele
      @my_map = @my_map.reject { |ele| ele[0] == key }
    end
    self
  end

  def show
    hash = {}
    @my_map.map do |arr|
      hash[arr.first] = arr.last
    end
    hash
  end

  private

  def find_ele(key)
    eles = @my_map.select { |ele| ele.first == key }
    eles[0]
  end
end
