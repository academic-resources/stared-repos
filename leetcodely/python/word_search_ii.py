"""
Given a 2D board and a list of words from the dictionary, find all words in the board.
Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those
horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
"""
from collections import defaultdict


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def add(self, item):
        curr = self.root
        for c in item:
            node = curr.children.get(c)
            if not node:
                node = TrieNode()
                curr.children[c] = node
            curr = node
        curr.end_of_word = True

    def search(self, prefix):
        curr = self.root
        for c in prefix:
            node = curr.children.get(c)
            if not node:
                node = TrieNode()
                curr.children[c] = node
            curr = node
        return curr.end_of_word


class TrieNode:
    def __init__(self):
        self.children = defaultdict(TrieNode)
        self.end_of_word = False


class Solution(object):
    def findWords(self, board, words):
        """
        :type board: List[List[str]]
        :type words: List[str]
        :rtype: List[str]
        """
        begins_with = set(w[:1] for w in words)
        trie = Trie()
        res = []
        for word in words:
            trie.add(word)
        for i in range(len(board)):
            for j in range(len(board[i])):
                visited = [[0 for _ in range(len(board[0]))] for _ in range(len(board))]
                if board[i][j] in begins_with:
                    self.dfs(i, j, trie, board, visited, res)
        return res

    def dfs(self, row, col, trie, board, visited, res):
        visited[row][col] = 1
