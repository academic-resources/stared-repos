// View the full problem and run the test cases at:
//  https://leetcode.com/problems/course-schedule/

function canFinish(numCourses, prerequisites) {
  let prereq = buildGraph(prerequisites)
  let totalCourses = Object.keys(prereq).length
  let completed = new Set()

  let eligibleCourseExists = true

  while (eligibleCourseExists) {
    eligibleCourseExists = false //a la bubble sort

    for (let course in prereq) {
      let everyPrereqMet = prereq[course].every(pre => completed.has(pre)) //Boolean
      if (!completed.has(course) && everyPrereqMet) {
        completed.add(course)
        eligibleCourseExists = true
      }
    }
  }
  return completed.size === totalCourses
}

function buildGraph(list) {
  let graph = {}
  list.forEach(prerequisite => {
    let [ course, pre ] = prerequisite.map(String) //converts nums to string
    if (course in graph) {
      graph[course].push(pre)
    } else {
      graph[course] = [ pre ]
    }
    if (!(pre in graph)) graph[pre] = []
  })
  return graph
}

canFinish(2, [[1,0]])
canFinish(2, [[1,0], [0, 1]])

let graph = {
  'a': ['b', 'c'],
  'b': [],
  'c': [],
  'd': ['e'],
  'e': ['c'],
}

console.log(graph)

// Based on TOPOLOGICAL SORT
// Can only visit a node once its surrounding ndoes have been visited