/************************* Grid Traveler Tabulation *********************************
 *
 *  - Say that you are a traveler on a 2D grid.  You begin in the top-left corner and
 *      your goal is to travel to the bottom-right corner.  You may only move down
 *      or right
 *
 *
 *  - In how many ways can you travel to the goal on a grid with dimension m * n?
 *
 *
 *  - Write a function `gridTraveler(m, n)` that calculates this
 *
 *
 *************************************************************************************/


// 1. Create the function
const gridTraveler = (rows, columns) => {
    const table = Array(rows + 1).fill().map(() => Array(columns + 1).fill(0));
    table[1][1] = 1;
    console.log(table);
};



// 2. Create test cases
console.log(gridTraveler(3, 3));     // 6
console.log(gridTraveler(1, 1));     // 1
