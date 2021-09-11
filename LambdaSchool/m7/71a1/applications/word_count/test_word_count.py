import unittest

from word_count import word_count


class TestWordCount(unittest.TestCase):

    def test_word_count(self):
        x = word_count("")
        self.assertTrue(x == {})

        x = word_count("Hello    hello.")
        self.assertTrue(x == {"hello": 2})

        x = word_count('Hello, my cat.  And my cat doesn\'t say "hello" back.')
        self.assertTrue(x == {'hello': 2, 'my': 2, 'cat': 2, 'and': 1, "doesn't": 1, 'say': 1, 'back': 1})

        x = word_count('This is a test of the  Emergency  Broadcast  Network. This is only a test.')
        self.assertTrue(x == {'this': 2, 'is': 2, 'a': 2, 'test': 2, 'of': 1, 'the': 1, 'emergency': 1, 'broadcast': 1, 'network': 1, 'only': 1})

        x = word_count('":;,.-+=/\\|[]{}()*^&')
        self.assertTrue(x == {})

        x = word_count('''a a\ra\na\ta \t\r\n''')
        self.assertTrue(x == {"a": 5})

if __name__ == '__main__':
    unittest.main()
