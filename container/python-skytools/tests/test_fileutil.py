
import os
import tempfile

from skytools.fileutil import write_atomic


def test_write_atomic():
    pidfn = tempfile.mktemp('.pid')
    write_atomic(pidfn, "1")
    write_atomic(pidfn, "2")
    os.remove(pidfn)


def test_write_atomic_bak():
    pidfn = tempfile.mktemp('.pid')
    write_atomic(pidfn, "1", '.bak')
    write_atomic(pidfn, "2", '.bak')
    os.remove(pidfn)

