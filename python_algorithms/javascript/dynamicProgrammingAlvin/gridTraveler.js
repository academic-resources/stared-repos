// 2, 3
const gridTraveler = (rows, columns, memo = {}) => {
    const key = `${rows}, ${columns}`;

    if (key in memo) return memo[key];

    if (rows === 1 && columns == 1) return 1;
    if (rows === 0 || columns == 0) return 0;
    memo[key] = gridTraveler(rows - 1, columns, memo) + gridTraveler(rows, columns - 1, memo);
    return memo[key];
};

console.log(gridTraveler(1, 1));              // 1
console.log(gridTraveler(2, 3));              // 3
console.log(gridTraveler(3, 2));              // 3
console.log(gridTraveler(3, 3));              // 6
console.log(gridTraveler(18, 18));            // 2333606220
