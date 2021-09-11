intersection_array = []
cache = {}

def arrays_length_two(arrays, intersection_array):
    if len(arrays[1]) <= 5 and len(arrays[0]) <= 5:
        for y in arrays[1]:
            for x in arrays[0]:
                if x == y:
                    if x not in intersection_array:
                        intersection_array.append(x)
    else:
        arrays[1].sort()
        arrays[0].sort()
        min_a1 = min(arrays[1])
        max_a1 = max(arrays[1])
        min_a2 = min(arrays[0])
        max_a2 = max(arrays[0])
        index_min_a1 = arrays[1].index(min_a1)
        index_min_a2 = arrays[0].index(min_a2)
        max_y_to_check = int(index_min_a1 + 3)
        max_x_to_check = int(index_min_a2 + 3)
        print(max_y_to_check)
        print(max_x_to_check)
        for y in arrays[1][:max_y_to_check]:
            for x in arrays[0][:max_x_to_check]:
                if x == y:
                    if x not in intersection_array:
                        intersection_array.append(x)
        print(intersection_array)
    return arrays, intersection_array

def arrays_length_three(arrays, x, intersection_array):
    if len(intersection_array) > 0:
        intersection_list = list(intersection_array)
        intersection_list.sort()
        last_array_item = max(intersection_list)
    if x != None:
        x.sort()
        min_a = min(x)
        max_a = max(x)
        # get smallest max of each array
        # 
        max_x_to_check = int(min_a + 4)
        for single_intersection_item in intersection_array:
            '''
            for y in x:
                if y <= last_array_item:
                    if y not in x:
            '''
            if single_intersection_item not in x[:max_x_to_check]:
                intersection_array.remove(single_intersection_item)
        arrays.remove(x)
    return arrays, x, intersection_array

def intersection(arrays):
    global intersection_array
    # original_arrays = arrays.copy()
    # if str(arrays) in cache.items():
        # return cache[str(arrays)]
    # double nested loops to compare first two arrays
    if len(arrays) < 2:
        return None
    elif len(arrays) == 2:
        arrays_length_two(arrays, intersection_array)
        # cache.update({str(original_arrays): intersection_array})
        return intersection_array
    # in remaining arrays only check for same between first two
    elif len(arrays) > 2:
        arrays_length_two(arrays, intersection_array)
        arrays.remove(arrays[1])
        arrays.remove(arrays[0])
        # dwindle down search with each remaining array
        for x in arrays:
            x.sort()
            arrays_length_three(arrays, x, intersection_array)
        # return result
        # cache.update({str(original_arrays): intersection_array})
        return intersection_array

if __name__ == "__main__":
    arrays = []

    arrays.append(list(range(1000000, 2000000)) + [1, 2, 3])
    arrays.append(list(range(2000000, 3000000)) + [1, 2, 3])
    arrays.append(list(range(3000000, 4000000)) + [1, 2, 3])

    print(intersection(arrays))
