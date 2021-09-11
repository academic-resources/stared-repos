"""Created by sgoswami on 8/9/17."""
"""Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation 
sequence from beginWord to endWord, such that:
Only one letter can be changed at a time.
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
For example,
Given:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5."""
import collections


class Solution(object):
    def ladderLength(self, beginWord, endWord, wordList):
        """
        :type beginWord: str
        :type endWord: str
        :type wordList: List[str]
        :rtype: int
        """
        queue = collections.deque()
        queue.appendleft(beginWord)
        queue.appendleft('#')
        count = 0
        visited = {}

        while len(queue) > 0:
            word = queue.pop()
            if word == '#':
                if len(queue) > 0:
                    queue.appendleft('#')
                    count += 1
            elif word == endWord:
                return count + 1
            else:
                successors = self.one_edit_distance_away(word, wordList, visited)
                for i, v in enumerate(successors):
                    queue.appendleft(v)
        return -1

    def one_edit_distance_away(self, word, array, visited):
        res = []
        for item in array:
            count = 0
            if item not in visited:
                for i in range(len(word)):
                    if item[i] != word[i]:
                        count += 1
                if count == 1:
                    res.append(item)
                    visited[item] = 1
        return res


if __name__ == '__main__':
    solution = Solution()
    print(solution.ladderLength('hit', 'cog', ["hot", "dot", "dog", "lot", "log", "cog"]))

