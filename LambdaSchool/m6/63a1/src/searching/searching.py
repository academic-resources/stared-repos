def linear_search(arr, target):
   '''
      procedure linear_search (arr, target)
         for each item in arr:
            if match item == target:
               return the item's location
      end procedure
   '''
   for item in range(len(arr)):
      if arr[item] == target:
         return item
   return -1   # not found

# Write an iterative implementation of Binary Search
def binary_search(arr, target):
      # arr ← sorted array
      # arrLength ← size of array
      # target ← value to be searched
      arrLength = len(arr)
      lowerBound = 1
      upperBound = arrLength
      while True:
         if upperBound < lowerBound:
            return -1
         midPoint = int(lowerBound + (upperBound - lowerBound) / 2)
         if arr[midPoint] < target:
            lowerBound = midPoint + 1
         if arr[midPoint] > target:
            upperBound = midPoint - 1
         if arr[midPoint] == target:
            return midPoint

      '''
      Procedure binary_search
         # arr ← sorted array
         # arrLength ← size of array
         # target ← value to be searched

         Set lowerBound = 1
         Set upperBound = arrLength

         while True:
            if upperBound < lowerBound: 
               return -1
            set midPoint = lowerBound + ( upperBound - lowerBound ) / 2      
            if arr[midPoint] < target:
               set lowerBound = midPoint + 1         
            if arr[midPoint] > target:
               set upperBound = midPoint - 1
            if arr[midPoint] = target:
               return arr
      end procedure
      '''

      return -1  # not found
