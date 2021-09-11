class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __repr__(self):
        return self.name + '\t$' + str(self.price)

# p = Product('baseball bat', 19.99)
# print(p)
