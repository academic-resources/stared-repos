# def getChange(M, P):
#     denominations = [1.0, 0.50, 0.25, 0.10, 0.05, 0.01]
#     balance = M - P
#     result = [0, 0, 0, 0, 0, 0]
#     for i in range(len(denominations)):
#         while balance >= denominations[i]:
#             balance = round(balance - denominations[i], 2)
#             result[i] += 1
#     return list(reversed(result))
#
# print(getChange(5, 0.99))


def findWord(arr):
    check = {}
    for a in arr:
        t = a.split('>')
        check[t[0]] = t[1]
    start = None
    for k, v in check.items():
        count = 0
        curr = v
        while True:
            if curr:
                curr = check.get(curr)
                count += 1
            else:
                break
        if count == len(check):
            start = k
            break
    result = []
    curr = k
    while True:
        if curr:
            result.append(curr)
            curr = check.get(curr)
        else:
            break
    return result

print(findWord(["I>N", "A>I", "P>A", "S>P"]))
print(findWord(["P>E","E>R","R>U"]))
print(findWord(["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"]))
