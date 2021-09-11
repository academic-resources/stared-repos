function maxProfitWithKTransactions(prices, k) {
  let profitDays = new Array()
	let basePrice = prices[0]
	let currProfit = 0
	for (let i = 1; i < prices.length; i++) {
		if (prices[i] >= prices[i - 1]) {
			currProfit = prices[i] - basePrice
		} else {
			basePrice = prices[i]
      profitDays.push(currProfit)
			currProfit = 0
    }
    
  }
  if (currProfit > 0) profitDays.push(currProfit)
	let maxProfit = 0
	for (let i = 0; i < k && i < profitDays.length; i++) {
		maxProfit += profitDays[i]
	}
	
	return maxProfit
}


console.log(maxProfitWithKTransactions([5,11,3,50,60,90],2))    //=> 93