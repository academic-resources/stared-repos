class Solution:
    def __init__(self):
        self.neighbors = [(-1, -1), (0, -1), (1, -1), (-1, 0), (1, 0), (-1, 1), (0, 1), (1, 1)]

    def find_all_words(self, board, word_set):
        result = []
        for i in range(len(board)):
            for j in range(len(board[i])):
                result += self.helper(board, word_set, board[i][j], i, j, set([(i, j)]))
        return set(result)

    def helper(self, board, word_set, current, row, col, visited):
        found = []
        if current in word_set:
            found.append(current)
            for di, dj in self.neighbors:
                ni, nj = row + di, col + dj
                if self.valid(board, ni, nj) and (ni, nj) not in visited:
                    visited.add(ni, nj)
                    found.extend(self.helper(board, word_set, current + board[ni][nj], ni, nj, visited))
                    visited.remove(ni, nj)
            return list(set(found))

    def valid(self, board, row, col):
        return 0 <= row < len(board) and 0 <= col < len(board[row])


if __name__ == '__main__':
    solution = Solution()
    print(solution.find_all_words([['a', 'p', 'p'], ['b', 'a', 'l'], ['d', 't', 'e']],
                                  set(['apple', 'balet', 'app', 'pat', 'pet', 'let', 'lap'])))
