
import gzip
import os
import tempfile

from skytools.gzlog import gzip_append


def test_gzlog():
    fd, tmpname = tempfile.mkstemp(suffix='.gz')
    os.close(fd)
    try:
        blk = b'1234567890' * 100
        write_total = 0
        for i in range(5):
            gzip_append(tmpname, blk)
            write_total += len(blk)

        read_total = 0
        with gzip.open(tmpname) as rfd:
            while True:
                blk = rfd.read(512)
                if not blk:
                    break
                read_total += len(blk)
    finally:
        os.remove(tmpname)

    assert read_total == write_total

