def productSum(arr, depth = 1):
  sum = 0
  for elem in arr:
    if type(elem) == list:
      sum += (depth+1) * productSum(elem, depth+1)
    else:
      sum += elem
  return sum
