from itertools import permutations

a="rohan"

perm =permutations(a)

for i in list(perm):
    print(''.join(i))

