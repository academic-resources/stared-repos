// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

function minPathSum(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let table = new Array(m).fill().map(() => new Array(n).fill(Infinity));
    table[0][0] = grid[0][0];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i < m - 1) {
                table[i + 1][j] = Math.min(table[i][j] + grid[i + 1][j], table[i + 1][j]);
            }
            if (j < n - 1) {
                table[i][j + 1] = Math.min(table[i][j] + grid[i][j + 1], table[i][j + 1]);
            }
        }
    }

    return table[m - 1][n - 1];
}