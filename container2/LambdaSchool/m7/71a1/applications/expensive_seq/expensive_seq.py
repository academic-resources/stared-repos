
# In Python, a dict key can be any immutable type, including a tuple.

cache = {}


def check_cache(string):
    cache.get(string)

def expensive_seq(x, y, z):
    if x <= 0:

        return y + z

    if x > 0:
        # calc prev/nexts
        prevX1 = x - 1
        prevX2 = x - 2
        prevX3 = x - 3

        nextY1 = y + 1
        nextY2 = y + 2
        nextY3 = y + 3

        nextZ2 = z * 2
        nextZ3 = z * 3

        if str((prevX1, nextY1, z)) in cache:
            seq1out = cache.get(str((prevX1, nextY1, z)))
        else:
            seq1out = expensive_seq(prevX1, nextY1, z)
            cache.update({str((prevX1, nextY1, z)): seq1out})

        if str((prevX2, nextY2, nextZ2)) in cache:
            seq2out = cache.get(str((prevX2, nextY2, nextZ2)))
        else:
            seq2out = expensive_seq(prevX2, nextY2, nextZ2)
            cache.update({str((prevX2, nextY2, nextZ2)): seq2out})

        if str((prevX3, nextY3, nextZ3)) in cache:
            seq3out = cache.get(str((prevX3, nextY3, nextZ3)))
        else:
            seq3out = expensive_seq(prevX3, nextY3, nextZ3)
            cache.update({str((prevX3, nextY3, nextZ3)): seq3out})
            
        total_seq = seq1out + seq2out + seq3out

    return total_seq



if __name__ == "__main__":
    for i in range(10):
        x = expensive_seq(i*2, i*3, i*4)
        print(f"{i*2} {i*3} {i*4} = {x}")

    print(expensive_seq(150, 400, 800))
