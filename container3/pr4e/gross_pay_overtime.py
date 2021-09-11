try:
    hours = raw_input("Enter Hours: ")
    h = float(hours)
    rate = raw_input("Enter Rate: ")
    r = float(rate)

except:
    print "Oops! That was not a valid number. Please try again..."
    exit()


def compute_pay(h, r):
    
    if h <= 40:
        gross_pay = h * r
        print gross_pay
    else:
        normal_hours = 40.0 * r
        overtime = (h - 40.0) * r * 1.5
        gross_pay = normal_hours + overtime
        print gross_pay

compute_pay(h,r)
