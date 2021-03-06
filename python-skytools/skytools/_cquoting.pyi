from typing import Any, Optional, Mapping, Dict

def quote_literal(s: Any) -> str: ...
def quote_copy(s: Any) -> str: ...
def quote_bytea_raw(s: bytes) -> str: ...
def db_urlencode(dict_val: Mapping[str, Any]) -> str: ...
def db_urldecode(qs: str) -> Dict[str, Optional[str]]: ...
def unescape(val: str) -> str: ...
def unquote_literal(val: str, stdstr: bool = False) -> Optional[str]: ...
