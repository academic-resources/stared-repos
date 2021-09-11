
import pytest

from skytools.tnetstrings import dumps, loads


def ustr(v):
    return repr(v).replace("u'", "'")


def nstr(b):
    return b.decode('utf8')


def test_dumps_simple_values():
    vals = (None, False, True, 222, 333.0, b"foo", u"bar")
    tnvals = [nstr(dumps(v)) for v in vals]
    assert tnvals == [
        '0:~', '5:false!', '4:true!', '3:222#', '5:333.0^', '3:foo,', '3:bar,'
    ]


def test_dumps_complex_values():
    vals2 = [[], (), {}, [1, 2], {'a': 'b'}]
    tnvals2 = [nstr(dumps(v)) for v in vals2]
    assert tnvals2 == ['0:]', '0:]', '0:}', '8:1:1#1:2#]', '8:1:a,1:b,}']


def test_loads_simple():
    vals = (None, False, True, 222, 333.0, b"foo", u"bar")
    res = ustr([loads(dumps(v)) for v in vals])
    assert res == "[None, False, True, 222, 333.0, 'foo', 'bar']"


def test_loads_complex():
    vals2 = [[], (), {}, [1, 2], {'a': 'b'}]
    res = ustr([loads(dumps(v)) for v in vals2])
    assert res == "[[], [], {}, [1, 2], {'a': 'b'}]"


def test_dumps_mview():
    res = nstr(dumps([memoryview(b'zzz'), b'qqq']))
    assert res == '12:3:zzz,3:qqq,]'


def test_loads_errors():
    with pytest.raises(ValueError):
        loads(b'4:qwez!')
    with pytest.raises(ValueError):
        loads(b'4:')
    with pytest.raises(ValueError):
        loads(b'4:qwez')
    with pytest.raises(ValueError):
        loads(b'4')
    with pytest.raises(ValueError):
        loads(b'')
    with pytest.raises(ValueError):
        loads(b'999999999999999999:z,')
    with pytest.raises(TypeError):
        loads(u'qweqwe')
    with pytest.raises(ValueError):
        loads(b'4:true!0:~')
    with pytest.raises(ValueError):
        loads(b'1:X~')
    with pytest.raises(ValueError):
        loads(b'8:1:1#1:2#}')
    with pytest.raises(ValueError):
        loads(b'1:Xz')


def test_dumps_errors():
    with pytest.raises(TypeError):
        dumps(open)

