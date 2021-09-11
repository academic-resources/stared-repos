"""File utilities
"""

import errno
import os
import sys
from typing import Optional, Union

__all__ = ['write_atomic', 'signal_pidfile']


def write_atomic_unix(fn: str, data: Union[bytes, str], bakext: Optional[str] = None, mode: str = 'b'):
    """Write file with rename."""

    if mode not in ['', 'b', 't']:
        raise ValueError("unsupported fopen mode")
    if mode == 'b' and not isinstance(data, bytes):
        data = data.encode('utf8')

    # write new data to tmp file
    fn2 = fn + '.new'
    with open(fn2, 'w' + mode) as f:
        f.write(data)

    # link old data to bak file
    if bakext:
        if bakext.find('/') >= 0:
            raise ValueError("invalid bakext")
        fnb = fn + bakext
        try:
            os.unlink(fnb)
        except OSError as e:
            if e.errno != errno.ENOENT:
                raise
        try:
            os.link(fn, fnb)
        except OSError as e:
            if e.errno != errno.ENOENT:
                raise

    # win32 does not like replace
    if sys.platform == 'win32':
        try:
            os.remove(fn)
        except BaseException:
            pass

    # atomically replace file
    os.rename(fn2, fn)


def signal_pidfile(pidfile: str, sig: int) -> bool:
    """Send a signal to process whose ID is located in pidfile.

    Read only first line of pidfile to support multiline
    pidfiles like postmaster.pid.

    Returns True is successful, False if pidfile does not exist
    or process itself is dead.  Any other errors will passed
    as exceptions."""

    ln = ''
    try:
        with open(pidfile, 'r') as f:
            ln = f.readline().strip()
        pid = int(ln)
        if sig == 0 and sys.platform == 'win32':
            return win32_detect_pid(pid)
        os.kill(pid, sig)
        return True
    except (IOError, OSError) as ex:
        if ex.errno not in (errno.ESRCH, errno.ENOENT):
            raise
    except ValueError:
        # this leaves slight race when someone is just creating the file,
        # but more common case is old empty file.
        if not ln:
            return False
        raise ValueError('Corrupt pidfile: %s' % pidfile) from None
    return False


def win32_detect_pid(pid: int) -> bool:
    """Process detection for win32."""

    # avoid pywin32 dependecy, use ctypes instead
    import ctypes

    # win32 constants
    PROCESS_QUERY_INFORMATION = 1024
    STILL_ACTIVE = 259
    ERROR_INVALID_PARAMETER = 87
    ERROR_ACCESS_DENIED = 5

    # Load kernel32.dll
    k = ctypes.windll.kernel32  # type: ignore
    OpenProcess = k.OpenProcess
    OpenProcess.restype = ctypes.c_void_p

    # query pid exit code
    h = OpenProcess(PROCESS_QUERY_INFORMATION, 0, pid)
    if h is None:
        err = k.GetLastError()
        if err == ERROR_INVALID_PARAMETER:
            return False
        if err == ERROR_ACCESS_DENIED:
            return True
        raise OSError(errno.EFAULT, "Unknown win32error: " + str(err))
    code = ctypes.c_int()
    k.GetExitCodeProcess(h, ctypes.byref(code))
    k.CloseHandle(h)
    return code.value == STILL_ACTIVE


def win32_write_atomic(fn: str, data: Union[bytes, str], bakext: Optional[str] = None, mode: str = 'b'):
    """Write file with rename for win32."""

    if mode not in ['', 'b', 't']:
        raise ValueError("unsupported fopen mode")

    if mode == 'b' and not isinstance(data, bytes):
        data = data.encode('utf8')

    # write new data to tmp file
    fn2 = fn + '.new'
    with open(fn2, 'w' + mode) as f:
        f.write(data)

    # move old data to bak file
    if bakext:
        if bakext.find('/') >= 0:
            raise ValueError("invalid bakext")
        fnb = fn + bakext
        try:
            os.remove(fnb)
        except OSError as e:
            if e.errno != errno.ENOENT:
                raise
        try:
            os.rename(fn, fnb)
        except OSError as e:
            if e.errno != errno.ENOENT:
                raise
    else:
        try:
            os.remove(fn)
        except BaseException:
            pass

    # replace file
    os.rename(fn2, fn)


if sys.platform == 'win32':
    write_atomic = win32_write_atomic
else:
    write_atomic = write_atomic_unix

