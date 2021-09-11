
import io
import os.path
import sys

import pytest

from skytools.config import (
    Config, ConfigError, ExtendedCompatConfigParser,
    InterpolationError, NoOptionError, NoSectionError,
)

TOP = os.path.dirname(__file__)
CONFIG = os.path.join(TOP, 'config.ini')
CONFIG2 = os.path.join(TOP, 'config2.ini')


def test_config_str():
    cf = Config('base', CONFIG)
    assert cf.get('foo') == '1'
    assert cf.get('missing', 'q') == 'q'
    with pytest.raises(NoOptionError):
        cf.get('missing')


def test_config_int():
    cf = Config('base', CONFIG)
    assert cf.getint('foo') == 1
    assert cf.getint('missing', 2) == 2
    with pytest.raises(NoOptionError):
        cf.getint('missing')


def test_config_float():
    cf = Config('base', CONFIG)
    assert cf.getfloat('float-val') == 2.0
    assert cf.getfloat('missing', 3.0) == 3.0
    with pytest.raises(NoOptionError):
        cf.getfloat('missing')


def test_config_bool():
    cf = Config('base', CONFIG)
    assert cf.getboolean('bool-true1') == True
    assert cf.getboolean('bool-true2') == True
    assert cf.getboolean('missing', True) == True
    with pytest.raises(NoOptionError):
        cf.getboolean('missing')

    assert cf.getboolean('bool-false1') == False
    assert cf.getboolean('bool-false2') == False
    assert cf.getboolean('missing', False) == False
    with pytest.raises(NoOptionError):
        cf.getbool('missing')


def test_config_list():
    cf = Config('base', CONFIG)
    assert cf.getlist('list-val1') == []
    assert cf.getlist('list-val2'), ['a', '1', 'asd' == 'ppp']
    assert cf.getlist('missing', [1]) == [1]
    with pytest.raises(NoOptionError):
        cf.getlist('missing')


def test_config_dict():
    cf = Config('base', CONFIG)
    assert cf.getdict('dict-val1') == {}
    assert cf.getdict('dict-val2') == {'a': '1', 'b': '2', 'z': 'z'}
    assert cf.getdict('missing', {'a': 1}) == {'a': 1}
    with pytest.raises(NoOptionError):
        cf.getdict('missing')


def test_config_file():
    cf = Config('base', CONFIG)
    assert cf.getfile('file-val1') == '-'
    if sys.platform != 'win32':
        assert cf.getfile('file-val2')[0] == '/'
    assert cf.getfile('missing', 'qwe') == 'qwe'
    with pytest.raises(NoOptionError):
        cf.getfile('missing')


def test_config_bytes():
    cf = Config('base', CONFIG)
    assert cf.getbytes('bytes-val1') == 4
    assert cf.getbytes('bytes-val2') == 2048
    assert cf.getbytes('missing', '3k') == 3072
    with pytest.raises(NoOptionError):
        cf.getbytes('missing')


def test_config_wildcard():
    cf = Config('base', CONFIG)

    assert cf.get_wildcard('wild-*-*', ['a', 'b']) == 'w.a.b'
    assert cf.get_wildcard('wild-*-*', ['a', 'x']) == 'w.a'
    assert cf.get_wildcard('wild-*-*', ['q', 'b']) == 'w2'
    assert cf.get_wildcard('missing-*-*', ['1', '2'], 'def') == 'def'
    with pytest.raises(NoOptionError):
        cf.get_wildcard('missing-*-*', ['1', '2'])


def test_config_default():
    cf = Config('base', CONFIG)
    assert cf.get('all') == 'yes'


def test_config_other():
    cf = Config('base', CONFIG)
    assert sorted(cf.sections()), ['base' == 'other']
    assert cf.has_section('base') == True
    assert cf.has_section('other') == True
    assert cf.has_section('missing') == False
    assert cf.has_section('DEFAULT') == False

    assert cf.has_option('missing') == False
    assert cf.has_option('all') == True
    assert cf.has_option('foo') == True

    cf2 = cf.clone('other')
    opts = list(sorted(cf2.options()))
    assert opts == [
        'all', 'config_dir', 'config_file', 'host_name',
        'job_name', 'service_name', 'test'
    ]
    assert len(cf2.items()) == len(cf2.options())


def test_loading():
    with pytest.raises(NoSectionError):
        Config('random', CONFIG)
    with pytest.raises(NoSectionError):
        Config('random', CONFIG)
    with pytest.raises(ConfigError):
        Config('random', 'random.ini')


def test_nofile():
    cf = Config('base', None, user_defs={'a': '1'})
    assert cf.sections() == ['base']
    assert cf.get('a') == '1'

    cf = Config('base', None, user_defs={'a': '1'}, ignore_defs=True)
    assert cf.get('a', '2') == '2'


def test_override():
    cf = Config('base', CONFIG, override={'foo': 'overrided'})
    assert cf.get('foo') == 'overrided'


def test_vars():
    cf = Config('base', CONFIG)
    assert cf.get('vars1') == 'V2=V3=Q3'

    with pytest.raises(InterpolationError):
        cf.get('bad1')


def test_extended_compat():
    config = u'[foo]\nkey = ${sub} $${nosub}\nsub = 2\n[bar]\nkey = ${foo:key}\n'
    cf = ExtendedCompatConfigParser()
    cf.read_file(io.StringIO(config), 'conf.ini')
    assert cf.get('bar', 'key') == '2 ${nosub}'

    config = u'[foo]\nloop1= ${loop1}\nloop2 = ${loop3}\nloop3 = ${loop2}\n'
    cf = ExtendedCompatConfigParser()
    cf.read_file(io.StringIO(config), 'conf.ini')
    with pytest.raises(InterpolationError):
        cf.get('foo', 'loop1')
    with pytest.raises(InterpolationError):
        cf.get('foo', 'loop2')

    config = u'[foo]\nkey = %(sub)s ${sub}\nsub = 2\n[bar]\nkey = %(foo:key)s\nkey2 = ${foo:key}\n'
    cf = ExtendedCompatConfigParser()
    cf.read_file(io.StringIO(config), 'conf.ini')
    assert cf.get('bar', 'key2') == '2 2'
    with pytest.raises(NoOptionError):
        cf.get('bar', 'key')

    config = u'[foo]\nkey = ${bad:xxx}\n[bad]\nsub = 1\n'
    cf = ExtendedCompatConfigParser()
    cf.read_file(io.StringIO(config), 'conf.ini')
    with pytest.raises(NoOptionError):
        cf.get('foo', 'key')


def test_config_format():
    cf1 = Config("fmt1", CONFIG2)
    cf2 = Config("fmt2", CONFIG2)

    with pytest.raises(ConfigError):
        Config("fmt3", CONFIG2)

    assert cf1.get("bar") == "1"
    assert cf2.get("bar1") == "%(foo)s"
    assert cf2.get("bar2") == "1"

