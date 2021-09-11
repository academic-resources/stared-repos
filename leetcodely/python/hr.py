from math import sqrt


def isPrime(n):
    if n <= 1:
        return 0
    for x in range(2, sqrt(n)):
        if not n % x == 0:
            return x
        else:
            return 0


def maxDifference(arr):
    max_diff = -1
    max_right = arr[len(arr) - 1]

    for i in range(len(arr) - 2, -1, -1):
        if arr[i] > max_right:
            max_right = arr[i]
        else:
            diff = max_right - arr[i]
            if diff > max_diff:
                max_diff = diff
    return max_diff


def schedule(tasks, cooldown):
    res = [tasks[0]]
    for i in range(1, len(tasks)):
        j, k = 0, i+1
        while j < cooldown and k < len(tasks):
            if tasks[k] != tasks[i]:
                res.append(tasks[k])
            else:
                res.append('.')
            k += 1
            j += 1
    return ''.join(res)


if __name__ == '__main__':
    print(schedule('aba', 2))
    print(schedule('abca', 2))
    print(schedule('aabb', 2))
    print(schedule('acbab', 2))







