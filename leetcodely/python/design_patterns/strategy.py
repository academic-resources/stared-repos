class ShippingCost:
    def __init__(self, strategy):
        self._strategy = strategy

    def cost(self, order):
        return self._strategy.calculate(order)

import abc


class Strategy(abc.ABC):
    @abc.abstractmethod
    def calculate(self, order):
        pass


class FedexStrategy(Strategy):
    def calculate(self, order):
        return 3.00


class UPSStrategy(Strategy):
    def calculate(self, order):
        return 4.00


class USPSStrategy(Strategy):
    def calculate(self, order):
        return 5.00