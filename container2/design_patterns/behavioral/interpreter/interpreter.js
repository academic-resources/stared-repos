const Context = function (input) {
    this.input = input
    this.output = 0
}

Context.prototype = {
    startsWith: function (str) {
        return this.input.substr(0, str.length) === str
    }
}

const Expression = function (name, one, four, five, nine, multiplier) {
    this.name = name
    this.one = one
    this.four = four
    this.five = five
    this.nine = nine
    this.multiplier = multiplier
}

Expression.prototype = {
    interpret: function (context) {
        console.log('Output so far: ', context.output)
        console.log('Processing expression:', this.name, 'for input', context.input)
        if (context.input.length == 0) return
    
        if (context.startsWith(this.nine)) {
            context.output += (9 * this.multiplier)
            context.input = context.input.substr(this.nine.length)
        }
        if (context.startsWith(this.five)) {
            context.output += (5 * this.multiplier)
            context.input = context.input.substr(this.five.length)
        }
        if (context.startsWith(this.four)) {
            context.output += (4 * this.multiplier)
            context.input = context.input.substr(this.four.length)
        }
        while (context.startsWith(this.one)) {
            context.output += (1 * this.multiplier)
            context.input = context.input.substr(this.one.length)
        }
    }
}

function demoClient() {
    const roman = "MCMXXVIII"
    const context = new Context(roman)
    const tree = []

    tree.push(new Expression("thousand", "M", " " , " ", " " , 1000));
    tree.push(new Expression("hundred",  "C", "CD", "D", "CM", 100));
    tree.push(new Expression("ten",      "X", "XL", "L", "XC", 10));
    tree.push(new Expression("one",      "I", "IV", "V", "IX", 1));

    for (let i = 0; i < tree.length; i++) tree[i].interpret(context)

    console.log('Roman interpreted:', context.output)
}

demoClient()
