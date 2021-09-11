
import logging

import skytools
from skytools import skylog


def test_trace_setup():
    assert skylog.TRACE < logging.DEBUG
    assert skylog.TRACE == logging.TRACE
    assert logging.getLevelName(skylog.TRACE) == "TRACE"


def test_skylog():
    log = skytools.getLogger("test.skylog")
    log.trace("tracemsg")

    assert not log.isEnabledFor(logging.TRACE)

