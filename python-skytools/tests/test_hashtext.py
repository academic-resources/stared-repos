from skytools.hashtext import (
    hashtext_new, hashtext_new_py, hashtext_old, hashtext_old_py,
)


def test_hashtext_new_const():
    c0 = [hashtext_new_py(b'x' * (0 * 5 + j)) for j in range(5)]
    c1 = [hashtext_new_py(b'x' * (1 * 5 + j)) for j in range(5)]
    c2 = [hashtext_new_py(b'x' * (2 * 5 + j)) for j in range(5)]

    assert c0 == [-1477818771, 1074944137, -1086392228, -1992236649, -1379736791]
    assert c1 == [-370454118, 1489915569, -66683019, -2126973000, 1651296771]
    assert c2 == [755764456, -1494243903, 631527812, 28686851, -9498641]


def test_hashtext_old_const():
    c0 = [hashtext_old_py(b'x' * (0 * 5 + j)) for j in range(5)]
    c1 = [hashtext_old_py(b'x' * (1 * 5 + j)) for j in range(5)]
    c2 = [hashtext_old_py(b'x' * (2 * 5 + j)) for j in range(5)]

    assert c0 == [-863449762, 37835117, 294739542, -320432768, 1007638138]
    assert c1 == [1422906842, -261065348, 59863994, -162804943, 1736144510]
    assert c2 == [-682756517, 317827663, -495599455, -1411793989, 1739997714]


def test_hashtext_new_impl():
    data = b'HypficUjFitraxlumCitcemkiOkIkthi'
    p = [hashtext_new_py(data[:l]) for l in range(len(data) + 1)]
    c = [hashtext_new(data[:l]) for l in range(len(data) + 1)]
    assert p == c, '%s <> %s' % (p, c)


def test_hashtext_old_impl():
    data = b'HypficUjFitraxlumCitcemkiOkIkthi'
    p = [hashtext_old_py(data[:l]) for l in range(len(data) + 1)]
    c = [hashtext_old(data[:l]) for l in range(len(data) + 1)]
    assert p == c, '%s <> %s' % (p, c)


def test_hashtext_new_input_types():
    data = b'HypficUjFitraxlumCitcemkiOkIkthi'
    exp = hashtext_new(data)
    assert hashtext_new(data.decode("utf8")) == exp
    #assert hashtext_new(memoryview(data)) == exp
    #assert hashtext_new(bytearray(data)) == exp

    assert hashtext_new_py(data) == exp
    assert hashtext_new_py(data.decode("utf8")) == exp
    #assert hashtext_new_py(memoryview(data)) == exp
    #assert hashtext_new_py(bytearray(data)) == exp


def test_hashtext_old_input_types():
    data = b'HypficUjFitraxlumCitcemkiOkIkthi'
    exp = hashtext_old(data)
    assert hashtext_old(data.decode("utf8")) == exp
    #assert hashtext_old(memoryview(data)) == exp
    #assert hashtext_old(bytearray(data)) == exp

    assert hashtext_old_py(data) == exp
    assert hashtext_old_py(data.decode("utf8")) == exp
    #assert hashtext_old_py(memoryview(data)) == exp
    #assert hashtext_old_py(bytearray(data)) == exp

