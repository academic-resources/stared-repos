"""Various low-level utility functions for sockets."""


import os
import socket
import sys
from typing import Optional, Union

try:
    import fcntl
except ImportError:
    fcntl = None    # type: ignore

from .basetypes import FileDescriptorLike

__all__ = (
    'set_tcp_keepalive', 'set_nonblocking', 'set_cloexec',
)

SocketLike = Union[socket.socket, FileDescriptorLike]


def set_tcp_keepalive(fd: SocketLike, keepalive: bool = True, tcp_keepidle: int = 4 *
                      60, tcp_keepcnt: int = 4, tcp_keepintvl: int = 15) -> None:
    """Turn on TCP keepalive.  The fd can be either numeric or socket
    object with 'fileno' method.

    OS defaults for SO_KEEPALIVE=1:
     - Linux: (7200, 9, 75) - can configure all.
     - MacOS: (7200, 8, 75) - can configure only tcp_keepidle.
     - Win32: (7200, 5|10, 1) - can configure tcp_keepidle and tcp_keepintvl.

    Our defaults: (240, 4, 15).
    """

    # usable on this OS?
    if not hasattr(socket, 'SO_KEEPALIVE') or not hasattr(socket, 'fromfd'):
        return

    # need socket object
    if isinstance(fd, socket.SocketType):
        s = fd
    else:
        if not isinstance(fd, int):
            fd = fd.fileno()
        s = socket.fromfd(fd, socket.AF_INET, socket.SOCK_STREAM)

    # skip if unix socket
    if getattr(socket, 'AF_UNIX', None):
        if not isinstance(s.getsockname(), tuple):
            return

    # no keepalive?
    if not keepalive:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, 0)
        return

    # basic keepalive
    s.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1)

    # detect available options
    TCP_KEEPCNT = getattr(socket, 'TCP_KEEPCNT', None)
    TCP_KEEPINTVL = getattr(socket, 'TCP_KEEPINTVL', None)
    TCP_KEEPIDLE = getattr(socket, 'TCP_KEEPIDLE', None)
    TCP_KEEPALIVE = getattr(socket, 'TCP_KEEPALIVE', None)
    SIO_KEEPALIVE_VALS = getattr(socket, 'SIO_KEEPALIVE_VALS', None)
    if TCP_KEEPIDLE is None and TCP_KEEPALIVE is None and sys.platform == 'darwin':
        TCP_KEEPALIVE = 0x10

    # configure
    if TCP_KEEPCNT is not None:
        s.setsockopt(socket.IPPROTO_TCP, TCP_KEEPCNT, tcp_keepcnt)
    if TCP_KEEPINTVL is not None:
        s.setsockopt(socket.IPPROTO_TCP, TCP_KEEPINTVL, tcp_keepintvl)
    if TCP_KEEPIDLE is not None:
        s.setsockopt(socket.IPPROTO_TCP, TCP_KEEPIDLE, tcp_keepidle)
    elif TCP_KEEPALIVE is not None:
        s.setsockopt(socket.IPPROTO_TCP, TCP_KEEPALIVE, tcp_keepidle)
    elif SIO_KEEPALIVE_VALS is not None and fcntl:
        fcntl.ioctl(s.fileno(), SIO_KEEPALIVE_VALS, (1, tcp_keepidle * 1000, tcp_keepintvl * 1000))  # type: ignore


def set_nonblocking(fd: SocketLike, onoff: Optional[bool] = True):
    """Toggle the O_NONBLOCK flag.

    If onoff==None then return current setting.

    Actual sockets from 'socket' module should use .setblocking() method,
    this is for situations where it is not available.  Eg. pipes
    from 'subprocess' module.
    """
    if fcntl is None:
        return onoff

    flags = fcntl.fcntl(fd, fcntl.F_GETFL)
    if onoff is None:
        return (flags & os.O_NONBLOCK) > 0
    if onoff:
        flags |= os.O_NONBLOCK
    else:
        flags &= ~os.O_NONBLOCK
    fcntl.fcntl(fd, fcntl.F_SETFL, flags)
    return onoff


def set_cloexec(fd: SocketLike, onoff: Optional[bool] = True) -> bool:
    """Toggle the FD_CLOEXEC flag.

    If onoff==None then return current setting.

    Some libraries do it automatically (eg. libpq).
    Others do not (Python stdlib).
    """
    if fcntl is None:
        return True

    flags = fcntl.fcntl(fd, fcntl.F_GETFD)
    if onoff is None:
        return (flags & fcntl.FD_CLOEXEC) > 0
    if onoff:
        flags |= fcntl.FD_CLOEXEC
    else:
        flags &= ~fcntl.FD_CLOEXEC
    fcntl.fcntl(fd, fcntl.F_SETFD, flags)
    return onoff

