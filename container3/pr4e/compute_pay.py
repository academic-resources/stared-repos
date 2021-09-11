
hours = raw_input('Enter hours: ')
rate = raw_input('Enter rate: ')

hours = float(hours)
rate = float(rate)


def compute_pay(hours, rate):
   
    if (hours <= 40):
        gross_pay = hours * rate
        print gross_pay
        return gross_pay

    else:
        normal_hours = 40 * rate
        overtime = (hours - 40.0) * rate * 1.5
        gross_pay = normal_hours + overtime
        print gross_pay
        return gross_pay

compute_pay(hours,rate)

    


