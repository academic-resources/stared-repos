
import skytools


def test_version():
    a = skytools.natsort_key(skytools.__version__)
    b = skytools.natsort_key('3.3')
    assert a >= b

