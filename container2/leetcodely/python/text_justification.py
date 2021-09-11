"""Created by sgoswami on 8/23/17."""
"""Given an array of words and a length L, format the text such that each line has exactly L characters and is 
fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. 
Pad extra spaces ' ' when necessary so that each line has exactly L characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not 
divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is inserted between words.

For example,
words: ["This", "is", "an", "example", "of", "text", "justification."]
L: 16.
"""

class Solution(object):
    def fullJustify(self, words, maxWidth):
        """
        :type words: List[str]
        :type maxWidth: int
        :rtype: List[str]
        """
        res = []
        curr_string = ''
        for word in words:
            curr_width = len(curr_string) + len(word) + len(' ')
            # the regular case we add the string and move on
            #if this is the end of the list, it will added outside the loop
            if curr_width < maxWidth:
                curr_string += word
                curr_string += ' '
            #this is the best case where justification is not needed at all
            elif curr_width == maxWidth:
                curr_string += word
                res.append(curr_string)
                curr_string = ''
            #adding the current word will exceed the maxWidth so we justify the curr_str add it to the res
            # and reinitialize it to the curr word
            else:
                res.append(curr_string)
                curr_string = word
                curr_string += ' '
        res.append(curr_string)
        return res

    def justify(self, s, size):
        diff = size - len(s)
        slist = s.split(' ')



if __name__ == '__main__':
    solution = Solution()
    print(solution.fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16))
