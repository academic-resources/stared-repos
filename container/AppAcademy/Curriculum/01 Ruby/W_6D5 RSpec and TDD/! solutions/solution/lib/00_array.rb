def my_uniq(array)
  uniq_array = []

  array.each do |el|
    uniq_array << el unless uniq_array.include?(el)
  end

  uniq_array
end

# Alternatively with inject:
#
# def my_uniq(array)
#   array.inject([]) do |uniq_array, el|
#     uniq_array << el unless uniq_array.include?(el)
#     uniq_array
#   end
# end

def two_sum(array)
  pairs = []

  array.count.times do |i1|
    (i1 + 1).upto(array.count - 1) do |i2|
      pairs << [i1, i2] if array[i1] + array[i2] == 0
    end
  end

  pairs
end

def my_transpose(rows)
  dimension = rows.first.count
  cols = Array.new(dimension) { Array.new(dimension) }

  dimension.times do |i|
    dimension.times do |j|
      cols[j][i] = rows[i][j]
    end
  end

  cols
end

def pick_stocks(prices)
  # can always make zero dollars by not buying/selling
  best_pair = nil
  best_profit = 0

  prices.each_index do |buy_date|
    prices.each_index do |sell_date|
      # can't sell before buy
      next if sell_date < buy_date

      profit = prices[sell_date] - prices[buy_date]
      if profit > best_profit
        # Choose best days. Greed is good.
        best_pair, best_profit = [buy_date, sell_date], profit
      end
    end
  end

  best_pair
end
