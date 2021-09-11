# Input: List(set(1,2,3), set(4,5,6), set(7,8), set(8,2))
# ouput: List(set(1,2,3,7,8), set(4,5,6))


def find_duplicate_users(arr: list) -> list:
    result = [arr[0]]
    trigger = len(arr)

    while True:
        arr = result[:]
        if len(arr) != trigger:
            trigger = len(arr)
        else:
            break
        result = [arr[0]]
        for i in range(1, len(arr)):
            for k in result:
                for j in (arr[i]):
                    if j in k:
                        k.add(arr[i])
                        break
            result.append(i)
    return arr


result = [(1, 2, 3), (4, 5, 6), (7, 8, 2)]