import unittest

from ex5 import finder


class TestEx2(unittest.TestCase):

    def test_small(self):
        files = [
            '/bin/foo',
            '/bin/bar',
            '/usr/bin/baz'
        ]
        queries = [
            "foo",
            "qux",
            "baz"
        ]
        result = finder(files, queries)
        self.assertTrue(result == ['/bin/foo', '/usr/bin/baz'])

        queries = [
            "qux"
        ]
        result = finder(files, queries)
        self.assertTrue(result == [])

    def test_large(self):
        files = []

        for i in range(500000):
            files.append(f"/dir{i}/file{i}")

        for i in range(500000):
            files.append(f"/dir{i}/dirb{i}/file{i}")

        queries = []

        for i in range(1000000):
            queries.append(f"nofile{i}")

        queries += [
            "file3490",
            "file256",
            "file999999",
            "file8192"
        ]

        result = finder(files, queries)
        result.sort()

        self.assertTrue(result == ['/dir256/dirb256/file256',
            '/dir256/file256', '/dir3490/dirb3490/file3490',
            '/dir3490/file3490', '/dir8192/dirb8192/file8192',
            '/dir8192/file8192'])

if __name__ == '__main__':
    unittest.main()
