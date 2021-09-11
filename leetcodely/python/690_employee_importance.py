"""
You are given a data structure of employee information, which includes the employee's unique id, his importance value
and his direct subordinates' id.
For example, employee 1 is the leader of employee 2, and employee 2 is the leader of employee 3.
They have importance value 15, 10 and 5, respectively. Then employee 1 has a data structure like [1, 15, [2]], and
employee 2 has [2, 10, [3]], and employee 3 has [3, 5, []].
Note that although employee 3 is also a subordinate of employee 1, the relationship is not direct.
Now given the employee information of a company, and an employee id, you need to return the total importance value of
this employee and all his subordinates.
"""
# Employee info
from collections import deque


class Employee:
    def __init__(self, id, importance, subordinates):
        # It's the unique id of each node.
        # unique id of this employee
        self.id = id
        # the importance value of this employee
        self.importance = importance
        # the id of direct subordinates
        self.subordinates = subordinates


class Solution:
    def getImportance(self, employees, id):
        """
        :type employees: Employee
        :type id: int
        :rtype: int
        """
        employee_roll = {e.id: e for e in employees}
        total = 0
        visited = set()
        queue = deque()
        queue.appendleft(employee_roll[id])
        while len(queue) > 0:
            employee = queue.pop()
            total += employee.importance
            visited.add(employee.id)
            for item in employee.subordinates:
                if item not in visited:
                    queue.appendleft(employee_roll[item])
        return total


if __name__ == '__main__':
    solution = Solution()
    employee_list = [[1, 5, [2, 3]], [2, 3, [4]], [3, 4, []], [4, 1, []]]
    employees = [Employee(e[0], e[1], e[2]) for e in employee_list]
    print(solution.getImportance(employees, 1))
