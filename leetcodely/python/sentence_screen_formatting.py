"""Given a rows x cols screen and a sentence represented by a list of non-empty words, find how many times the given sentence can be fitted on the screen.
Note:

    A word cannot be split into two lines.
    The order of words in the sentence must remain unchanged.
    Two consecutive words in a line must be separated by a single space.
    Total words in the sentence won't exceed 100.
    Length of each word is greater than 0 and won't exceed 10.
    1 ≤ rows, cols ≤ 20,000.
"""
#TODO: Debug edge cases

class Solution:
    def wordsTyping(self, sentence, rows, cols):
        """
        :type sentence: List[str]
        :type rows: int
        :type cols: int
        :rtype: int
        """
        count, curr, trigger = 0, 0, True
        while rows > 0:
            for word in sentence:
                if curr + len(word) < cols:
                    curr += len(word)
                    curr += 1
                elif curr + len(word) > cols:
                    if rows > 0:
                        rows -= 1
                        curr = len(word)
                        curr += 1
                    else:
                        rows -= 1
                        trigger = False
                        break
                else:
                    curr += len(word)
                    rows -= 1
                    curr = 0
            if trigger:
                count += 1
        return count


if __name__ == '__main__':
    solution = Solution()
    print(solution.wordsTyping(["f","p","a"], 8, 7))
