
import pytest

from skytools.sqltools import (
    Snapshot, dbdict, fq_name, fq_name_parts, magic_insert,
    mk_delete_sql, mk_insert_sql, mk_update_sql,
)


def test_dbdict():
    row = dbdict(a=1, b=2)
    assert (row.a, row.b, row['a'], row['b']) == (1, 2, 1, 2)
    row.c = 3
    assert row['c'] == 3

    del row.c
    with pytest.raises(AttributeError):
        assert row.c

    with pytest.raises(KeyError):
        assert row['c']

    row.merge({'q': 4})
    assert row.q == 4


def test_fq_name_parts():
    assert fq_name_parts('tbl') == ('public', 'tbl')
    assert fq_name_parts('foo.tbl') == ('foo', 'tbl')
    assert fq_name_parts('foo.tbl.baz') == ('foo', 'tbl.baz')


def test_fq_name():
    assert fq_name('tbl') == 'public.tbl'
    assert fq_name('foo.tbl') == 'foo.tbl'
    assert fq_name('foo.tbl.baz') == 'foo.tbl.baz'


def test_snapshot():
    sn = Snapshot('11:20:11,12,15')
    assert sn.contains(9)
    assert not sn.contains(11)
    assert sn.contains(17)
    assert not sn.contains(20)
    with pytest.raises(ValueError):
        Snapshot(':')


def test_magic_insert():
    res = magic_insert(None, 'tbl', [[1, '1'], [2, '2']], ['col1', 'col2'])
    exp = 'COPY public.tbl (col1,col2) FROM STDIN;\n1\t1\n2\t2\n\\.\n'
    assert res == exp

    res = magic_insert(None, 'tbl', [[1, '1'], [2, '2']], ['col1', 'col2'], use_insert=True)
    exp = "insert into public.tbl (col1,col2) values ('1','1');\ninsert into public.tbl (col1,col2) values ('2','2');\n"
    assert res == exp

    assert magic_insert(None, 'tbl', [], ['col1', 'col2']) is None

    res = magic_insert(None, 'tbl."1"', [[1, '1'], [2, '2']], ['col1', 'col2'], quoted_table=True)
    exp = 'COPY tbl."1" (col1,col2) FROM STDIN;\n1\t1\n2\t2\n\\.\n'
    assert res == exp

    with pytest.raises(Exception):
        magic_insert(None, 'tbl."1"', [[1, '1'], [2, '2']])

    res = magic_insert(None, 'a.tbl', [{'a': 1}, {'a': 2}])
    exp = 'COPY a.tbl (a) FROM STDIN;\n1\n2\n\\.\n'
    assert res == exp

    res = magic_insert(None, 'a.tbl', [{'a': 1}, {'a': 2}], use_insert=True)
    exp = "insert into a.tbl (a) values ('1');\ninsert into a.tbl (a) values ('2');\n"
    assert res == exp

    # More fields than data

    res = magic_insert(None, 'tbl', [[1, 'a']], ['col1', 'col2', 'col3'])
    exp = 'COPY public.tbl (col1,col2,col3) FROM STDIN;\n1\ta\t\\N\n\\.\n'
    assert res == exp

    res = magic_insert(None, 'tbl', [[1, 'a']], ['col1', 'col2', 'col3'], use_insert=True)
    exp = "insert into public.tbl (col1,col2,col3) values ('1','a',null);\n"
    assert res == exp

    res = magic_insert(None, 'tbl', [{'a': 1}, {'b': 2}], ['a', 'b'], use_insert=False)
    exp = 'COPY public.tbl (a,b) FROM STDIN;\n1\t\\N\n\\N\t2\n\\.\n'
    assert res == exp

    res = magic_insert(None, 'tbl', [{'a': 1}, {'b': 2}], ['a', 'b'], use_insert=True)
    exp = "insert into public.tbl (a,b) values ('1',null);\ninsert into public.tbl (a,b) values (null,'2');\n"
    assert res == exp


def test_mk_insert_sql():
    row = {'id': 1, 'data': None}
    res = mk_insert_sql(row, 'tbl')
    exp = "insert into public.tbl (id, data) values ('1', null);"
    assert res == exp

    fmap = {'id': 'id_', 'data': 'data_'}
    res = mk_insert_sql(row, 'tbl', ['x'], fmap)
    exp = "insert into public.tbl (id_, data_) values ('1', null);"
    assert res == exp


def test_mk_update_sql():
    res = mk_update_sql({'id': 0, 'id2': '2', 'data': 'str\\'}, 'Table', ['id', 'id2'])
    exp = 'update only public."Table" set data = E\'str\\\\\' where id = \'0\' and id2 = \'2\';'
    assert res == exp

    res = mk_update_sql({'id': 0, 'id2': '2', 'data': 'str\\'}, 'Table', ['id', 'id2'],
                        {'id': '_id', 'id2': '_id2', 'data': '_data'})
    exp = 'update only public."Table" set _data = E\'str\\\\\' where _id = \'0\' and _id2 = \'2\';'
    assert res == exp

    with pytest.raises(Exception):
        mk_update_sql({'id': 0, 'id2': '2', 'data': 'str\\'}, 'Table', [])


def test_mk_delete_sql():
    res = mk_delete_sql({'a': 1, 'b': 2, 'c': 3}, 'tablename', ['a', 'b'])
    exp = "delete from only public.tablename where a = '1' and b = '2';"
    assert res == exp

    res = mk_delete_sql({'a': 1, 'b': 2, 'c': 3}, 'tablename', ['a', 'b'], {'a': 'aa', 'b': 'bb'})
    exp = "delete from only public.tablename where aa = '1' and bb = '2';"
    assert res == exp

    with pytest.raises(Exception):
        mk_delete_sql({'a': 1, 'b': 2, 'c': 3}, 'tablename', [])

