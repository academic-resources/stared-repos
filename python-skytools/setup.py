"""Setup for skytools module.
"""

from setuptools import Extension, setup

# load version
_version = None
with open("skytools/installer_config.py") as f:
    for ln in f:
        if ln.startswith("package_version"):
            _version = ln.split()[2].strip("\"'")
assert _version

# load info
with open("README.rst") as f:
    ldesc = f.read().strip()
    sdesc = ldesc.split("\n")[0].split("-", 1)[-1].strip()

# use only stable abi
abi3_options = dict(
    define_macros=[('Py_LIMITED_API', '0x03050000')],
    py_limited_api=True,
)

# run actual setup
setup(
    name="skytools",
    description="Utilities for database scripts",
    long_description=ldesc,
    version=_version,
    license="ISC",
    url="https://github.com/pgq/python-skytools",
    maintainer="Marko Kreen",
    maintainer_email="markokr@gmail.com",
    packages=["skytools"],
    package_data={"skytools": ["py.typed", "_chashtext.pyi", "_cquoting.pyi"]},
    ext_modules = [
        Extension("skytools._cquoting", ["modules/cquoting.c"], **abi3_options),
        Extension("skytools._chashtext", ["modules/hashtext.c"], **abi3_options),
    ],
    zip_safe=False,
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Console",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: ISC License (ISCL)",
        "Operating System :: MacOS :: MacOS X",
        "Operating System :: Microsoft :: Windows",
        "Operating System :: POSIX",
        "Programming Language :: Python :: 3",
        "Topic :: Database",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Utilities",
    ],
)

