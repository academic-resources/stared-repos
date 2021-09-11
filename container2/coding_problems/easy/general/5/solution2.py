from functools import reduce

def productSum(arr, depth = 1):
  def handle(sum, el):
    if type(el) == list:
      return sum + (depth+1) * productSum(el, depth+1)
    else:
      return sum + el
  return reduce(handle, arr, 0)