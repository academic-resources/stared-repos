from python.ds.heap import MinHeap, MaxHeap


class Solution:
    def find_median_of_data_stream(self, arr):
        lower = MaxHeap()
        higher = MinHeap()
        medians = []
        for a in arr:
            self.add_number(a, lower, higher)
            self.rebalance(lower, higher)
            medians.append(self.get_median(lower, higher))

        return medians

    def add_number(self, number, lower, higher):
        if len(lower) == 0 or number < lower.peek():
            lower.push(number)
        else:
            higher.push(number)

    def rebalance(self, lower, higher):
        bigger = lower if len(lower) > len(higher) else higher
        smaller = lower if len(lower) < len(higher) else higher

        if len(bigger) - len(smaller) >= 2:
            smaller.push(bigger.pop())

    def get_median(self, lower, higher):
        bigger = lower if len(lower) > len(higher) else higher
        smaller = lower if len(lower) < len(higher) else higher

        if len(bigger) == len(smaller):
            return (bigger.peek() + smaller.peek()) / 2
        else:
            return bigger.peek()


if __name__ == '__main__':
    solution = Solution()
    print(solution.find_median_of_data_stream([12, 9, 17, 13, 21, 3, 22, 14]))
