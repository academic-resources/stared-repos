# Some extra exercises for try, except and finally

try:
    x =1.0/0.0
except ZeroDivisionError:
    print "Got it! I'm awesome!"
finally:
    raise TypeError("Just kidding!")
