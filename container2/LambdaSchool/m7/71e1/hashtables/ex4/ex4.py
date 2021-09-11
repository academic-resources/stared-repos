cache = {}


def has_negatives(a):
    if a[0] > 0:
        result = []
        return result
    else:
        if a == []:
            return []
        else:
            a = list(a)
            if str(a) in cache.items():
                return cache.get(str(a))
            a = sorted(a)
            d = []
            midpoint = int(len(a) / 2)
            new_check = a[midpoint]
            while new_check:
                if new_check > 0:
                    midpoint = int(midpoint / 2)
                    new_check = a[midpoint]
                elif new_check < 0:
                    for x in range(midpoint, len(a)):
                        if a[x] >= 0:
                            midpoint = x - 1
                            break
                    break
                else:
                    break
            b = a[midpoint+1:]
            c = a[:midpoint+1]
            for x in b:
                for y in c:
                    w = x*-1
                    if w == y:
                        d.append(x)
            if str(a) not in cache.items():
                cache.update({str(a): d})
            return d


if __name__ == "__main__":
    print(has_negatives([-1, -2, 1, 2, 3, 4, -4]))
