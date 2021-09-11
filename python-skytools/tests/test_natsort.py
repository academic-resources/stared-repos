
from skytools.natsort import (
    natsort, natsort_icase, natsort_key, natsorted, natsorted_icase,
)


def test_natsorted():
    res = natsorted(['1', 'ver-1.11', '', 'ver-1.0'])
    assert res == ['', '1', 'ver-1.0', 'ver-1.11']


def test_natsort():
    res = ['a1', '2a', '.1']
    natsort(res)
    assert res == ['.1', '2a', 'a1']


def test_natsorted_icase():
    res = natsorted_icase(['Ver-1.1', 'vEr-1.11', '', 'veR-1.0'])
    assert res == ['', 'veR-1.0', 'Ver-1.1', 'vEr-1.11']


def test_natsort_icase():
    res = ['Ver-1.1', 'vEr-1.11', '', 'veR-1.0']
    natsort_icase(res)
    assert res == ['', 'veR-1.0', 'Ver-1.1', 'vEr-1.11']


def _natcmp(a, b):
    k1 = natsort_key(a)
    k2 = natsort_key(b)
    if k1 < k2:
        return 'ok'
    return f"fail: a='{a}' > b='{b}'"


def test_natsort_order():
    assert _natcmp('1', '2') == 'ok'
    assert _natcmp('2', '11') == 'ok'
    assert _natcmp('.', '1') == 'ok'
    assert _natcmp('1', 'a') == 'ok'
    assert _natcmp('a~1', 'ab') == 'ok'
    assert _natcmp('a~1', 'a') == 'ok'
    assert _natcmp('a~1', 'a1') == 'ok'
    assert _natcmp('00', '0') == 'ok'
    assert _natcmp('001', '0') == 'ok'
    assert _natcmp('0', '01') == 'ok'
    assert _natcmp('011', '02') == 'ok'
    assert _natcmp('00~1', '0~1') == 'ok'
    assert _natcmp('~~~', '~~') == 'ok'
    assert _natcmp('1~beta0', '1') == 'ok'
    assert _natcmp('1', '1.0') == 'ok'

    assert _natcmp('~', '') == 'ok'
    assert _natcmp('', '0') == 'ok'
    assert _natcmp('', '1') == 'ok'
    assert _natcmp('', 'a') == 'ok'

