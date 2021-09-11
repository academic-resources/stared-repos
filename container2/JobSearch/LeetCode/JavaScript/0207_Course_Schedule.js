// There are a total of n courses you have to take, labeled from 0 to n-1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

// Example 1:

// Input: 2, [[1,0]] 
// Output: true
// Explanation: There are a total of 2 courses to take. 
//              To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: 2, [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take. 
//              To take course 1 you should have finished course 0, and to take course 0 you should
//              also have finished course 1. So it is impossible.
// Note:

// The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
// You may assume that there are no duplicate edges in the input prerequisites.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */


// aA solution
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

console.log(canFinish(2, [[1,0]]))                // => true
console.log(canFinish(2, [[1,0],[0,1]]))          // => false
console.log(canFinish(5, [[0,1],[1,2],[2,0]]))    // => false
console.log(canFinish(5, [[0,1],[1,2],[2,3]]))    // => true


function canFinishTopological(numCourses, prerequisites) {
  let goMap = [];
  let inMap = [];
  
	prerequisites.forEach((pair) => {
    goMap[pair[0]] ? goMap[pair[0]]++ : goMap[pair[0]] = 1
    inMap[pair[1]] ? inMap[pair[1]]++ : inMap[pair[1]] = 1
	});
	while (prerequisites.length > 0) {
		let removed = false;
		for (let i = 0; i < prerequisites.length; i++) {
			let pair = prerequisites.shift();
			if (!inMap[pair[0]]) {
				goMap[pair[0]]--;
				inMap[pair[1]]--;
				removed = true;
			} else {
				prerequisites.push(pair);
			}
		}

		if (!removed) break;
	}

	return prerequisites.length == 0;
}

console.log("====================")
// console.log(canFinishTopological(2, [[1,0]]))                      // => true
// console.log(canFinishTopological(2, [[1,0],[0,1]]))                // => false
// console.log(canFinishTopological(3, [[0,1],[1,2],[2,0]]))          // => false
// console.log(canFinishTopological(4, [[0,1],[1,2],[2,3]]))          // => true
// console.log(canFinishTopological(4, [[0,1],[0,2],[3,0]]))          // => true
// console.log(canFinishTopological(4, [[0,1],[3,0],[0,2]]))          // => true
console.log(canFinishTopological(4, [[0,1],[0,2],[3,0],[3,2]]))    // => true
// console.log(canFinishTopological(4, [[1,0],[2,0],[0,3],[2,3]]))    // => true


var canFinishBFS = function(numCourses, prerequisites) {
    if (!prerequisites.length || !prerequisites[0].length) return true;
    
    let indegrees = new Array(numCourses).fill(0) // 0 -> n-1
    let graph = new Map(); //HashMap<Integer, int[]>
    let queue = [];
    
    for (let i = 0; i < prerequisites.length; i++) {
        indegrees[prerequisites[i][0]]++
        let key = prerequisites[i][1]
        if(graph.has(key)) {                
            graph.set(key, graph.get(key).concat(prerequisites[i][0]))
        } else {
            graph.set(key, [prerequisites[i][0]])
        }
    }
    
    // track indexes with queue
    indegrees.forEach((indegree, index) => {
        if (indegree === 0) queue.push(index)
    })
    
    while (queue.length) {
        let cur = queue.shift()
        let courses = graph.get(cur)
        for (let i = 0; courses && i < courses.length; i++) { 
            if (--indegrees[courses[i]] === 0) queue.push(courses[i])
        }
    }

    return indegrees.every(el => el === 0)
  
};


console.log("====================")
console.log(canFinishBFS(2, [[1,0]]))                      // => true
console.log(canFinishBFS(2, [[1,0],[0,1]]))                // => false
console.log(canFinishBFS(3, [[0,1],[1,2],[2,0]]))          // => false
console.log(canFinishBFS(4, [[0,1],[1,2],[2,3]]))          // => true
console.log(canFinishBFS(4, [[0,1],[0,2],[3,0]]))          // => true
console.log(canFinishBFS(4, [[0,1],[3,0],[0,2]]))          // => true
console.log(canFinishBFS(4, [[0,1],[0,2],[3,0],[3,2]]))    // => true
console.log(canFinishBFS(4, [[1,0],[2,0],[0,3],[2,3]]))    // => true
