"""Nicer config class.
"""

import os
import os.path
import re
import socket
from configparser import MAX_INTERPOLATION_DEPTH, ConfigParser
from configparser import Error as ConfigError
from configparser import (
    ExtendedInterpolation, Interpolation, InterpolationDepthError,
    InterpolationError, NoOptionError, NoSectionError, RawConfigParser,
)
from typing import Dict, List, Mapping, Optional, Sequence, Tuple

import skytools

__all__ = (
    'Config', 'NoOptionError', 'ConfigError',
    'ConfigParser', 'ExtendedConfigParser', 'ExtendedCompatConfigParser'
)


def read_versioned_config(filenames: Sequence[str], main_section: str) -> ConfigParser:
    """Pick syntax based on "config_format" value.
    """
    rcf = RawConfigParser()
    rcf.read(filenames)

    # avoid has_option here, so value can live in DEFAULT section
    ver = rcf.get(main_section, "config_format", fallback="1")
    if ver == "1":
        cf = ConfigParser()
    elif ver == "2":
        cf = ExtendedConfigParser()
    else:
        raise ConfigError('Unsupported config format %r in %r' % (ver, filenames))
    cf.read(filenames)
    return cf


class Config:
    """Bit improved ConfigParser.

    Additional features:
     - Remembers section.
     - Accepts defaults in get() functions.
     - List value support.
    """
    main_section: str               # main section
    filename: Optional[str]         # file name that was loaded
    override: Mapping[str, str]     # override values in config file
    defs: Mapping[str, str]         # defaults visible in all sections
    cf: ConfigParser                # actual ConfigParser instance

    def __init__(self, main_section: str,
                 filename: Optional[str],
                 sane_config: Optional[bytes] = None,   # unused
                 user_defs: Optional[Mapping[str, str]] = None,
                 override: Optional[Mapping[str, str]] = None,
                 ignore_defs: bool = False):
        """Initialize Config and read from file.
        """
        # use config file name as default job_name
        if filename:
            job_name = os.path.splitext(os.path.basename(filename))[0]
        else:
            job_name = main_section

        # initialize defaults, make them usable in config file
        if ignore_defs:
            self.defs = {}
        else:
            self.defs = {
                'job_name': job_name,
                'service_name': main_section,
                'host_name': socket.gethostname(),
            }
            if filename:
                self.defs['config_dir'] = os.path.dirname(filename)
                self.defs['config_file'] = filename
            if user_defs:
                self.defs.update(user_defs)

        self.main_section = main_section
        self.filename = filename
        self.override = override or {}

        if filename is None:
            self.cf = ConfigParser()
            self.cf.add_section(main_section)
        elif not os.path.isfile(filename):
            raise ConfigError('Config file not found: ' + filename)
        else:
            self.cf = read_versioned_config([filename], main_section)

        self.reload()

    def reload(self) -> None:
        """Re-reads config file."""
        if self.filename:
            self.cf.read(self.filename)
        if not self.cf.has_section(self.main_section):
            raise NoSectionError(self.main_section)

        # apply default if key not set
        for k, v in self.defs.items():
            if not self.cf.has_option(self.main_section, k):
                self.cf.set(self.main_section, k, v)

        # apply overrides
        if self.override:
            for k, v in self.override.items():
                self.cf.set(self.main_section, k, v)

    def get(self, key: str, default: Optional[str] = None) -> str:
        """Reads string value, if not set then default."""

        if not self.cf.has_option(self.main_section, key):
            if default is None:
                raise NoOptionError(key, self.main_section)
            return default

        return str(self.cf.get(self.main_section, key))

    def getint(self, key: str, default: Optional[int] = None) -> int:
        """Reads int value, if not set then default."""

        if not self.cf.has_option(self.main_section, key):
            if default is None:
                raise NoOptionError(key, self.main_section)
            return default

        return self.cf.getint(self.main_section, key)

    def getboolean(self, key: str, default: bool = None) -> bool:
        """Reads boolean value, if not set then default."""

        if not self.cf.has_option(self.main_section, key):
            if default is None:
                raise NoOptionError(key, self.main_section)
            return default

        return self.cf.getboolean(self.main_section, key)

    def getfloat(self, key: str, default: float = None) -> float:
        """Reads float value, if not set then default."""

        if not self.cf.has_option(self.main_section, key):
            if default is None:
                raise NoOptionError(key, self.main_section)
            return default

        return self.cf.getfloat(self.main_section, key)

    def getlist(self, key: str, default: Sequence[str] = None) -> Sequence[str]:
        """Reads comma-separated list from key."""

        if not self.cf.has_option(self.main_section, key):
            if default is None:
                raise NoOptionError(key, self.main_section)
            return default

        s = self.get(key).strip()
        res: List[str] = []
        if not s:
            return res
        for v in s.split(","):
            res.append(v.strip())
        return res

    def getdict(self, key: str, default: Optional[Mapping[str, str]] = None) -> Mapping[str, str]:
        """Reads key-value dict from parameter.

        Key and value are separated with ':'.  If missing,
        key itself is taken as value.
        """

        if not self.cf.has_option(self.main_section, key):
            if default is None:
                raise NoOptionError(key, self.main_section)
            return default

        s = self.get(key).strip()
        res: Dict[str, str] = {}
        if not s:
            return res
        for kv in s.split(","):
            tmp = kv.split(':', 1)
            if len(tmp) > 1:
                k = tmp[0].strip()
                v = tmp[1].strip()
            else:
                k = kv.strip()
                v = k
            res[k] = v
        return res

    def getfile(self, key: str, default: Optional[str] = None) -> str:
        """Reads filename from config.

        In addition to reading string value, expands ~ to user directory.
        """
        fn = self.get(key, default)
        if fn == "" or fn == "-":
            return fn
        # simulate that the cwd is script location
        #path = os.path.dirname(sys.argv[0])
        #  seems bad idea, cwd should be cwd

        fn = os.path.expanduser(fn)

        return fn

    def getbytes(self, key: str, default: Optional[str] = None) -> int:
        """Reads a size value in human format, if not set then default.

        Examples: 1, 2 B, 3K, 4 MB
        """

        if not self.cf.has_option(self.main_section, key):
            if default is None:
                raise NoOptionError(key, self.main_section)
            s = default
        else:
            s = self.cf.get(self.main_section, key)

        return skytools.hsize_to_bytes(s)

    def get_wildcard(self, key, values=(), default=None):
        """Reads a wildcard property from conf and returns its string value, if not set then default."""

        orig_key = key
        keys = [key]

        for wild in values:
            key = key.replace('*', wild, 1)
            keys.append(key)
        keys.reverse()

        for k in keys:
            if self.cf.has_option(self.main_section, k):
                return self.cf.get(self.main_section, k)

        if default is None:
            raise NoOptionError(orig_key, self.main_section)
        return default

    def sections(self) -> Sequence[str]:
        """Returns list of sections in config file, excluding DEFAULT."""
        return self.cf.sections()

    def has_section(self, section: str) -> bool:
        """Checks if section is present in config file, excluding DEFAULT."""
        return self.cf.has_section(section)

    def clone(self, main_section: str) -> "Config":
        """Return new Config() instance with new main section on same config file."""
        return Config(main_section, self.filename)

    def options(self) -> Sequence[str]:
        """Return list of options in main section."""
        return self.cf.options(self.main_section)

    def has_option(self, opt: str) -> bool:
        """Checks if option exists in main section."""
        return self.cf.has_option(self.main_section, opt)

    def items(self) -> Sequence[Tuple[str, str]]:
        """Returns list of (name, value) for each option in main section."""
        return self.cf.items(self.main_section)

    # define some aliases (short-cuts / backward compatibility cruft)
    getbool = getboolean


class ExtendedInterpolationCompat(Interpolation):
    _EXT_VAR_RX = r'\$\$|\$\{[^(){}]+\}'
    _OLD_VAR_RX = r'%%|%\([^(){}]+\)s'
    _var_rc = re.compile('(%s|%s)' % (_EXT_VAR_RX, _OLD_VAR_RX))
    _bad_rc = re.compile('[%$]')

    def before_get(self, parser, section, option, rawval, defaults):
        dst = []
        self._interpolate_ext(dst, parser, section, option, rawval, defaults, set())
        return ''.join(dst)

    def before_set(self, parser, section, option, value):
        sub = self._var_rc.sub('', value)
        if self._bad_rc.search(sub):
            raise ValueError("invalid interpolation syntax in %r" % value)
        return value

    def _interpolate_ext(self, dst, parser, section, option, rawval, defaults, loop_detect):
        if not rawval:
            return

        if len(loop_detect) > MAX_INTERPOLATION_DEPTH:
            raise InterpolationDepthError(option, section, rawval)

        xloop = (section, option)
        if xloop in loop_detect:
            raise InterpolationError(section, option, 'Loop detected: %r in %r' % (xloop, loop_detect))
        loop_detect.add(xloop)

        parts = self._var_rc.split(rawval)
        for i, frag in enumerate(parts):
            fullkey = None
            use_vars = defaults
            if i % 2 == 0:
                dst.append(frag)
                continue
            if frag in ('$$', '%%'):
                dst.append(frag[0])
                continue
            if frag.startswith('${') and frag.endswith('}'):
                fullkey = frag[2:-1]

                # use section access only for new-style keys
                if ':' in fullkey:
                    ksect, key = fullkey.split(':', 1)
                    use_vars = None
                else:
                    ksect, key = section, fullkey
            elif frag.startswith('%(') and frag.endswith(')s'):
                fullkey = frag[2:-2]
                ksect, key = section, fullkey
            else:
                raise InterpolationError(section, option, 'Internal parse error: %r' % frag)

            key = parser.optionxform(key)
            newpart = parser.get(ksect, key, raw=True, vars=use_vars)
            if newpart is None:
                raise InterpolationError(ksect, key, 'Key referenced is None')
            self._interpolate_ext(dst, parser, ksect, key, newpart, defaults, loop_detect)

        loop_detect.remove(xloop)


class ExtendedConfigParser(ConfigParser):
    """ConfigParser that uses Python3-style extended interpolation by default.

    Syntax: ${var} and ${section:var}
    """
    _DEFAULT_INTERPOLATION: Interpolation = ExtendedInterpolation()


class ExtendedCompatConfigParser(ExtendedConfigParser):
    r"""Support both extended "${}" syntax from python3 and old "%()s" too.

    New ${} syntax allows ${key} to refer key in same section,
    and ${sect:key} to refer key in other sections.
    """
    _DEFAULT_INTERPOLATION: Interpolation = ExtendedInterpolationCompat()

