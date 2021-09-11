"""Various helpers for string quoting/unquoting.

Here is pure Python that should match C code in _cquoting.
"""

import re
from typing import Any, Dict, Mapping, Match, Optional
from urllib.parse import quote_plus, unquote_plus  # noqa

__all__ = (
    "quote_literal", "quote_copy", "quote_bytea_raw",
    "db_urlencode", "db_urldecode", "unescape",
    "unquote_literal",
)


#
# SQL quoting
#

def quote_literal(s: Any) -> str:
    r"""Quote a literal value for SQL.

    If string contains '\\', extended E'' quoting is used,
    otherwise standard quoting.  Input value of None results
    in string "null" without quotes.

    Python implementation.
    """

    if s is None:
        return "null"
    s = str(s).replace("'", "''")
    s2 = s.replace("\\", "\\\\")
    if len(s) != len(s2):
        return "E'" + s2 + "'"
    return "'" + s2 + "'"


def quote_copy(s: Any) -> str:
    """Quoting for copy command.  None is converted to \\N.

    Python implementation.
    """

    if s is None:
        return "\\N"
    s = str(s)
    s = s.replace("\\", "\\\\")
    s = s.replace("\t", "\\t")
    s = s.replace("\n", "\\n")
    s = s.replace("\r", "\\r")
    return s


_bytea_map: Optional[Dict[int, str]] = None


def quote_bytea_raw(s: bytes) -> str:
    """Quoting for bytea parser.  Returns None as None.

    Python implementation.
    """
    global _bytea_map
    if s is None:
        return None
    if not isinstance(s, bytes):
        raise TypeError("Expect bytes")
    if _bytea_map is None:
        _bytea_map = {}
        for i in range(256):
            c = i
            if i < 0x20 or i >= 0x7F:
                _bytea_map[c] = "\\%03o" % i
            elif i == ord("\\"):
                _bytea_map[c] = "\\\\"
            else:
                _bytea_map[c] = '%c' % i
    return "".join([_bytea_map[b] for b in s])


#
# Database specific urlencode and urldecode.
#

def db_urlencode(dict_val: Mapping[str, Any]) -> str:
    """Database specific urlencode.

    Encode None as key without '='.  That means that in "foo&bar=",
    foo is NULL and bar is empty string.

    Python implementation.
    """

    elem_list = []
    for k, v in dict_val.items():
        if v is None:
            elem = quote_plus(str(k))
        else:
            elem = quote_plus(str(k)) + '=' + quote_plus(str(v))
        elem_list.append(elem)
    return '&'.join(elem_list)


def db_urldecode(qs: str) -> Dict[str, Optional[str]]:
    """Database specific urldecode.

    Decode key without '=' as None.
    This also does not support one key several times.

    Python implementation.
    """

    res: Dict[str, Optional[str]] = {}
    for elem in qs.split('&'):
        if not elem:
            continue
        pair = elem.split('=', 1)
        name = unquote_plus(pair[0])
        if len(pair) == 1:
            res[name] = None
        else:
            res[name] = unquote_plus(pair[1])
    return res


#
# Remove C-like backslash escapes
#

_esc_re = r"\\([0-7]{1,3}|.)"
_esc_rc = re.compile(_esc_re)
_esc_map = {
    't': '\t',
    'n': '\n',
    'r': '\r',
    'a': '\a',
    'b': '\b',
    "'": "'",
    '"': '"',
    '\\': '\\',
}


def _sub_unescape_c(m: Match) -> str:
    """unescape single escape seq."""
    v = m.group(1)
    if (len(v) == 1) and (v < '0' or v > '7'):
        try:
            return _esc_map[v]
        except KeyError:
            return v
    else:
        return chr(int(v, 8))


def unescape(val: str) -> str:
    """Removes C-style escapes from string.
    Python implementation.
    """
    return _esc_rc.sub(_sub_unescape_c, val)


_esql_re = r"''|\\([0-7]{1,3}|.)"
_esql_rc = re.compile(_esql_re)


def _sub_unescape_sqlext(m: Match) -> str:
    """Unescape extended-quoted string."""
    if m.group() == "''":
        return "'"
    v = m.group(1)
    if (len(v) == 1) and (v < '0' or v > '7'):
        try:
            return _esc_map[v]
        except KeyError:
            return v
    return chr(int(v, 8))


def unquote_literal(val: str, stdstr: bool = False) -> Optional[str]:
    """Unquotes SQL string.

    E'..' -> extended quoting.
    '..' -> standard or extended quoting
    null -> None
    other -> returned as-is
    """
    if val[0] == "'" and val[-1] == "'":
        if stdstr:
            return val[1:-1].replace("''", "'")
        else:
            return _esql_rc.sub(_sub_unescape_sqlext, val[1:-1])
    elif len(val) > 2 and val[0] in ('E', 'e') and val[1] == "'" and val[-1] == "'":
        return _esql_rc.sub(_sub_unescape_sqlext, val[2:-1])
    elif len(val) >= 2 and val[0] == '$' and val[-1] == '$':
        p1 = val.find('$', 1)
        p2 = val.rfind('$', 1, -1)
        if p1 > 0 and p2 > p1:
            t1 = val[:p1 + 1]
            t2 = val[p2:]
            if t1 == t2:
                return val[len(t1):-len(t1)]
        raise ValueError("Bad dollar-quoted string")
    elif val.lower() == "null":
        return None
    return val

