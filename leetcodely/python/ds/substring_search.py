"""This class implements a set of methods with different complexities to find if a substring p is present
in a string t."""


class SubStringSearch:

    @staticmethod
    def naive_search(t, p):
        for i in range(len(t)):
            j, k = i, 0
            while j < len(t) and k < len(p) and t[j] == p[k]:
                j += 1
                k += 1
            if k == len(p):
                return i
        return -1

    @staticmethod
    def kmp(t, p):
        pass

    @staticmethod
    def rabin_karp(t, p):
        pass

    @staticmethod
    def boyer_moore(t, p):
        pass


if __name__ == '__main__':
    searcher = SubStringSearch()
    print(searcher.naive_search('abcbcglx', 'bcglx'))

