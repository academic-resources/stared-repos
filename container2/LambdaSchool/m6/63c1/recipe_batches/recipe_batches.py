#!/usr/bin/python

import math

def recipe_batches(recipe, ingredients):
  pass
  arr_servings = []
  # compare each object1 key's value to each object2 key's value
  for key in recipe:
    key_check = ingredients.get(key)
    if key_check == None:
      arr_servings.append(0)      
    elif ingredients[key] >= recipe[key]:
      # else divide object2 key's value by object1 key's value
      current_servings = int(ingredients[key] / recipe[key])
      # store result in new array
      arr_servings.append(current_servings)
    # if object2 key's value < object1 key's value, return 0
    else:
      arr_servings.append(0)
  # return minimum number from new array
  max_servings = arr_servings[0]
  for serving in arr_servings:
    if serving < max_servings:
      max_servings = serving
  return max_servings

if __name__ == '__main__':
  # Change the entries of these dictionaries to test 
  # your implementation with different inputs
  recipe = { 'milk': 100, 'butter': 50, 'flour': 5 }
  ingredients = { 'milk': 132, 'butter': 48, 'flour': 51 }
  print("{batches} batches can be made from the available ingredients: {ingredients}.".format(batches=recipe_batches(recipe, ingredients), ingredients=ingredients))
