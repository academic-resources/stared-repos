class StockPicker
    attr_reader :prices

    def initialize(prices)
        @prices = prices
    end

    def buy_day
        best_profit[0]
    end
    
    def sell_day
        best_profit[1]
    end

    private

    def best_profit
        b = -1
        s = -1
        profit = -1
        (0...prices.length - 1).to_a.each do |buy|
            (buy + 1...prices.length).each do |sell|
                if prices[sell] - prices[buy] > profit
                    b = buy
                    s = sell
                    profit = prices[sell] - prices[buy]
                end
            end
        end
        [b, s]
    end
end