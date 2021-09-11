"""
When the sequence is sorted and indexable we can use
binary search that runs in O(log n) time, whereas sequential
search runs in O(n) time.
"""

def binary_search(data, target, low, high):
  """
  Return True if target is found in indicated portion of a Python list.
  """
  
  if low > high:
    return False
  else:
    mid = (low + high) / 2
    if target == data[mid]:
      return True
    elif target < data[mid]:
      # recur on the portion left of the middle
      return binary_search(data, target, low, mid - 1)
    else:
      # recur on the portion right of the middle
      return binary_search(data, target, mid + 1, high)
