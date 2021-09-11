
import os
import signal
import sys
import time

import pytest

import skytools
from skytools.scripting import run_single_process

WIN32 = sys.platform == "win32"
CONF = os.path.join(os.path.dirname(__file__), "config.ini")

TEST_DB = os.environ.get("TEST_DB")


def checklog(log, word):
    with open(log, 'r') as f:
        return word in f.read()


class Runner:
    def __init__(self, logfile, word, sleep=0):
        self.logfile = logfile
        self.word = word
        self.sleep = sleep
    def run(self):
        with open(self.logfile, "a") as f:
            f.write(self.word + "\n")
        time.sleep(self.sleep)


@pytest.mark.skipif(WIN32, reason="cannot daemonize on win32")
def test_bg_process(tmp_path):
    pidfile = str(tmp_path / "proc.pid")
    logfile = str(tmp_path / "proc.log")

    run_single_process(Runner(logfile, "STEP1"), False, pidfile)
    while skytools.signal_pidfile(pidfile, 0):
        time.sleep(1)
    assert checklog(logfile, "STEP1")

    # daemonize from other process
    pid = os.fork()
    if pid == 0:
        run_single_process(Runner(logfile, "STEP2", 10), True, pidfile)

    time.sleep(2)
    with pytest.raises(SystemExit):
        run_single_process(Runner(logfile, "STEP3"), False, pidfile)
    skytools.signal_pidfile(pidfile, signal.SIGTERM)
    while skytools.signal_pidfile(pidfile, 0):
        time.sleep(1)

    assert checklog(logfile, "STEP2")
    assert not checklog(logfile, "STEP3")


class OptScript(skytools.BaseScript):
    ARGPARSE = False
    looping = 0

    def send_signal(self, code):
        print("signal: %s" % code)
        sys.exit(0)

    def work(self):
        print("opt=%s" % self.cf.get("opt"))


class ArgScript(OptScript):
    ARGPARSE = True


def test_optparse_script(capsys):
    with pytest.raises(SystemExit):
        OptScript("testscript", ["-h"])
    res = capsys.readouterr()
    assert "display" in res.out


def test_argparse_script(capsys):
    with pytest.raises(SystemExit):
        ArgScript("testscript", ["-h"])
    res = capsys.readouterr()
    assert "display" in res.out


@pytest.mark.skipif(WIN32, reason="use signals on win32")
def test_optparse_signals(capsys):
    with pytest.raises(SystemExit):
        OptScript("testscript", ["-s", CONF])
    res = capsys.readouterr()
    assert "SIGINT" in res.out

    with pytest.raises(SystemExit):
        OptScript("testscript", ["-r", CONF])
    res = capsys.readouterr()
    assert "SIGHUP" in res.out

    with pytest.raises(SystemExit):
        OptScript("testscript", ["-k", CONF])
    res = capsys.readouterr()
    assert "SIGTERM" in res.out


@pytest.mark.skipif(WIN32, reason="need to use signals")
def test_argparse_signals(capsys):
    with pytest.raises(SystemExit):
        ArgScript("testscript", ["-s", CONF])
    res = capsys.readouterr()
    assert "SIGINT" in res.out

    with pytest.raises(SystemExit):
        ArgScript("testscript", ["-r", CONF])
    res = capsys.readouterr()
    assert "SIGHUP" in res.out

    with pytest.raises(SystemExit):
        ArgScript("testscript", ["-k", CONF])
    res = capsys.readouterr()
    assert "SIGTERM" in res.out


def test_optparse_confopt(capsys):
    s = ArgScript("testscript", [CONF])
    s.start()
    res = capsys.readouterr()
    assert "opt=test" in res.out


def test_argparse_confopt(capsys):
    s = ArgScript("testscript", [CONF])
    s.start()
    res = capsys.readouterr()
    assert "opt=test" in res.out


class DBScript(skytools.DBScript):
    ARGPARSE = True
    looping = 0

    def work(self):
        db = self.get_database("db", connstr=TEST_DB)
        curs = db.cursor()
        curs.execute("select 1")
        curs.fetchall()
        self.close_database("db")
        print("OK")


@pytest.mark.skipif(not TEST_DB, reason="need database config")
def test_get_database(capsys):
    s = DBScript("testscript", [CONF])
    s.start()
    res = capsys.readouterr()
    assert "OK" in res.out

