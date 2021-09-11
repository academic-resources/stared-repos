class Membership {
    strategy = undefined

    SetStrategy(strategy) { this.strategy = strategy }
    GetPrice() { return this.strategy.GetPrice() }
}

class Strategy {
    GetPrice() {}
}

class BasicStrategy extends Strategy {
    GetPrice() { return '$99' }
}

class VipStrategy extends Strategy {
    GetPrice() { return `$${Math.random() * 99 + 99}` }
}


function demoClient() {
    const membership = new Membership()
    const basic = new BasicStrategy()
    const vip = new VipStrategy()

    membership.SetStrategy(basic)
    console.log(membership.GetPrice())

    membership.SetStrategy(vip)
    console.log(membership.GetPrice())
}

demoClient()
