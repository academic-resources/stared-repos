
import pytest

from skytools.querybuilder import (
    PARAM_DBAPI, PARAM_INLINE, PARAM_PLPY,
    PlanCache, QueryBuilder, plpy, plpy_exec,
)


def test_cached_plan():
    cache = PlanCache(3)

    p1 = cache.get_plan('sql1', ['text'])
    assert p1 is cache.get_plan('sql1', ['text'])

    p2 = cache.get_plan('sql1', ['int'])
    assert p2 is cache.get_plan('sql1', ['int'])
    assert p1 is not p2

    p3 = cache.get_plan('sql3', ['text'])
    assert p3 is cache.get_plan('sql3', ['text'])

    p4 = cache.get_plan('sql4', ['text'])
    assert p4 is cache.get_plan('sql4', ['text'])

    p1x = cache.get_plan('sql1', ['text'])
    assert p1 is not p1x


def test_querybuilder_core():
    args = {'success': 't', 'total': 45, 'ccy': 'EEK', 'id': 556}
    q = QueryBuilder("update orders set total = {total} where id = {id}", args)
    q.add(" and optional = {non_exist}")
    q.add(" and final = {success}")
    exp = "update orders set total = '45' where id = '556' and final = 't'"
    assert q.get_sql(PARAM_INLINE) == exp
    exp = "update orders set total = %s where id = %s and final = %s"
    assert q.get_sql(PARAM_DBAPI) == exp
    exp = "update orders set total = $1 where id = $2 and final = $3"
    assert q.get_sql(PARAM_PLPY) == exp


def test_querybuilder_parse_errors():
    args = {'id': 1}
    with pytest.raises(ValueError):
        QueryBuilder("values ({{id)", args)
    with pytest.raises(ValueError):
        QueryBuilder("values ({id)", args)
    with pytest.raises(ValueError):
        QueryBuilder("values ({id::})", args)
    with pytest.raises(ValueError):
        QueryBuilder("values ({id||})", args)


def test_querybuilder_inline():
    from decimal import Decimal
    args = {
        'list': [1, 2], 'tup': ('s', 'x'), 'dict': {'a': 1}, 'none': None,
        'bin': b'bin', 'str': 's', 'dec': Decimal('1.1'),
    }
    q = QueryBuilder("values ({list}, {dict}, {tup}, {none}, {str}, {bin}, {dec})", args)
    exp = r"""values ('{1,2}', '{"a": 1}', '{s,x}', null, 's', E'\\x62696e', '1.1')"""
    assert q.get_sql(PARAM_INLINE) == exp


def test_querybuilder_altsql():
    args = {'id': 1}
    q = QueryBuilder("values ({id|XX}, {missing|DEFAULT})", args)
    exp = "values ('1', DEFAULT)"
    assert q.get_sql(PARAM_INLINE) == exp

    with pytest.raises(ValueError):
        QueryBuilder("values ({missing|DEFAULT})", None)


def test_plpy_exec():
    GD = {}
    plpy.log.clear()
    plpy_exec(GD, "select {arg1}, {arg2:int4}, {arg1}", {'arg1': '1', 'arg2': '2'})
    assert plpy.log == [
        "DBG: plpy.prepare('select $1, $2, $3', ['text', 'int4', 'text'])",
        "DBG: plpy.execute(('PLAN', 'select $1, $2, $3', ['text', 'int4', 'text']), ['1', '2', '1'])",
    ]

    plpy.log.clear()
    plpy_exec(None, "select {arg1}, {arg2:int4}, {arg1}", {'arg1': '1', 'arg2': '2'})
    assert plpy.log == [
        "DBG: plpy.prepare('select $1, $2, $3', ['text', 'int4', 'text'])",
        "DBG: plpy.execute(('PLAN', 'select $1, $2, $3', ['text', 'int4', 'text']), ['1', '2', '1'])",
    ]

    plpy.log.clear()
    plpy_exec(GD, "select {arg1}, {arg2:int4}, {arg1}", {'arg1': '3', 'arg2': '4'})
    assert plpy.log == [
        "DBG: plpy.execute(('PLAN', 'select $1, $2, $3', ['text', 'int4', 'text']), ['3', '4', '3'])"
    ]

    plpy.log.clear()
    with pytest.raises(Exception):
        plpy_exec(GD, "select {arg1}, {arg2:int4}, {arg1}", {'arg1': '3'})
    assert plpy.log == [
        """DBG: plpy.error("Missing arguments: [arg2]  QUERY: 'select {arg1}, {arg2:int4}, {arg1}'")"""
    ]

    plpy.log.clear()
    plpy_exec(GD, "select {arg1}, {arg2:int4}, {arg1}", {'arg1': '3'}, False)
    assert plpy.log == [
        "DBG: plpy.execute(('PLAN', 'select $1, $2, $3', ['text', 'int4', 'text']), ['3', None, '3'])"
    ]

