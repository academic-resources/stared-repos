from category import Category
from product import Product
from equipment import Equipment
from clothing import Clothing

class Store: 
    def __init__(self, name, categories):
        self.name = name
        self.categories = categories

    def __repr__(self):
        output = ''
        output += self.name + '\n'
        i = 1
        for c in self.categories:
            output += str(i) + '. ' + c.name + '\n'
            i += 1
        output += str(i) + '. Exit'
        return output

my_store = Store("The Dugout",   [Category("Running", [Clothing('Shorts', 19.99, 'red', 12), Clothing('Socks', 8.99, 'white', 10)]), Category("Baseball", [Equipment('baseball bat', 299.99, 'unisex', 2.5), Equipment('baseball', 11.99, 'kids', 0.5)]), Category("Basketball")])


print(my_store)

selection = 0
while selection != len(my_store.categories)+1:
    selection = input("Select the number of a department ")
    try:
        selection = int(selection)
        if selection > 0 and selection < len(my_store.categories)+1:
            # print(f"You chose {my_store.categories[selection-1].name}.")
            print(f"You chose {my_store.categories[selection-1]}.")
        elif(selection > len(my_store.categories)+1):
            print("Please select a valid number")
    except ValueError:
        print('Please enter your choice as a number.')

print('Goodbye!')