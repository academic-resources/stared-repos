# Child of product
from product import Product


class Clothing(Product):
    def __init__(self, name, price, color, size):
        super().__init__(name, price)
        self.color = color
        self.size = size
    
    def __repr__(self):
        return super().__repr__() + " comes in " + str(self.color) + ', ' + str(self.size)

