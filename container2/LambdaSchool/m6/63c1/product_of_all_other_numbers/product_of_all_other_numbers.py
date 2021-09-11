from functools import reduce

'''
Input: a List of integers
Returns: a List of integers
'''


def prod(iterable):
    product = 1
    for x in iterable:
        product *= x
    return product

def product_of_all_other_numbers(arr):
    # for each item in the array
    # multiply rest of items together
    # store in new array
    arr_product = []
    if len(arr) == 2:
        arr.sort(reverse=True)
        return arr
    for x in range(0, len(arr)):
        arr_to_multiply = arr.copy()
        del arr_to_multiply[x]
        arr_product.append(prod(arr_to_multiply))
        arr_to_multiply.clear()
    return arr_product


if __name__ == '__main__':
    # Use the main function to test your implementation
    # arr = [1, 2, 3, 4, 5]
    arr = [2, 6, 9, 8, 2, 2, 9, 10, 7, 4, 7, 1, 9, 5, 9, 1, 8, 1, 8, 6, 2, 6, 4, 8, 9, 5, 4, 9, 10, 3, 9, 1, 9, 2, 6, 8, 5, 5, 4, 7, 7, 5, 8, 1, 6, 5, 1, 7, 7, 8]

    print(f"Output of product_of_all_other_numbers: {product_of_all_other_numbers(arr)}")
