'''
Your function should take in a single parameter (a string `word`)
Your function should return a count of how many occurences of ***"th"*** occur within `word`. Case matters.
Your function must utilize recursion. It cannot contain any loops.
'''
def count_th(word):
    # recursive function
    def count_recur(word, current):
        # count starts at zero 
        th_count = 0
        # account for empty string 
        if len(word) - 1 <= current:
            return 0
        # if current + next are th, add to count 
        if word[current] + word[current + 1] == 'th':
            th_count += 1
        # cycle through word 
        return count_recur(word, current + 1) + th_count
    # start recursion
    return count_recur(word, 0)

'''
Inside the `recursive_count_th` directory you'll find the `count_th.py` file. In this file, please add your recursive implementation to the `count_th()` method following these rules:

- [] Your function should take in a single parameter(a string `word`)
- [] Your function should return a count of how many occurences of ** *"th"*** occur within `word`. Case matters.
- [] Your function must utilize recursion.
- [] It cannot contain any loops.
'''

