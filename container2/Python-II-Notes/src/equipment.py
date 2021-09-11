# Child of Product
from product import Product


class Equipment(Product):
    def __init__(self, name, price, style, weight):
        super().__init__(name, price)
        self.style = style
        self.weight = weight

