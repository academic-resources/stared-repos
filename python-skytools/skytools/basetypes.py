"""Database tools.
"""

import io
from typing import (
    IO, Any, Iterable, Mapping, Optional, Sequence, Tuple, Type, Union,
)

try:
    from typing import Protocol
except ImportError:
    Protocol = object   # type: ignore


ExecuteParams = Union[Sequence[Any], Mapping[str, Any]]


class DictRow(Protocol):
    """Allow both key and index-based access.

    Both Psycopg2 DictRow and PL/Python rows support this.
    """
    def keys(self) -> Iterable[str]: raise NotImplementedError
    def values(self) -> Iterable[Any]: raise NotImplementedError
    def items(self) -> Iterable[Tuple[str, Any]]: raise NotImplementedError
    def get(self, key: str, default: Any = None) -> Any: raise NotImplementedError
    def __getitem__(self, key: Union[str, int]) -> Any: raise NotImplementedError
    def __iter__(self) -> Iterable[str]: raise NotImplementedError
    def __len__(self) -> int: raise NotImplementedError
    def __contains__(self, key: str) -> bool: raise NotImplementedError


class Cursor(Protocol):
    @property
    def rowcount(self) -> int: raise NotImplementedError
    def execute(self, sql: str, params: Optional[ExecuteParams] = None) -> None: raise NotImplementedError
    def fetchall(self) -> Sequence[DictRow]: raise NotImplementedError
    def fetchone(self) -> DictRow: raise NotImplementedError
    def __enter__(self) -> "Cursor": raise NotImplementedError
    def __exit__(self, typ: Type, value: Any, traceback: Any) -> Any: raise NotImplementedError
    def copy_expert(
        self, sql: str,
        f: Union[IO[str], IO[bytes], io.TextIOBase, io.RawIOBase],
        size: int = 8192
    ) -> None:
        raise NotImplementedError


class Connection(Protocol):
    def cursor(self) -> Cursor: raise NotImplementedError
    def rollback(self) -> None: raise NotImplementedError
    def commit(self) -> None: raise NotImplementedError


class Runnable(Protocol):
    def run(self) -> None: raise NotImplementedError


class HasFileno(Protocol):
    def fileno(self) -> int: raise NotImplementedError


FileDescriptor = int
FileDescriptorLike = Union[int, HasFileno]

