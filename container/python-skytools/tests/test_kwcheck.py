"""Check if SQL keywords are up-to-date.
"""

import os.path
import re

import skytools.quoting

versions = [
    "94", "95", "96", "9.4", "9.5", "9.6",
    "10", "11", "12", "13", "14",
    "15", "16", "17", "18", "19"
]

locations = [
    "/usr/include/postgresql/{VER}/server/parser/kwlist.h",
    "~/src/pgsql/pg{VER}/src/include/parser/kwlist.h",
    "~/src/pgsql/postgresql/src/include/parser/kwlist.h",
]


def _load_kwlist(fn, full_map, cur_map):
    fn = os.path.expanduser(fn)
    if not os.path.isfile(fn):
        return
    with open(fn, 'rt') as f:
        data = f.read()
    rc = re.compile(r'PG_KEYWORD[(]"(.*)" , \s* \w+ , \s* (\w+) [)]', re.X)
    for kw, cat in rc.findall(data):
        full_map[kw] = cat
        if cat == 'UNRESERVED_KEYWORD':
            continue
        if cat == 'COL_NAME_KEYWORD':
            continue
        cur_map[kw] = cat


def test_kwcheck():
    """Compare keyword list in quoting.py to the one in postgres sources
    """

    kwset = set(skytools.quoting._ident_kwmap)
    full_map = {}           # all types from kwlist.h
    cur_map = {}            # only kwlist.h
    new_list = []           # missing from kwset
    obsolete_list = []      # in kwset, but not in cur_map

    done = set()
    for loc in locations:
        for ver in versions:
            fn = loc.format(VER=ver)
            if fn not in done:
                _load_kwlist(fn, full_map, cur_map)
                done.add(fn)

    if not full_map:
        return

    for kw in sorted(cur_map):
        if kw not in kwset:
            new_list.append((kw, cur_map[kw]))
        kwset.add(kw)

    for k in sorted(kwset):
        if k not in full_map:
            # especially obsolete
            obsolete_list.append((k, '!FULL'))
        elif k not in cur_map:
            # slightly obsolete
            obsolete_list.append((k, '!CUR'))

    assert new_list == []

    # here we need to keep older keywords around longer
    #assert obsolete_list == []

    # [('between', '!CUR'), ('errors', '!FULL'), ('new', '!CUR'),
    #  ('off', '!CUR'), ('old', '!CUR'), ('over', '!CUR')]

