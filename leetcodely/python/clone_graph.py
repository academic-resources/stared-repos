"""Clone an undirected graph. Each node in the graph contains a label and a list of its neighbors.
"""
from collections import deque


# Definition for a undirected graph node
class UndirectedGraphNode:
    def __init__(self, x):
        self.label = x
        self.neighbors = []


class Solution:
    # @param node, a undirected graph node
    # @return a undirected graph node
    def cloneGraph(self, node):
        if not node:
            return None
        p = UndirectedGraphNode(node.label)
        visited = {node.lable: p}
        queue = deque()
        queue.appendleft(node)
        while len(queue) > 0:
            curr = queue.pop()
            for neighbor in curr.neighbors:
                if neighbor.label not in visited:
                    visited[neighbor.label] = UndirectedGraphNode(neighbor.label)
                    queue.appendleft(neighbor)
                visited[curr.label].neighbors.append(visited[neighbor.label])
        return p
