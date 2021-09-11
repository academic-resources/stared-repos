"""Various helpers for string quoting/unquoting.
"""

import json
import re
from typing import Any, Dict, Mapping, Match, Optional, Sequence, Union

try:
    from skytools._cquoting import (
        db_urldecode, db_urlencode, quote_bytea_raw,
        quote_copy, quote_literal, unescape, unquote_literal,
    )
except ImportError:
    from skytools._pyquoting import (
        db_urldecode, db_urlencode, quote_bytea_raw,
        quote_copy, quote_literal, unescape, unquote_literal,
    )

__all__ = (
    # _pyqoting / _cquoting
    "db_urldecode", "db_urlencode", "quote_bytea_raw",
    "quote_copy", "quote_literal", "unescape", "unquote_literal",
    # local
    "quote_bytea_literal", "quote_bytea_copy", "quote_statement",
    "quote_ident", "quote_fqident", "quote_json", "unescape_copy",
    "unquote_ident", "unquote_fqident",
    "json_encode", "json_decode",
    "make_pgarray",
)


#
# SQL quoting
#

def quote_bytea_literal(s: bytes) -> str:
    """Quote bytea for regular SQL."""

    return quote_literal(quote_bytea_raw(s))


def quote_bytea_copy(s: bytes) -> str:
    """Quote bytea for COPY."""

    return quote_copy(quote_bytea_raw(s))


def quote_statement(sql: str, dict_or_list: Union[Mapping[str, Any], Sequence[Any]]) -> str:
    """Quote whole statement.

    Data values are taken from dict or list or tuple.
    """
    if hasattr(dict_or_list, 'items'):
        qdict: Dict[str, str] = {}
        for k, v in dict_or_list.items():  # type: ignore
            qdict[k] = quote_literal(v)
        return sql % qdict
    else:
        qvals = [quote_literal(v) for v in dict_or_list]
        return sql % tuple(qvals)


# reserved keywords (RESERVED_KEYWORD + TYPE_FUNC_NAME_KEYWORD + COL_NAME_KEYWORD)
# same list as postgres quote_ident()
_ident_kwmap = frozenset("""
    all analyse analyze and any array as asc asymmetric authorization between bigint binary
    bit boolean both case cast char character check coalesce collate collation column
    concurrently constraint create cross current_catalog current_date current_role current_schema
    current_time current_timestamp current_user dec decimal default deferrable desc distinct
    do else end except exists extract false fetch float for foreign freeze from full grant
    greatest group grouping having ilike in initially inner inout int integer intersect
    interval into is isnull join lateral leading least left like limit localtime localtimestamp
    national natural nchar none normalize not notnull null nullif numeric offset on only or order
    out outer overlaps overlay placing position precision primary real references returning
    right row select session_user setof similar smallint some substring symmetric table
    tablesample then time timestamp to trailing treat trim true union unique user using
    values varchar variadic verbose when where window with xmlattributes xmlconcat xmlelement
    xmlexists xmlforest xmlnamespaces xmlparse xmlpi xmlroot xmlserialize xmltable
""".split())

_ident_bad = re.compile(r"[^a-z0-9_]|^[0-9]")


def quote_ident(s: str) -> str:
    """Quote SQL identifier.

    If is checked against weird symbols and keywords.
    """

    if _ident_bad.search(s) or s in _ident_kwmap:
        s = '"%s"' % s.replace('"', '""')
    elif not s:
        return '""'
    return s


def quote_fqident(s: str) -> str:
    """Quote fully qualified SQL identifier.

    The '.' is taken as namespace separator and
    all parts are quoted separately
    """
    tmp = s.split('.', 1)
    if len(tmp) == 1:
        return 'public.' + quote_ident(s)
    return '.'.join([quote_ident(name) for name in tmp])


#
# quoting for JSON strings
#

_jsre = re.compile(r'[\x00-\x1F\\/"]')
_jsmap = {
    "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r",
    "\t": "\\t", "\\": "\\\\", '"': '\\"',
    "/": "\\/",   # to avoid html attacks
}


def _json_quote_char(m: Match[str]):
    """Quote single char."""
    c = m.group(0)
    try:
        return _jsmap[c]
    except KeyError:
        return r"\u%04x" % ord(c)


def quote_json(s: Optional[str]) -> str:
    """JSON style quoting."""
    if s is None:
        return "null"
    return '"%s"' % _jsre.sub(_json_quote_char, s)


def unescape_copy(val: str) -> Optional[str]:
    r"""Removes C-style escapes, also converts "\N" to None.
    """
    if val == r"\N":
        return None
    return unescape(val)


def unquote_ident(val: str) -> str:
    """Unquotes possibly quoted SQL identifier.
    """
    if len(val) > 1 and val[0] == '"' and val[-1] == '"':
        return val[1:-1].replace('""', '"')
    if val.find('"') > 0:
        raise Exception('unsupported syntax')
    return val.lower()


def unquote_fqident(val: str) -> str:
    """Unquotes fully-qualified possibly quoted SQL identifier.
    """
    tmp = val.split('.', 1)
    return '.'.join([unquote_ident(i) for i in tmp])


def json_encode(val: Any = None, **kwargs: Any) -> str:
    """Creates JSON string from Python object.
    """
    return json.dumps(val or kwargs)


def json_decode(s: str) -> Any:
    """Parses JSON string into Python object.
    """
    return json.loads(s)


#
# Create Postgres array
#

# any chars not in "good" set?  main bad ones: [ ,{}\"]
_pgarray_bad_rx = r"[^0-9a-z_.%&=()<>*/+-]"
_pgarray_bad_rc = re.compile(_pgarray_bad_rx)


def _quote_pgarray_elem(s: Any) -> str:
    if s is None:
        return 'NULL'
    s = str(s)
    if _pgarray_bad_rc.search(s):
        s = s.replace('\\', '\\\\')
        return '"' + s.replace('"', r'\"') + '"'
    elif not s:
        return '""'
    return s


def make_pgarray(lst: Sequence[Any]) -> str:
    r"""Formats Python list as Postgres array.
    Reverse of parse_pgarray().
    """
    items = [_quote_pgarray_elem(v) for v in lst]
    return '{' + ','.join(items) + '}'

