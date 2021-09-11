"""Helper classes for complex query generation.

Main target is code execution under PL/Python.

Query parameters are referenced as C{{key}} or C{{key:type}}.
Type will be given to C{plpy.prepare}.
If C{type} is missing, C{text} is assumed.

See L{plpy_exec} for examples.
"""

import json
import re
from functools import lru_cache
from typing import Any, Dict, List, Mapping, Optional, Sequence, Union

import skytools

from .basetypes import Cursor

try:
    import plpy
except ImportError:
    plpy = None

__all__ = (
    'QueryBuilder', 'PLPyQueryBuilder', 'PLPyQuery', 'plpy_exec',
    "run_query", "run_query_row", "run_lookup", "run_exists",
)

PARAM_INLINE = 0  # quote_literal()
PARAM_DBAPI = 1  # %()s
PARAM_PLPY = 2   # $n

_RC_PARAM = re.compile(r"""
    \{  ( [^|{}:]* )
        (?:  : ( [^|{}:]+ ) )?
        (?: \| ( [^|{}:]+ ) )?
    ( \} )?
""", re.X)


def _inline_to_text(val: Any) -> Optional[str]:
    """Approx emulate PL/Python and Psycopg2 internal conversions
    for common types.
    """
    if val is None or isinstance(val, str):
        return val
    if isinstance(val, dict):
        return json.dumps(val)
    if isinstance(val, (tuple, list)):
        return skytools.make_pgarray(val)
    if isinstance(val, bytes):
        return "\\x" + val.hex()
    return str(val)


class QArgConf:
    """Per-query arg-type config object."""
    param_type = PARAM_INLINE


class QArg:
    """Place-holder for a query parameter."""
    def __init__(self, name: str, value: Any, pos: int, conf: QArgConf):
        self.name = name
        self.value = value
        self.pos = pos
        self.conf = conf
    def __str__(self) -> str:
        if self.conf.param_type == PARAM_INLINE:
            return skytools.quote_literal(_inline_to_text(self.value))
        elif self.conf.param_type == PARAM_DBAPI:
            return "%s"
        elif self.conf.param_type == PARAM_PLPY:
            return "$%d" % self.pos
        else:
            raise Exception("bad QArgConf.param_type")


class PlanCache:
    """Cache for limited amount of plans."""

    def __init__(self, maxplans: int = 100):
        self.maxplans = maxplans

        @lru_cache(maxplans)
        def _cached_prepare(key):
            sql, types = key
            return plpy.prepare(sql, types)

        self._cached_prepare = _cached_prepare

    def get_plan(self, sql: str, types: Sequence[str]):
        """Prepare the plan and cache it."""
        key = (sql, tuple(types))
        return self._cached_prepare(key)


class QueryBuilderCore:
    """Helper for query building.
    """

    _params: Optional[Mapping[str, Any]]
    _arg_type_list: List[str]
    _arg_value_list: List[Any]
    _sql_parts: List[Union[str, QArg]]
    _arg_conf: QArgConf
    _nargs: int

    def __init__(self, sqlexpr: str, params: Optional[Mapping[str, Any]]):
        """Init the object.

        @param sqlexpr:     Partial sql fragment.
        @param params:      Dict of parameter values.
        """
        self._params = params
        self._arg_type_list = []
        self._arg_value_list = []
        self._sql_parts = []
        self._arg_conf = QArgConf()
        self._nargs = 0

        if sqlexpr:
            self.add(sqlexpr, required=True)

    def add(self, expr: str, sql_type: str = "text", required: bool = False):
        """Add SQL fragment to query.
        """
        self._add_expr('', expr, self._params, sql_type, required)

    def get_sql(self, param_type: int = PARAM_INLINE):
        """Return generated SQL (thus far) as string.

        Possible values for param_type:
            - 0: Insert values quoted with quote_literal()
            - 1: Insert %()s in place of parameters.
            - 2: Insert $n in place of parameters.
        """
        self._arg_conf.param_type = param_type
        tmp = [str(part) for part in self._sql_parts]
        return "".join(tmp)

    def _add_expr(self, pfx: str, expr: str, params: Optional[Mapping[str, Any]], sql_type: str, required: bool):
        parts: List[Union[str, QArg]] = []
        types: List[str] = []
        values: List[Any] = []
        nargs = self._nargs
        if pfx:
            parts.append(pfx)
        pos = 0
        while True:
            # find next argument
            m = _RC_PARAM.search(expr, pos)
            if not m:
                parts.append(expr[pos:])
                break

            # add plain sql
            parts.append(expr[pos:m.start()])
            pos = m.end()

            # get arg name and type
            kparam, ktype, alt_frag, tag = m.groups()
            if not kparam or not tag:
                raise ValueError("invalid tag syntax: <%s>" % m.group(0))
            if not ktype:
                ktype = sql_type

            # params==None means params are checked later
            if params is None:
                if alt_frag is not None:
                    raise ValueError("alt_frag not supported with params=None")
            elif kparam not in params:
                if alt_frag is not None:
                    parts.append(alt_frag)
                    continue
                elif required:
                    raise Exception("required parameter missing: " + kparam)
                # optional fragment, param missing, skip it
                return

            # got arg
            nargs += 1
            if params is not None:
                val = params[kparam]
            else:
                val = kparam
            values.append(val)
            types.append(ktype)
            arg = QArg(kparam, val, nargs, self._arg_conf)
            parts.append(arg)

        # add interesting parts to the main sql
        self._sql_parts.extend(parts)
        if types:
            self._arg_type_list.extend(types)
        if values:
            self._arg_value_list.extend(values)
        self._nargs = nargs


class QueryBuilder(QueryBuilderCore):
    def execute(self, curs: Cursor) -> None:
        """Client-side query execution on DB-API 2.0 cursor.

        Calls C{curs.execute()} with proper arguments.

        Does not return anything, curs.fetch* methods
        must be called to get result.
        """
        q = self.get_sql(PARAM_DBAPI)
        args = self._params
        curs.execute(q, args)


class PLPyQueryBuilder(QueryBuilderCore):

    def __init__(self, sqlexpr: str, params: Optional[Mapping[str, Any]],
                 plan_cache: Dict[str, Any] = None,
                 sqls: Optional[List[Dict[str, str]]] = None):
        """Init the object.

        @param sqlexpr:     Partial sql fragment.
        @param params:      Dict of parameter values.
        @param plan_cache:  (PL/Python) A dict object where to store the plan cache, under the key C{"plan_cache"}.
                            If not given, plan will not be cached and values will be inserted directly
                            to query.  Usually either C{GD} or C{SD} should be given here.
        @param sqls:        list object where to append executed sqls (used for debugging)
        """
        super().__init__(sqlexpr, params)
        self._sqls = sqls

        if plan_cache is not None:
            if 'plan_cache' not in plan_cache:
                plan_cache['plan_cache'] = PlanCache()
            self._plan_cache = plan_cache['plan_cache']
        else:
            self._plan_cache = None

    def execute(self) -> Sequence[skytools.dbdict]:
        """Server-side query execution via plpy.

        Query can be run either cached or uncached, depending
        on C{plan_cache} setting given to L{__init__}.

        Returns result of plpy.execute().
        """

        args = self._arg_value_list
        types = self._arg_type_list

        if self._sqls is not None:
            self._sqls.append({"sql": self.get_sql(PARAM_INLINE)})

        sql = self.get_sql(PARAM_PLPY)
        if self._plan_cache is not None:
            plan = self._plan_cache.get_plan(sql, types)
        else:
            plan = plpy.prepare(sql, types)

        res = plpy.execute(plan, args)
        if res:
            res = [skytools.dbdict(r) for r in res]
        return res


class PLPyQuery:
    """Static, cached PL/Python query that uses QueryBuilder formatting.

    See L{plpy_exec} for simple usage.
    """
    def __init__(self, sql: str):
        qb = QueryBuilder(sql, None)
        p_sql = qb.get_sql(PARAM_PLPY)
        p_types = qb._arg_type_list
        self.plan = plpy.prepare(p_sql, p_types)
        self.arg_map = qb._arg_value_list
        self.sql = sql

    def execute(self, arg_dict: Mapping[str, Any], all_keys_required=True) -> Sequence[skytools.dbdict]:
        try:
            if all_keys_required:
                arg_list = [arg_dict[k] for k in self.arg_map]
            else:
                arg_list = [arg_dict.get(k) for k in self.arg_map]
            res = plpy.execute(self.plan, arg_list)
            if res:
                return [skytools.dbdict(row) for row in res]
            return res
        except KeyError:
            need = set(self.arg_map)
            got = set(arg_dict.keys())
            missing = list(need.difference(got))
            plpy.error("Missing arguments: [%s]  QUERY: %s" % (
                ','.join(missing), repr(self.sql)))
            raise ValueError("unreachable") from None

    def __repr__(self) -> str:
        return 'PLPyQuery<%s>' % self.sql


def plpy_exec(gd: Optional[Dict[str, Any]],
              sql: str,
              args: Optional[Mapping[str, Any]],
              all_keys_required=True) -> Sequence[skytools.dbdict]:
    """Cached plan execution for PL/Python.

    @param gd:  dict to store cached plans under.  If None, caching is disabled.
    @param sql: SQL statement to execute.
    @param args: dict of arguments to query.
    @param all_keys_required: if False, missing key is taken as NULL, instead of throwing error.
    """

    if gd is None:
        return PLPyQueryBuilder(sql, args).execute()

    try:
        sq = gd['plq_cache'][sql]
    except KeyError:
        if 'plq_cache' not in gd:
            gd['plq_cache'] = {}
        sq = PLPyQuery(sql)
        gd['plq_cache'][sql] = sq
    return sq.execute(args, all_keys_required)


# some helper functions for convenient sql execution

def run_query(cur: Cursor, sql: str,
              params: Optional[Mapping[str, Any]] = None,
              **kwargs: Any
              ) -> List[skytools.dbdict]:
    """ Helper function if everything you need is just paramertisized execute
        Sets rows_found that is coneninet to use when you don't need result just
        want to know how many rows were affected
    """
    params = params or kwargs
    sql = QueryBuilder(sql, params).get_sql(0)
    cur.execute(sql)
    rows = cur.fetchall()
    # convert result rows to dbdict
    if rows:
        return [skytools.dbdict(r) for r in rows]
    return []


def run_query_row(cur: Cursor, sql: str, params: Optional[Mapping[str, Any]] = None, **kwargs: Any
                  ) -> Optional[skytools.dbdict]:
    """ Helper function if everything you need is just paramertisized execute to
        fetch one row only. If not found none is returned
    """
    params = params or kwargs
    rows = run_query(cur, sql, params)
    if len(rows) == 0:
        return None
    return rows[0]


def run_lookup(cur: Cursor, sql: str, params: Optional[Mapping[str, Any]] = None, **kwargs: Any) -> Any:
    """ Helper function to fetch one value Takes away all the hassle of preparing statements
        and processing returned result giving out just one value.
    """
    params = params or kwargs
    sql = QueryBuilder(sql, params).get_sql(0)
    cur.execute(sql)
    row = cur.fetchone()
    if row is None:
        return None
    return row[0]


def run_exists(cur: Cursor, sql: str, params: Optional[Mapping[str, Any]] = None, **kwargs: Any) -> bool:
    """ Helper function to fetch one value Takes away all the hassle of preparing statements
        and processing returned result giving out just one value.
    """
    params = params or kwargs
    val = run_lookup(cur, sql, params)
    return val is not None


# fake plpy for testing
class fake_plpy:
    log: List[str] = []
    def prepare(self, sql, types):
        self.log.append("DBG: plpy.prepare(%s, %s)" % (repr(sql), repr(types)))
        return ('PLAN', sql, types)

    def execute(self, plan, args=()):
        self.log.append("DBG: plpy.execute(%s, %s)" % (repr(plan), repr(args)))

    def error(self, msg):
        self.log.append("DBG: plpy.error(%s)" % repr(msg))
        raise Exception("plpy.error")


# make plpy available
if not plpy:
    plpy = fake_plpy()
    GD: Dict[str, Any] = {}

