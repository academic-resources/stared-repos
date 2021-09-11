class Order:
    def __init__(self, shipper):
        self._shipper = shipper

    @property
    def shipper(self):
        return self._shipper


class Shipper:
    fedex = 1
    ups = 2
    usps = 3


class ShippingCost:
    def __init__(self, order):
        self._cost = 0
        if order.shipper == Shipper.fedex:
            self._cost = self._fedex_cost(order)
        elif order.shipper == Shipper.ups:
            self._cost = self._ups_cost(order)
        elif order.shipper == Shipper.usps:
            self._cost = self._usps_cost(order)
        else:
            raise ValueError("Invalid Shipper")

    def get_cost(self):
        return self._cost

    def _fedex_cost(self, order):
        return 3.00

    def _ups_cost(self, order):
        return 4.00

    def _usps_cost(self, order):
        return 5.00
