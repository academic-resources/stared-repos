"""Suppose we abstract our file system by a string in the following manner:
The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:
dir
    subdir1
    subdir2
        file.ext
The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.
The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:
dir
    subdir1
        file1.ext
        subsubdir1
    subdir2
        subsubdir2
            file2.ext
The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty
second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a
file file2.ext.

We are interested in finding the longest (number of characters) absolute path to a file within our file system.
For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its
length is 32 (not including the double quotes).
Given a string representing the file system in the above format, return the length of the longest absolute path to file
in the abstracted file system. If there is no file in the system, return 0."""

import collections


class Solution(object):
    def lengthLongestPath(self, input):
        """
        :type input: str
        :rtype: int
        """
        max_len = 0
        curr_len = 0
        if not input or len(input) == 0:
            return 0
        stack = collections.deque()
        input_list = input.split('\n')

        for item in input_list:
            level = item.count('\t')
            while len(stack) > level:
                curr_len -= stack.pop()

            stack.append(len(item.strip('\t')) + 1)
            curr_len += stack[-1]
            if '.' in item:
                max_len = max(max_len, curr_len - 1)
        return max_len


if __name__ == '__main__':
    solution = Solution()
    print(solution.lengthLongestPath("dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"))

            

