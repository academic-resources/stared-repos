def windowed_max_range(arr, window_size)
  current_max_range = nil
  window_end = arr.length - window_size
  (0..window_end).each do |i|
    window = arr[i..i+window_size-1]
    current_window_spread = window.max - window.min
    if current_max_range.nil?
      current_max_range = current_window_spread
    elsif current_window_spread > current_max_range
      current_max_range = current_window_spread
    end
  end
  current_max_range
end