
from skytools.dbservice import transform_fields


def test_transform_fields():
    rows = []
    rows.append({'time': '22:00', 'metric': 'count', 'value': 100})
    rows.append({'time': '22:00', 'metric': 'dur', 'value': 7})
    rows.append({'time': '23:00', 'metric': 'count', 'value': 200})
    rows.append({'time': '23:00', 'metric': 'dur', 'value': 5})
    res = list(transform_fields(rows, ['time'], 'metric', 'value'))
    assert res[0] == {'count': 100, 'dur': 7, 'time': '22:00'}
    assert res[1] == {'count': 200, 'dur': 5, 'time': '23:00'}

