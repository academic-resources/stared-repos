def shuffle(nums, n):
    i = 1
    temp = []
    temp_new = []
    while i <= 2 * n:
        if i % 2 == 1:
            if i == 1:
                temp.append(i)
            else:
                temp.append(i - int(i / 2))
        else:
            temp.append(int(n + (i / 2)))
        i += 1
    for i in temp:
        temp_new.append(nums[i - 1])

    return temp_new


nums = [2, 5, 1, 3, 4, 7]
n = 3

shuffle(nums, n)
