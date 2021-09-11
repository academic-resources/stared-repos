"""
find all a, b, c, d in q such that
f(a) + f(b) = f(c) - f(d)
"""

#q = set(range(1, 10))
#q = set(range(1, 200))
q = (1, 3, 4, 7, 12)


def f(x):
    return x * 4 + 6

def sum_diff(q):
    # for any combination of q:
    # If you choose 4 numbers from q, call them a, b, c, and d:
    for a in q:
        for b in q:
            for c in q:
                for d in q:
                    fa = f(a)
                    fb = f(b)
                    fc = f(c)
                    fd = f(d)
                    # show all a, b, c, d for which this is true:
                        # f(a) + f(b) = f(c) - f(d)
                    if fa + fb == fc - fd:
                        # print f(1) + f(1) = f(12) - f(7)    10 + 10 = 54 - 34
                        # The left column shows the a-d inputs to f(x).
                        # The right column shows the result from the what f(x) returns for each of those.
                        print(f"f({a}) + f({b}) = f({c}) - f({d})    {fa} + {fb} = {fc} - {fd}")

sum_diff((1, 3, 4, 7, 12))
