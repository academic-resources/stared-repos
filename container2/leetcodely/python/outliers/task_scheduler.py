"""Given a sequence of task_ids and a cool off period between any two tasks of the same id, find the total time taken
to complete the given tasks in the order as specified in the input array.
Example:
    Input:
    Job Queue = [1, 1, 2, 1]
    Cool Off = 2
    Output:
    1, _, _, 1, 2, _, 1
    Answer: 7

    Input:
    Job Queue = [1, 1, 2, 3, 1]
    Cool Off = 2
    Output:
    1, _, _, 1, 2, 3
    Answer: 6

"""


class Solution:
    def taskScheduler(self, arr, period):
        curr_index = 0
        index_map = {}
        for i, v in enumerate(arr):
            if i == len(arr) - 1:
                curr_index += 1
            if v not in index_map:
                index_map[v] = curr_index
                curr_index += 1
            else:
                last_seen = index_map[v]
                if curr_index - last_seen < period:
                    curr_index = last_seen + period
                else:
                    curr_index += 1
                index_map[v] = curr_index + 1

        return curr_index


if __name__ == '__main__':
    solution = Solution()
    print(solution.taskScheduler([1, 1, 2, 1], 2))
