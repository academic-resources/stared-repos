import pathlib

from collections import OrderedDict,defaultdict, namedtuple
from functools import partial, wraps
from pprint import PrettyPrinter as pprint

pprint = PrettyPrinter(indent=4).pprint


def iterate_recursive_dict(dictionary, keys=()):
    """
    Generator; walk through a recursive dict structure

    yields the compound key and value of each leaf.

    :example:
        >>> eg = {
              'key_1': 'value_1',
              'key_2': {'key_21': 21,
                      'key_22': {'key_221': 221, 'key_222': 222}}}

        >>> for compound_key, val in iterate_recursive_dict(eg):
                print '{}: {}'.format(compound_key, val)

        # should produce output:

    ::
      ('key_1', ): value_1
      ('key_2', 'key_21'): 21
      ('key_2', 'key_22', 'key_221'): 221
      ('key_2', 'key_22', 'key_222'): 222

    """
    if isinstance(dictionary, dict):
        for k in dictionary:
            for rv in iterate_recursive_dict(dictionary[k], keys + (k,)):
                yield rv
    else:
        yield (keys, dictionary)


class DictToNamespace(object):
    """
    Convert `nested` dictionary into namespace

    :type _dict: dictionary
    :example:

        >>> a_dict = {"x":1, "y": "foo", "z": "bar"}
        >>> DictClass = DictToNamespace(a_dict)
        >>> DictClass.x
        1
        >>> DictClass.y
        'foo'
        >>> DictClass.z
        'bar'
        >>> DictClass.z.__class__
        str

        # Works even with nested dicts
        >>> d = {'a': 1, 'b': {'c': 2}, 'd': ["hi", {'foo': "bar"}]}
        >>> DictClass = DictToNamespace(d)
        >>> DictClass.b.c
        2
        >>> DictClass.d[1].foo
        'bar'
    """

    def __init__(self, _dict):
        for key, value in _dict.items():
            if isinstance(value, (list, tuple)):
                setattr(
                    self,
                    key,
                    [DictObject(x) if isinstance(x, dict) else x for x in value],
                )
            else:
                setattr(
                    self, key, DictObject(value) if isinstance(value, dict) else value
                )


class Structure:
    """
    Base class for a data structure class

    NB: No support for **kwags

    :type _fields: list
    :example:
        >>> class Address(Structure):
        ...    _fields = ["hostname", "port"]

        >>> class Point(Structure):
        ....    _fields = ["x", "y"]

        >>> A = Address("localhost", 8080)
        >>> A.hostname
        'localhost'
        >>> A.port
        8080

    """

    _fields = []

    def __init__(self, *args):
        for name, val in zip(self._fields, args):
            setattr(self, name, val)


def list_flatten(lst):
    """
    The flatten function here turns the list into a string, takes out all of the square brackets,
    attaches square brackets back onto the ends, and turns it back into a list.

    :type lst: list
    :example:

    """
    return eval("[" + str(lst).replace("[", "").replace("]", "") + "]")


def dict_search_value(d, kname):
    """Search for a key inside a dictionary, visiting it in a recursive way
    and return the value of this key.

    d: dictionary to search into
    kname: key name to search for
    """
    if type(d) == dict:
        for k, v in d.items():
            if type(v) == dict:
                value = dict_search_value(v, kname)
                if value:
                    return value
            if type(v) == list:
                if len(v) > 0:
                    for element in v:
                        if type(element) == dict:
                            value = dict_search_value(element, kname)
                            if value:
                                return value
            if k == kname:
                return v


def compare_assert_dicts(self, fields, dict_1, dict_2):
    """Given a list of fields/keys and two dictionaries, it searches for each key in both
    dictionaries and assert as equal the found value.

    fields: a list of fields/keys to verify
    dict_1: first dictionary
    dict_2: second dictionary
    """
    for f in fields:
        value_dict1 = dict_search_value(dict_1, f)
        value_dict2 = dict_search_value(dict_2, f)

        if type(value_dict1) is list:
            value_dict1 = list(value_dict1).sort()
        if type(value_dict2) is list:
            value_dict2 = list(value_dict2).sort()

        self.assertEqual(
            value_dict1,
            value_dict2,
            "Returned value: %s, expected value: %s"
            % (str(value_dict1), str(value_dict2)),
        )


def config_to_dict(
    config_file: str, preserve_case: bool = True, pretty_print: bool = False
) -> dict:
    """
    Converts a ConfigParser object into a dictionary.

    The resulting dictionary has sections as keys which point to a dict of the
    sections options as key => value pairs.

    Example:

    $ cat config.ini

    [SectionOne]
    Status: Single
    Name: Derek
    Value: Yes
    Age: 30
    Single: True

    [SectionTwo]
    FavoriteColor = Green
    [SectionThree]
    FamilyName: Johnson

    [Others]
    Route: 66

    $ python
    >>> from py_utils import config_to_dict

    >>> config_file = "config.ini"
    >>> my_config = config_to_dict(config_file, pretty_print=True)
    {   'Others': {'Route': '66'},
        'SectionOne': {   'Age': '30',
                          'Name': 'Derek',
                          'Single': 'True',
                          'Status': 'Single',
                          'Value': 'Yes'},
        'SectionThree': {'FamilyName': 'Johnson'},
        'SectionTwo': {'FavoriteColor': 'Green'}}
    """
    import configparser

    parser = configparser.ConfigParser()
    if not pathlib.Path(config_file).exists():
        raise FileNotFoundError("Config file not parsed!")

    if preserve_case:
        parser.optionxform = lambda option: option

    parser.read(config_file)
    config_dict = {
        section: dict(parser.items(section)) for section in parser.sections()
    }
    if pretty_print:
        pprint(config_dict)
    return config_dict
