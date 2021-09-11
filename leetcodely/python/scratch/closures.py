def enclosing():
    x = 'closed over'

    def local_func():
        print(x)

    return local_func


def raise_to(exp):
    def raise_to_exp(x):
        return pow(x, exp)

    return raise_to_exp


def escape_unicode(f):
    def wrap(args):
        x = f(args)
        return ascii(x)

    return wrap


square = raise_to(2)
print(square(4))

lf = enclosing()
lf()
print(lf.__closure__)
