
from datetime import datetime

import pytest

from skytools.timeutil import UTC, datetime_to_timestamp, parse_iso_timestamp


def test_parse_iso_timestamp():
    res = str(parse_iso_timestamp('2005-06-01 15:00'))
    assert res == '2005-06-01 15:00:00'

    res = str(parse_iso_timestamp(' 2005-06-01T15:00 +02 '))
    assert res == '2005-06-01 15:00:00+02:00'

    res = str(parse_iso_timestamp('2005-06-01 15:00:33+02:00'))
    assert res == '2005-06-01 15:00:33+02:00'

    d = parse_iso_timestamp('2005-06-01 15:00:59.33 +02')
    assert d.strftime("%z %Z") == '+0200 +02'
    assert str(parse_iso_timestamp(str(d))) == '2005-06-01 15:00:59.330000+02:00'

    res = parse_iso_timestamp('2005-06-01 15:00-0530').strftime('%Y-%m-%d %H:%M %z %Z')
    assert res == '2005-06-01 15:00 -0530 -05:30'

    res = parse_iso_timestamp('2014-10-27T11:59:13Z').strftime('%Y-%m-%d %H:%M:%S %z %Z')
    assert res == '2014-10-27 11:59:13 +0000 +00'

    with pytest.raises(ValueError):
        parse_iso_timestamp('2014.10.27')


def test_datetime_to_timestamp():
    res = datetime_to_timestamp(parse_iso_timestamp("2005-06-01 15:00:59.5 +02"))
    assert res == 1117630859.5

    res = datetime_to_timestamp(datetime.fromtimestamp(1117630859.5, UTC))
    assert res == 1117630859.5

    res = datetime_to_timestamp(datetime.fromtimestamp(1117630859.5))
    assert res == 1117630859.5

    now = datetime.utcnow()
    now2 = datetime.utcfromtimestamp(datetime_to_timestamp(now, False))
    assert abs(now2.microsecond - now.microsecond) < 100

    now2 = now2.replace(microsecond=now.microsecond)
    assert now == now2

    now = datetime.now()
    now2 = datetime.fromtimestamp(datetime_to_timestamp(now))
    assert abs(now2.microsecond - now.microsecond) < 100

    now2 = now2.replace(microsecond=now.microsecond)
    assert now == now2

