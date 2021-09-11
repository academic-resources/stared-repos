r"""UTF-8 sanitizer.

Python's UTF-8 parser is quite relaxed, this creates problems when
talking with other software that uses stricter parsers.
"""

import codecs
import re
from typing import Match, Optional, Pattern, Tuple

__all__ = ('safe_utf8_decode', 'sanitize_unicode')

# by default, use same symbol as 'replace'
REPLACEMENT_SYMBOL = chr(0xFFFD)   # 65533

_urc: Optional[Pattern[str]] = None


def _fix_utf8(m: Match[str]) -> str:
    """Merge UTF16 surrogates, replace others"""
    u = m.group()
    if len(u) == 2:
        # merge into single symbol
        c1 = ord(u[0])
        c2 = ord(u[1])
        c = 0x10000 + ((c1 & 0x3FF) << 10) + (c2 & 0x3FF)
        return chr(c)
    else:
        # use replacement symbol
        return REPLACEMENT_SYMBOL


def sanitize_unicode(u: str) -> str:
    """Fix invalid symbols in unicode string."""
    global _urc

    if not isinstance(u, str):
        raise TypeError('Need unicode string')

    # regex for finding invalid chars, works on unicode string
    if not _urc:
        rx = u"[\uD800-\uDBFF] [\uDC00-\uDFFF]? | [\0\uDC00-\uDFFF]"
        _urc = re.compile(rx, re.X)

    # now find and fix UTF16 surrogates
    m = _urc.search(u)
    if m:
        u = _urc.sub(_fix_utf8, u)
    return u


def safe_replace(exc):
    """Replace only one symbol at a time.

    Builtin .decode('xxx', 'replace') replaces several symbols
    together, which is unsafe.
    """
    c2 = REPLACEMENT_SYMBOL

    # we could assume latin1
    #if 0:
    #    c1 = exc.object[exc.start]
    #    c2 = chr(ord(c1))

    return c2, exc.start + 1


# register, it will be globally available
codecs.register_error("safe_replace", safe_replace)


def safe_utf8_decode(s: bytes) -> Tuple[bool, str]:
    """Decode UTF-8 safely.

    Acts like str.decode('utf8', 'replace') but also fixes
    UTF16 surrogates and NUL bytes, which Python's default
    decoder does not do.

    @param s: utf8-encoded byte string
    @return: tuple of (was_valid_utf8, unicode_string)
    """

    # decode with error detection
    ok = True
    try:
        # expect no errors by default
        u = s.decode('utf8')
    except UnicodeDecodeError:
        u = s.decode('utf8', 'safe_replace')
        ok = False

    u2 = sanitize_unicode(u)
    if u is not u2:
        ok = False
    return (ok, u2)

