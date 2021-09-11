import random

# from insertion.insertion import insertion_sort
from merge.merge import merge_sort


def create_random_int_array(length, min=0, max=100):
    test_case = []
    for _ in range(1, length):
        test_case.append(random.randint(min, max))
    return test_case


def create_test_cases(quantity):
    cases = []
    for _ in range(1, quantity):
        length = random.randint(1, 100)
        test_case = create_random_int_array(length)
        cases.append(test_case)
    return cases


def is_sorted_asc(arr):
    for i in range(0, len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
    return True


def test_sorting_method_inplace(algorithm, debug=True):
    fails = 0
    test_cases = create_test_cases(100)
    for case in test_cases:
        output = case[:]
        algorithm(output)
        if debug:
            print("Input:", case)
            print("Output:", output)
        if not is_sorted_asc(output):
            fails += 1

    if fails > 0:
        print("Fails:", fails)
    else:
        print("SUCCESS!")


if __name__ == "__main__":
    test_sorting_method_inplace(merge_sort, False)
