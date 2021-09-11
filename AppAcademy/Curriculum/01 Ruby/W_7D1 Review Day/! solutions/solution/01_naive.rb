# O(n * m) naive solution
def max_windowed_range(array, window_size)
  num_windows = array.length - window_size + 1
  best_range = nil

  num_windows.times do |i|
    window = array.slice(i, window_size)
    current_range = window.max - window.min

    best_range = current_range if !best_range || current_range > best_range
  end

  best_range
end