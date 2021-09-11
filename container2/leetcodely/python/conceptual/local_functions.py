def sort_by_last_letter(s):
    return sorted(s, key=lambda p: p[-1])


def _sort_by_last_letter(s):
    def last_letter(p):
        return p[-1]

    return sorted(s, key=last_letter)


def outer():
    x = 3

    def inner(y):
        return x + y

    return inner


# function factory


def raise_to(exp):
    def raise_to_exp(x):
        return pow(x, exp)

    return raise_to_exp


if __name__ == '__main__':
    print(sort_by_last_letter(['My', 'name', 'is', 'soumasish', 'goswami']))
    print(_sort_by_last_letter(['My', 'name', 'is', 'soumasish', 'goswami']))
    i = outer()
    print(i(4))
    square = raise_to(2)
    print(square(5))
    print(square.__closure__)
