// Suppose we are trying to oranize a meeting between a list of clients in New York. Each client exists at a location (Xclient, Yclient), where Xclient and Yclient are integers. The clients can only travel along X or Y at a given time (not diagonally). The goal here is to choose a meeting location such that the total distance traveled by clients is minimized. Find this minimum total distance.

// Example 1:
// [[1, 0], [1, 1]]
// Distance: 1

// Example 2:
// [[-4, 3], [-2, 1], [1, 0], [3, 2]]
// Distance: 14


const solution = (clients) => {
let avgX = 0
let avgY = 0
for (let i = 0; i < clients.length; i++) avgX += clients[i][0]
for (let i = 0; i < clients.length; i++) avgY += clients[i][1]
avgX /= clients.length
avgY /= clients.length

let avgCenter = [avgX, avgY]
let bestLocus = clients[0]
let bestDistance = displacement(bestLocus, avgCenter)

for (let i = 1; i < clients.length; i++) {
  let currDistance = displacement(clients[i], avgCenter)
  if (bestDistance > currDistance) {
    bestDistance = currDistance
    bestLocus = clients[i]
  }
}

return clients.reduce((sum, dist) => sum + distance(dist, bestLocus), 0)
};

const displacement = (pos1, pos2) => {
  return ((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)**.5
}
const distance = (pos1, pos2) => {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
}



console.log(solution([[1, 0], [1, 1]]))
console.log(solution([[-4, 3], [-2, 1], [1, 0], [3, 2]]))