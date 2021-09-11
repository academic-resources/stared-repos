// Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.

// Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.

// Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

// Note:

// The order of returned grid coordinates does not matter.
// Both m and n are less than 150.
 

// Example:

// Given the following 5x5 matrix:

//   Pacific ~   ~   ~   ~   ~ 
//        ~  1   2   2   3  (5) *
//        ~  3   2   3  (4) (4) *
//        ~  2   4  (5)  3   1  *
//        ~ (6) (7)  1   4   5  *
//        ~ (5)  1   1   2   4  *
//           *   *   *   *   * Atlantic

// Return:

// [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function(matrix) {
  let result = []
  for (let row in matrix) {
    for (let col in matrix) {
      let point = [Number(row), Number(col)]
      if (reachesPacific(point, matrix) && reachesAtlantic(point, matrix)) {
        result.push(point)
      }
    }
  }
  return result
};

function reachesPacific(start, matrix) {
  // return true
  const DIRS = [[0,1],[0,-1][1,0],[-1,0]]
  
  let pacificApproach = []
  let queue = []
  
}

function reachesAtlantic(start, matrix) {
  return true
}


console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]))

const pacificAtlanticBFS = (matrix) => {
  if (!matrix.length) return []
  const DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]]
  const res = [], queue = []
  
  ;[1, 0].forEach(p => {
      for (let r = [matrix.length - 1, 0][p], c = 0; c < matrix[0].length; c++) {
          addSquare(matrix, -1, -1, r, c, queue, res, !!p)
      }
      for (let r = p, c = [matrix[0].length - 1, 0][p]; r < matrix.length - !p; r++) {
          addSquare(matrix, -1, -1, r, c, queue, res, !!p)
      }
      
      while (queue.length) {
          const s = queue.shift()
          DIRS.map(d => addSquare(matrix, s[0], s[1], s[0] + d[0], s[1] + d[1], queue, res, !!p))
      }
  })
  
  return res
};

const addSquare = (matrix, or, oc, r, c, queue, res, isPacific) => {
  if (or < 0 || matrix[r] && (
      isPacific  && canFlowPacific(matrix[or][oc], matrix[r][c])
   || !isPacific && canFlowAtlantic(matrix[or][oc], matrix[r][c])
  )) {
      if (!isPacific && matrix[r][c] < 0) res.push([r, c])
      matrix[r][c] = isPacific ? -matrix[r][c] - 1 : '' + matrix[r][c]  // mark visited
      queue.push([r, c])
  }
};

const canFlowPacific = (o, n) => n >= 0 && n >= abs(o);

const canFlowAtlantic = (o, n) => typeof n === 'number' && abs(n) >= abs(o);

const abs = (val) => val >= 0 ? parseInt(val) : -(parseInt(val) + 1);  // 0 => -1, 1 => -2, etc.

console.log("===============")
console.log(pacificAtlanticBFS([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]))