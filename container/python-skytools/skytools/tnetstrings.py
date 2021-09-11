"""TNetStrings.
"""

import codecs
from typing import Any, List

__all__ = ['loads', 'dumps']

_memstr_types = (str, bytes, memoryview)
_struct_types = (list, tuple, dict)
_inttypes = (int,)
_decode_utf8 = codecs.getdecoder('utf8')


def _dumps(dst, val):
    if isinstance(val, _struct_types):
        tlenpos = len(dst)
        tlen = 0
        dst.append(None)
        if isinstance(val, dict):
            for k in val:
                tlen += _dumps(dst, k)
                tlen += _dumps(dst, val[k])
            dst.append(b'}')
        else:
            for v in val:
                tlen += _dumps(dst, v)
            dst.append(b']')
        dst[tlenpos] = b'%d:' % tlen
        return len(dst[tlenpos]) + tlen + 1
    elif isinstance(val, _memstr_types):
        if isinstance(val, str):
            bval = val.encode('utf8')
        elif isinstance(val, bytes):
            bval = val
        else:
            bval = memoryview(val).tobytes()
        tval = b'%d:%s,' % (len(bval), bval)
    elif isinstance(val, bool):
        tval = val and b'4:true!' or b'5:false!'
    elif isinstance(val, _inttypes):
        bval = b'%d' % val
        tval = b'%d:%s#' % (len(bval), bval)
    elif isinstance(val, float):
        bval = b'%r' % val
        tval = b'%d:%s^' % (len(bval), bval)
    elif val is None:
        tval = b'0:~'
    else:
        raise TypeError("Object type not supported: %r" % val)
    dst.append(tval)
    return len(tval)


def _loads(buf):
    pos = 0
    maxlen = min(len(buf), 9)
    while buf[pos:pos + 1] != b':':
        pos += 1
        if pos > maxlen:
            raise ValueError("Too large length")
    lenbytes = buf[: pos].tobytes()
    tlen = int(lenbytes)
    ofs = len(lenbytes) + 1
    endofs = ofs + tlen

    val = buf[ofs: endofs]
    code = buf[endofs: endofs + 1]
    rest = buf[endofs + 1:]
    if len(val) + 1 != tlen + len(code):
        raise ValueError("failed to load value, invalid length")

    if code == b',':
        return _decode_utf8(val)[0], rest
    elif code == b'#':
        return int(val.tobytes(), 10), rest
    elif code == b'^':
        return float(val.tobytes()), rest
    elif code == b']':
        listobj = []
        while val:
            elem, val = _loads(val)
            listobj.append(elem)
        return listobj, rest
    elif code == b'}':
        dictobj = {}
        while val:
            k, val = _loads(val)
            if not isinstance(k, str):
                raise ValueError("failed to load value, invalid key type")
            dictobj[k], val = _loads(val)
        return dictobj, rest
    elif code == b'!':
        if val == b'true':
            return True, rest
        if val == b'false':
            return False, rest
        raise ValueError("failed to load value, invalid boolean value")
    elif code == b'~':
        if val == b'':
            return None, rest
        raise ValueError("failed to load value, invalid null value")
    else:
        raise ValueError("failed to load value, invalid value code")


#
# Public API
#

def dumps(val: Any) -> bytes:
    """Dump object tree as TNetString value.
    """
    dst: List[bytes] = []
    _dumps(dst, val)
    return b''.join(dst)


def loads(binval: bytes) -> Any:
    """Parse TNetstring from byte string.
    """
    if not isinstance(binval, (bytes, memoryview)):
        raise TypeError("Bytes or memoryview required")
    obj, rest = _loads(memoryview(binval))
    if rest:
        raise ValueError("Not all data processed")
    return obj


# old compat?
parse = loads
dump = dumps

