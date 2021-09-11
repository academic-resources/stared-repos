// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

function minPathSum(grid) {
  const cells = new Array(grid.length)
    .fill('a')
    .map(a => new Array(grid[0].length).fill(Infinity))

  cells[0][0] = grid[0][0]

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      if (i === 0 && j === 0) continue
      // down to i,j
      const down = i > 0 ? cells[i - 1][j] + grid[i][j] : Infinity
      // right to i,j
      const right = j > 0 ? cells[i][j - 1] + grid[i][j] : Infinity
      cells[i][j] = Math.min(right, down)
    }
  }

  return cells[grid.length - 1][grid[0].length - 1]
}

console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]))
