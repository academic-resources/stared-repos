#! /bin/sh

# will be run inside manylinux docker

#
# https://github.com/pypa/manylinux         - prebuilt images
# https://www.python.org/dev/peps/pep-0513/ - manylinux1
# https://www.python.org/dev/peps/pep-0571/ - manylinux2010
# https://www.python.org/dev/peps/pep-0599/ - manylinux2014
# https://www.python.org/dev/peps/pep-0600/ - manylinux_x_y
#

set -e
set -x

PYLIST="cp36-cp36m"
PYDEPS=""
DSTDIR="dist"
BLDDIR="build/${AUDITWHEEL_PLAT}"
WHEELOPTS="--build-option --py-limited-api=cp36"
PIPOPTS="--no-cache-dir --disable-pip-version-check"

# build initial wheel
build_wheel() {
    if test -n "${PYDEPS}"; then
        pip install ${PIPOPTS} -U ${PYDEPS}
    fi
    pip wheel ${PIPOPTS} -w "${BLDDIR}" $WHEELOPTS .
}

# build wheels for requested python versions
for tag in ${PYLIST}; do
    PATH="/opt/python/${tag}/bin:${PATH}" \
    build_wheel
done

# use auditwheel to rebuild wheels in BLDDIR to DSTDIR
for whl in "${BLDDIR}"/*.whl; do
    auditwheel repair -w "${DSTDIR}" "${whl}"
done

