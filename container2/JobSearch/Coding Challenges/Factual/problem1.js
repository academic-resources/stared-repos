// Suppose we're analyzing black box data from long haul trucks. We get velocity readings from the on-board computer and we want to aggregate those readings to get a rough estimate of how much distance the truck covered over time.

// Write a function that takes a list of [timestamp, speed] pairs and returns how much distance was covered at a specific time.

// - timestamps are in seconds and monotonically increasing. The first timestamp is always 0
// - speed is in km/h. For simplicity, don't worry about interpolation and assume speed is a step function.
// - output distance in km

// Example velocity readings:
// Below we have a singular reading indicating at t = 0s the truck is moving at 90 km/h. Since there are no further sensor readings, we can assume the truck continues to move at a constant 90 km/h indefinitely.
// [
//   [0, 90]
// ]

// Here is a more complex example, at t = 0s the truck is going 90 km/h. At t = 60s, we get an updated reading showing the truck is now traveling at 98 km/h. Finally at t = 155s, a new reading comes in showing the truck is moving at 85.5 km/h.
// [
//   [0, 90],
//   [60, 98],
//   [155,85.5]
// ]


// Example pseudocode invocation:
// # Only reading is 90 km/h. At 600 seconds (10 minute mark) the truck has traveled 15km.
// distance_trucked([[0, 90]], 600)

// # The truck moves at 90 km/h for the first 300 seconds (5 minutes), then slows down to 80 km/h. At 600 seconds (10 minutes) the truck has traveled 14.17 km.
// distance_trucked([[0, 90], [300, 80]], 600)

// readings: list of [timestamp, speed] tuples.
//   timestamp is in seconds
//   speed is in km/h
// endTime: time at which truck speed is requested, in seconds

const solution = (readings, endTime) => {
  //speed = deltaDistance / deltaTime
  //deltaDistance = speed * deltaTime
  let totalDistance = 0
  for (let i = 1; i < readings.length; i++) {
      let speed = readings[i - 1][1]
      let time = (readings[i][0] - readings[i - 1][0]) / 3600
      let currDistance = speed * time
      totalDistance += currDistance
  }
  let lastSpeed = readings[readings.length - 1][1]
  let lastTime = (endTime - readings[readings.length - 1][0]) / 3600
  let lastDistance = lastSpeed * lastTime
  return totalDistance + lastDistance
};


console.log(solution([[0, 90], [300, 80]], 600))