'''
If we assume the shadow of a building is of the same height as the building(ignoring the angle of the sun) calculate
the total area under shadow of overlapping buildings.

Example:
Input: An array of building objects
Output: Calculate the total area under the shadow
'''

import heapq


def compute_area_of_shadow(buildings: list) -> int:
    # Approach
    # Let's define a keypoint as the cartesian co-ordinates of every point where a horizontal outline of starts
    # Step 1: Identify the keypoints as a list of tuples
    # Calculate the area of the polygon defined by the keypoints
    return _find_area_of_polygon_defined_by_keypoints(_find_key_points(buildings))


def _find_key_points(buildings):
    keypoints = []
    deleted_items = {}
    for building in buildings:
        keypoints.append([building[0], -building[2]])
        keypoints.append([building[1], building[2]])
    keypoints.sort(key=lambda x: (x[0], x[1]))

    max_value = 0
    heap = []
    heapq.heappush(heap, max_value)
    res = []
    for point in keypoints:
        if point[1] < 0:
            heapq.heappush(heap, point[1])
            if -point[1] > max_value:
                max_value = -point[1]
                res.append([point[0], max_value])
        else:
            tmp = -point[1]
            if tmp == heap[0]:
                heapq.heappop(heap)
                while heap[0] in deleted_items:
                    value = heap[0]
                    heapq.heappop(heap)
                    deleted_items[value] -= 1
                    if deleted_items[value] == 0:
                        del deleted_items[value]
                if -heap[0] < max_value:
                    max_value = -heap[0]
                    res.append([point[0], max_value])
            else:
                deleted_items[tmp] = deleted_items.get(tmp, 0) + 1
    return res


def _find_area_of_polygon_defined_by_keypoints(keypoints):
    total = 0
    for i in range(1, len(keypoints)):
        prev, curr = keypoints[i-1], keypoints[i]
        x = curr[0] - prev[0]
        y = prev[1]
        area = x * y
        total += area
    return total


import unittest


class TestComputeShadow(unittest.TestCase):
    def test_case(self,):
        buildings = [[1, 6, 7], [2, 4, 8], [3, 9, 8]]
        self.assertEqual(compute_area_of_shadow(buildings), 63)


if __name__ == '__main__':
    unittest.main()
