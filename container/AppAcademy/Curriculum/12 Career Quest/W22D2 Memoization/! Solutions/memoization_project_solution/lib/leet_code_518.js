function change(amt, coins, memo = {}) {
    if (amt === 0) return 1;
    if (coins.length === 0) return 0;

    let key = `${amt}-${coins.join(',')}`;
    if (key in memo) return memo[key];

    let coinVal = coins[coins.length - 1];

    let total = 0;
    for (let quanitity = 0; quanitity <= (amt / coinVal); quanitity++) {
        total += change(amt - (quanitity * coinVal), coins.slice(0, -1), memo);
    }

    memo[key] = total;
    return total;
}