
import pytest

from skytools.parsing import (
    dedent, hsize_to_bytes, merge_connect_string, parse_acl,
    parse_connect_string, parse_logtriga_sql, parse_pgarray,
    parse_sqltriga_sql, parse_statements, parse_tabbed_table, sql_tokenizer,
)


def test_parse_pgarray():
    assert parse_pgarray('{}') == []
    assert parse_pgarray('{a,b,null,"null"}') == ['a', 'b', None, 'null']
    assert parse_pgarray(r'{"a,a","b\"b","c\\c"}') == ['a,a', 'b"b', 'c\\c']
    assert parse_pgarray("[0,3]={1,2,3}") == ['1', '2', '3']
    assert parse_pgarray(None) is None

    with pytest.raises(ValueError):
        parse_pgarray('}{')
    with pytest.raises(ValueError):
        parse_pgarray('[1]=}')
    with pytest.raises(ValueError):
        parse_pgarray('{"..." , }')
    with pytest.raises(ValueError):
        parse_pgarray('{"..." ; }')
    with pytest.raises(ValueError):
        parse_pgarray('{"}')
    with pytest.raises(ValueError):
        parse_pgarray('{"..."}zzz')
    with pytest.raises(ValueError):
        parse_pgarray('{"..."}z')


def test_parse_sqltriga_sql():
    # Insert event
    row = parse_logtriga_sql('I', '(id, data) values (1, null)')
    assert row == {'data': None, 'id': '1'}
    row = parse_sqltriga_sql('I', '(id, data) values (1, null)', pklist=["id"])
    assert row == {'data': None, 'id': '1'}

    # Update event
    row = parse_logtriga_sql('U', "data='foo' where id = 1")
    assert row == {'data': 'foo', 'id': '1'}

    # Delete event
    row = parse_logtriga_sql('D', "id = 1 and id2 = 'str''val'")
    assert row == {'id': '1', 'id2': "str'val"}

    # Insert event, splitkeys
    keys, row = parse_logtriga_sql('I', '(id, data) values (1, null)', splitkeys=True)
    assert keys == {}
    assert row == {'data': None, 'id': '1'}

    keys, row = parse_logtriga_sql('I', '(id, data) values (1, null)', splitkeys=True)
    assert keys == {}
    assert row == {'data': None, 'id': '1'}

    # Update event, splitkeys
    keys, row = parse_logtriga_sql('U', "data='foo' where id = 1", splitkeys=True)
    assert keys == {'id': '1'}
    assert row == {'data': 'foo'}
    keys, row = parse_logtriga_sql('U', "data='foo',type=3 where id = 1", splitkeys=True)
    assert keys == {'id': '1'}
    assert row == {'data': 'foo', 'type': '3'}

    # Delete event, splitkeys
    keys, row = parse_logtriga_sql('D', "id = 1 and id2 = 'str''val'", splitkeys=True)
    assert keys == {'id': '1', 'id2': "str'val"}

    # generic
    with pytest.raises(ValueError):
        parse_logtriga_sql('J', "(id, data) values (1, null)")
    with pytest.raises(ValueError):
        parse_logtriga_sql('I', "(id) values (1, null)")

    # insert errors
    with pytest.raises(ValueError):
        parse_logtriga_sql('I', "insert (id, data) values (1, null)")
    with pytest.raises(ValueError):
        parse_logtriga_sql('I', "(id; data) values (1, null)")
    with pytest.raises(ValueError):
        parse_logtriga_sql('I', "(id, data) select (1, null)")
    with pytest.raises(ValueError):
        parse_logtriga_sql('I', "(id, data) values of (1, null)")
    with pytest.raises(ValueError):
        parse_logtriga_sql('I', "(id, data) values (1; null)")
    with pytest.raises(ValueError):
        parse_logtriga_sql('I', "(id, data) values (1, null) ;")
    with pytest.raises(ValueError, match="EOF"):
        parse_logtriga_sql('I', "(id, data) values (1, null) , insert")

    # update errors
    with pytest.raises(ValueError):
        parse_logtriga_sql('U', "(id,data) values (1, null)")
    with pytest.raises(ValueError):
        parse_logtriga_sql('U', "id,data")
    with pytest.raises(ValueError):
        parse_logtriga_sql('U', "data='foo';type=3 where id = 1")
    with pytest.raises(ValueError):
        parse_logtriga_sql('U', "data='foo' where id>1")
    with pytest.raises(ValueError):
        parse_logtriga_sql('U', "data='foo' where id=1 or true")

    # delete errors
    with pytest.raises(ValueError):
        parse_logtriga_sql('D', "foo,1")
    with pytest.raises(ValueError):
        parse_logtriga_sql('D', "foo = 1 ,")


def test_parse_tabbed_table():
    assert parse_tabbed_table('col1\tcol2\nval1\tval2\n') == [
        {'col1': 'val1', 'col2': 'val2'}
    ]
    # skip rows with different size
    assert parse_tabbed_table('col1\tcol2\nval1\tval2\ntmp\n') == [
        {'col1': 'val1', 'col2': 'val2'}
    ]


def test_sql_tokenizer():
    res = sql_tokenizer("select * from a.b", ignore_whitespace=True)
    assert list(res) == [
        ('ident', 'select'), ('sym', '*'), ('ident', 'from'),
        ('ident', 'a'), ('sym', '.'), ('ident', 'b')
    ]

    res = sql_tokenizer("\"c olumn\",'str''val'")
    assert list(res) == [
        ('ident', '"c olumn"'), ('sym', ','), ('str', "'str''val'")
    ]

    res = sql_tokenizer('a.b a."b "" c" a.1', fqident=True, ignore_whitespace=True)
    assert list(res) == [
        ('ident', 'a.b'), ('ident', 'a."b "" c"'), ('ident', 'a'), ('sym', '.'), ('num', '1')
    ]

    res = sql_tokenizer(r"set 'a''\' + E'\''", standard_quoting=True, ignore_whitespace=True)
    assert list(res) == [
        ('ident', 'set'), ('str', "'a''\\'"), ('sym', '+'), ('str', "E'\\''")
    ]

    res = sql_tokenizer('a.b a."b "" c" a.1', fqident=True, standard_quoting=True, ignore_whitespace=True)
    assert list(res) == [
        ('ident', 'a.b'), ('ident', 'a."b "" c"'), ('ident', 'a'), ('sym', '.'), ('num', '1')
    ]
    res = sql_tokenizer('a.b\nc;', show_location=True, ignore_whitespace=True)
    assert list(res) == [
        ('ident', 'a', 1), ('sym', '.', 2), ('ident', 'b', 3), ('ident', 'c', 5), ('sym', ';', 6)
    ]


def test_parse_statements():
    res = parse_statements("begin; select 1; select 'foo'; end;")
    assert list(res) == ['begin;', 'select 1;', "select 'foo';", 'end;']

    res = parse_statements("select (select 2+(select 3;);) ; select 4;")
    assert list(res) == ['select (select 2+(select 3;);) ;', 'select 4;']

    with pytest.raises(ValueError):
        list(parse_statements('select ());'))

    with pytest.raises(ValueError):
        list(parse_statements('copy from stdin;'))


def test_parse_acl():
    assert parse_acl('user=rwx/owner') == ('user', 'rwx', 'owner')
    assert parse_acl('" ""user"=rwx/" ""owner"') == (' "user', 'rwx', ' "owner')
    assert parse_acl('user=rwx') == ('user', 'rwx', None)
    assert parse_acl('=/f') == (None, '', 'f')

    # is this ok?
    assert parse_acl('?') is None


def test_dedent():
    assert dedent('  Line1:\n    Line 2\n') == 'Line1:\n  Line 2\n'

    res = dedent('  \nLine1:\n  Line 2\n Line 3\n    Line 4')
    assert res == 'Line1:\nLine 2\n Line 3\n  Line 4\n'


def test_hsize_to_bytes():
    assert hsize_to_bytes('10G') == 10737418240
    assert hsize_to_bytes('12k') == 12288
    with pytest.raises(ValueError):
        hsize_to_bytes("x")


def test_parse_connect_string():
    assert parse_connect_string("host=foo") == [('host', 'foo')]

    res = parse_connect_string(r" host = foo password = ' f\\\o\'o ' ")
    assert res == [('host', 'foo'), ('password', "' f\\o'o '")]

    with pytest.raises(ValueError):
        parse_connect_string(r" host = ")


def test_merge_connect_string():
    res = merge_connect_string([('host', 'ip'), ('pass', ''), ('x', ' ')])
    assert res == "host=ip pass='' x=' '"

