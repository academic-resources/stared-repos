import unittest
from python.ds.graph import Graph


class GraphTestMethods(unittest.TestCase):

    def test_repr(self):
        graph = Graph()
        graph.add_edge("A", "B")
        graph.add_edge("A", "C")
        graph.add_edge("C", "D")
        graph.add_edge("D", "E")
        # print(graph)
        self.assertEqual(len(graph), 5)


if __name__ == '__main__':
    unittest.main()
