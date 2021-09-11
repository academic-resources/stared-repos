###NPM INSTALL NUMERICAL

####USAGE

    num = require('numerical')
    num(Number);

    ten = 9.999999;

    ten.round() === 10
    ten.ceil() === 10
    ten.floor() === 9
    ten.add(1,2,3,4,5,6,7,8,9) === 54.999999
    ten.add(1,2,3,4,5,6,7,8,9).round() === 55
    ten.div(1.111111) === ten / 1.111111 === 9
    ten.dinto(20) === 20 / ten
    ten.multi(9,8,7,6,5,4,3,2,1) === 3628799.9637120003 // ten!
    ten.bang() ===  3628780 // rounds automatically
    ten.subzero() // [9,8,7,6,5,4,3,2,1]
    ten.sine() == Math.sin(ten)
    ten.pow(2) == Math.pow(ten, 2)
    ten.wop(2) == Math,pow(2, ten)
