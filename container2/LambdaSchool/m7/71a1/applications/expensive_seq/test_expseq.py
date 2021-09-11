import unittest

from expensive_seq import expensive_seq


class TestHashTable(unittest.TestCase):

    def test_expseq(self):
        first10 = [0, 73, 712, 5233, 36592, 246773, 1623280, 10496585, 66941152, 421957189]

        for i in range(10):
            x = expensive_seq(i * 2, i * 3, i * 4)
            self.assertTrue(x == first10[i])

        x = expensive_seq(150, 400, 800)
        self.assertTrue(x == 348089347602676380885589070822523585642423790379026639337628)


if __name__ == '__main__':
    unittest.main()
