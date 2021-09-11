
import pytest

from skytools.utf8 import safe_utf8_decode, sanitize_unicode


def test_safe_decode():
    assert safe_utf8_decode(b"foobar") == (True, "foobar")
    assert safe_utf8_decode(b'X\0Z') == (False, "X\uFFFDZ")
    assert safe_utf8_decode(b"OK") == (True, "OK")
    assert safe_utf8_decode(b'X\xF1Y') == (False, "X\uFFFDY")

    assert sanitize_unicode(u'\uD801\uDC01') == "\U00010401"

    with pytest.raises(TypeError):
        sanitize_unicode(b'qwe')

## these give different results in py27 and py35
# >>> _norm(safe_utf8_decode(b'X\xed\xa0\x80Y\xed\xb0\x89Z'))
# (False, ['X', 65533, 65533, 65533, 'Y', 65533, 65533, 65533, 'Z'])
# >>> _norm(safe_utf8_decode(b'X\xed\xa0\x80\xed\xb0\x89Z'))
# (False, ['X', 65533, 65533, 65533, 65533, 65533, 65533, 'Z'])

