"""Created by sgoswami on 7/18/17."""
"""Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), 
design an algorithm to find the maximum profit."""
import sys


class Solution(object):
    def maxProfit(self, prices):
        """
        :type prices: List[int]
        :rtype: int
        """
        # min_buying, profit = sys.maxint, 0
        #
        # for i, v in enumerate(prices):
        #     if v < min_buying:
        #         min_buying = v
        #     profit = max(profit, v-min_buying)
        # return profit
        min_buying, profit = sys.maxsize, 0

        for i, v in enumerate(prices):
            min_buying = min(min_buying, v)
            profit = max(profit, v - min_buying)
        return profit


