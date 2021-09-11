"""Atomic append of gzipped data.

The point is - if several gzip streams are concatenated,
they are read back as one whole stream.
"""

import gzip
import io

__all__ = ('gzip_append',)


def gzip_append(filename: str, data: bytes, level: int = 6) -> None:
    """Append a block of data to file with safety checks."""

    # compress data
    buf = io.BytesIO()
    with gzip.GzipFile(fileobj=buf, compresslevel=level, mode="w") as g:
        g.write(data)
    zdata = buf.getvalue()

    # append, safely
    with open(filename, "ab+", 0) as f:
        f.seek(0, 2)
        pos = f.tell()
        try:
            f.write(zdata)
        except Exception as ex:
            # rollback on error
            f.seek(pos, 0)
            f.truncate()
            raise ex

