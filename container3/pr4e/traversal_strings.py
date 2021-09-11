index = 0
fruit = raw_input('enter a fruit: ')

while index < len(fruit):
    letter = fruit[len(fruit) - index - 1]
    print letter
    index = index +1

index = 0

while index < len(fruit):
    letter = fruit[index]
    print letter
    index = index + 1


for char in fruit:
    print char
    


