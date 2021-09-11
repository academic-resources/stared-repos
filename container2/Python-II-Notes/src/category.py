# from product import Product

class Category:


    def __init__(self, name, *products):
        # add later: product list parameter
        self.name = name
        self.products = products

    def __repr__(self):
        output = self.name
        if(self.products):
            for p in self.products:
                for item in p:
                    output += '\n' + str(item)
        else:
            output = "No products in " + self.name
        return output


# baseballtest = Category("Baseball", [Product('baseball bat', 299.99), Product('baseball', 11.99)])

# print(baseballtest)
