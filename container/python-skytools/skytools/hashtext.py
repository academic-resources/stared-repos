"""
Implementation of Postgres hashing function.

hashtext_old() - used up to PostgreSQL 8.3
hashtext_new() - used since PostgreSQL 8.4
"""

import struct
import sys
from typing import Tuple, Union

try:
    from skytools._chashtext import hashtext_new, hashtext_old
except ImportError:
    def hashtext_old(v: Union[bytes, str]) -> int:
        return hashtext_old_py(v)
    def hashtext_new(v: Union[bytes, str]) -> int:
        return hashtext_new_py(v)


__all__ = ("hashtext_old", "hashtext_new")

# pad for last partial block
PADDING = b'\0' * 12


def uint32(x: int) -> int:
    """python does not have 32 bit integer so we need this hack to produce uint32 after bit operations"""
    return x & 0xffffffff


#
# Old Postgres hashtext() - lookup2 with custom initval
#

FMT_OLD = struct.Struct("<LLL")


def mix_old(a: int, b: int, c: int) -> Tuple[int, int, int]:
    c = uint32(c)

    a = uint32((a - b - c) ^ (c >> 13))
    b = uint32((b - c - a) ^ (a << 8))
    c = uint32((c - a - b) ^ (b >> 13))
    a = uint32((a - b - c) ^ (c >> 12))
    b = uint32((b - c - a) ^ (a << 16))
    c = uint32((c - a - b) ^ (b >> 5))
    a = uint32((a - b - c) ^ (c >> 3))
    b = uint32((b - c - a) ^ (a << 10))
    c = uint32((c - a - b) ^ (b >> 15))

    return a, b, c


def hashtext_old_py(k: Union[bytes, str]) -> int:
    """Old Postgres hashtext()"""

    if isinstance(k, str):
        k = k.encode()

    remain = len(k)
    pos = 0
    a = b = 0x9e3779b9
    c = 3923095

    # handle most of the key
    while remain >= 12:
        a2, b2, c2 = FMT_OLD.unpack_from(k, pos)
        a, b, c = mix_old(a + a2, b + b2, c + c2)
        pos += 12
        remain -= 12

    # handle the last 11 bytes
    a2, b2, c2 = FMT_OLD.unpack_from(k[pos:] + PADDING, 0)

    # the lowest byte of c is reserved for the length
    c2 = (c2 << 8) + len(k)

    a, b, c = mix_old(a + a2, b + b2, c + c2)

    # convert to signed int
    if c & 0x80000000:
        c = -0x100000000 + c

    return int(c)


#
# New Postgres hashtext() - hacked lookup3:
# - custom initval
# - calls mix() when len=12
# - shifted c in last block on little-endian
#

FMT_NEW = struct.Struct("=LLL")


def rol32(x: int, k: int) -> int:
    return ((x) << (k)) | (uint32(x) >> (32 - (k)))


def mix_new(a: int, b: int, c: int) -> Tuple[int, int, int]:
    a = (a - c) ^ rol32(c, 4)
    c += b
    b = (b - a) ^ rol32(a, 6)
    a += c
    c = (c - b) ^ rol32(b, 8)
    b += a
    a = (a - c) ^ rol32(c, 16)
    c += b
    b = (b - a) ^ rol32(a, 19)
    a += c
    c = (c - b) ^ rol32(b, 4)
    b += a

    return uint32(a), uint32(b), uint32(c)


def final_new(a: int, b: int, c: int) -> Tuple[int, int, int]:
    c = (c ^ b) - rol32(b, 14)
    a = (a ^ c) - rol32(c, 11)
    b = (b ^ a) - rol32(a, 25)
    c = (c ^ b) - rol32(b, 16)
    a = (a ^ c) - rol32(c, 4)
    b = (b ^ a) - rol32(a, 14)
    c = (c ^ b) - rol32(b, 24)

    return uint32(a), uint32(b), uint32(c)


def hashtext_new_py(k: Union[bytes, str]) -> int:
    """New Postgres hashtext()"""
    if isinstance(k, str):
        k = k.encode()
    remain = len(k)
    pos = 0
    a = b = c = 0x9e3779b9 + len(k) + 3923095

    # handle most of the key
    while remain >= 12:
        a2, b2, c2 = FMT_NEW.unpack_from(k, pos)
        a, b, c = mix_new(a + a2, b + b2, c + c2)
        pos += 12
        remain -= 12

    # handle the last 11 bytes
    a2, b2, c2 = FMT_NEW.unpack_from(k[pos:] + PADDING, 0)
    if sys.byteorder == 'little':
        c2 = c2 << 8
    a, b, c = final_new(a + a2, b + b2, c + c2)

    # convert to signed int
    if c & 0x80000000:
        c = -0x100000000 + c

    return int(c)

