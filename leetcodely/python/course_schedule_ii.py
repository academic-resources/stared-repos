"""Created by sgoswami on 9/3/17."""
"""There are a total of n courses you have to take, labeled from 0 to n - 1.

Some courses may have prerequisites, for example to take course 0 you have to first take course 1, 
which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to 
finish all courses.

There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, 
return an empty array.

For example:

2, [[1,0]]
There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course 
order is [0,1]

4, [[1,0],[2,0],[3,1],[3,2]]
There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 
1 and 2 should be taken after you finished course 0. So one correct course order is [0,1,2,3]. Another correct ordering is[0,2,1,3]."""


class Graph:
    def __init__(self):
        self.adj_list = {}

    def add(self, p, q):
        if p in self.adj_list:
            p_node = self.adj_list[p]
        else:
            p_node = Node(p)
            self.adj_list[p] = p_node
        if q in self.adj_list:
            q_node = self.adj_list[q]
        else:
            q_node = Node(q)
            self.adj_list[q] = q_node

        p_node.add(q_node)

    def get_all_vertices(self):
        return self.adj_list.items()


class Node:
    def __init__(self, val):
        self.val = val
        self.neighbors = []

    def add(self, item):
        self.neighbors.append(item)

    def get_neighbors(self):
        return self.neighbors


class Solution(object):
    def findOrder(self, prerequisites):
        """
        :type numCourses: int
        :type prerequisites: List[List[int]]
        :rtype: List[int]
        """
        graph = Graph()
        for item in prerequisites:
            graph.add(item[0], item[1])

        stack = []
        visited = set()
        for k, v in graph.get_all_vertices():
            if v in visited:
                continue
            else:
                self.top_sort_util(v, stack, visited)
        return [item.val for item in stack]

    def top_sort_util(self, vertex, stack, visited):
        visited.add(vertex)
        for v in vertex.get_neighbors():
            if v in visited:
                continue
            else:
                self.top_sort_util(v)
        stack.append(vertex)


solution = Solution()
print(solution.findOrder([[1, 0], [2, 0], [3, 1], [3, 2]]))
