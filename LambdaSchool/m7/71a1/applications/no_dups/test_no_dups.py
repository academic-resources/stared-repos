import unittest

from no_dups import no_dups


class TestNoDups(unittest.TestCase):

    def test_no_dups(self):
        x = no_dups("")
        self.assertTrue(x == "")
        x = no_dups("hello")
        self.assertTrue(x == "hello")
        x = no_dups("hello hello")
        self.assertTrue(x == "hello")
        x = no_dups("cats dogs fish cats dogs")
        self.assertTrue(x == "cats dogs fish")
        x = no_dups("spam spam spam eggs spam sausage spam spam and spam")
        self.assertTrue(x == "spam eggs sausage and")


if __name__ == '__main__':
    unittest.main()
