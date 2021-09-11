def sieve(x):
    print('haha x ' + str(x))
    possiblePrimes = [True for i in range(x + 1)]
    y = 2
    while (y * y <= x):

        if (possiblePrimes[y] == True):

            for i in range(y * 2, x + 1, y):
                possiblePrimes[i] = False
        y += 1

    possiblePrimes[0] = False
    possiblePrimes[1] = False
    print('Following are the prime numbers smaller than or equal to', x)
    for y in range(x + 1):
        if possiblePrimes[y]:
            print(y,)

sieve(30)
